import { Stats, createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import * as http from 'node:http';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import ts from 'typescript';
import { minify } from 'terser';

// Shared types
export type EnvironmentalFactors = {
  userAgent: string;
};

export enum CosmeticFilteringCapability {
  StylesInjection = 'styles-injection',
  ScriptletInjecjtion = 'scriptlet-injection',
}

export enum NetworkFilteringCapability {
  RequestFiltering = 'request-filtering',
  ReplaceModifier = 'replace-modifier',
}

export type Result = {
  environment: EnvironmentalFactors;
  network: NetworkFilteringCapability[];
  cosmetic: CosmeticFilteringCapability[];
};

// Server
enum Extension {
  TypeScript = 0,
}

type AssetPipeline = {
  contentType: string;
  extension?: Extension;
};

function getAssetPipeline(file: string): AssetPipeline {
  const data: AssetPipeline = {
    contentType: 'text/plain',
  };

  switch (path.extname(file)) {
    case '.ts':
      data.contentType = 'text/javascript';
      data.extension = Extension.TypeScript;
      break;
    case '.js':
      data.contentType = 'text/javascript';
      break;
    case '.css':
      data.contentType = 'text/css';
      break;
    case '.html':
      data.contentType = 'text/html';
      break;
  }

  return data;
}

// Cache compile results
type TypeScriptCompliationCache = {
  hash: string;
  output: string;
};

const typescriptCompliationCache = new Map<string, TypeScriptCompliationCache>();

function compileTypeScript(key: string, script: string): string {
  const hash = crypto.createHash('md5').update(script).digest('hex');
  const cache = typescriptCompliationCache.get(key);

  // Check if cache exists and the origin hash is identical to given content
  if (cache !== undefined && cache.hash === hash) {
    return cache.output;
  }

  const result = ts.transpileModule(script, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2018,
      module: ts.ModuleKind.Preserve,
      inlineSourceMap: true,
      lib: ['dom'],
    },
  });

  typescriptCompliationCache.set(key, {
    hash,
    output: result.outputText,
  });

  return result.outputText;
}

export function createServer(): http.Server {
  const contentPath = '../adblocker-e2e-testing-content';
  const errorMessages = {
    badRequest: 'Bad Request',
    notFound: 'Not Found',
  };

  const server = http.createServer((req, res) => {
    // Don't handle requests rather than method of GET
    if (req.method !== 'GET') {
      res.writeHead(400, {
        'content-type': 'text/plain',
        'content-length': errorMessages.badRequest.length,
      });
      res.end(errorMessages.badRequest);
      return;
    }

    // Fallback to index page
    if (req.url === undefined || req.url === '/') {
      req.url = '/index.html';
    }

    // Return random content for paths under /generate_200 to test network filtering
    if (req.url.startsWith('/generate_200')) {
      const rng = Date.now().toString(36);
      res.writeHead(200, {
        'content-type': 'text/plain',
        'content-length': rng.length,
      });
      res.end(rng);
      return;
    }

    const assetPath = path.join(contentPath, req.url);

    // Handle only files
    let stats: Stats;
    if (!existsSync(assetPath) || !(stats = statSync(assetPath)).isFile()) {
      res.writeHead(404, {
        'content-type': 'text/plain',
        'content-length': errorMessages.notFound.length,
      });
      res.end(errorMessages.notFound);
      return;
    }

    // Check if postprocessing is required for this asset
    const assetPipeline = getAssetPipeline(assetPath);
    switch (assetPipeline.extension) {
      case Extension.TypeScript: {
        const output = compileTypeScript(assetPath, readFileSync(assetPath, 'utf8'));
        res.writeHead(200, {
          'content-type': assetPipeline.contentType,
          'content-length': output.length,
        });
        res.end(output);
        return;
      }
    }

    // If postprocessing is not required, handle this as stream
    res.writeHead(200, {
      'content-type': assetPipeline.contentType,
      'content-length': stats.size,
    });

    const source = createReadStream(assetPath);
    source.once('open', () => {
      source.pipe(res);
    });
  });

  return server;
}

// Evaluators
export const filters = String.raw`! A set of filters required for testing e2e page
! network filtering
/generate_200/block
127.0.0.1$replace=/data-test="network1" class="is">failed/data-test="network1" class="is positive">worked/

! cosmetic filtering
127.0.0.1##div.test > div.block
127.0.0.1##+js(test)`;

export async function getResources() {
  const scriptlet = await minify(String.raw`
(function () {
  console.log('Hello from test scriptlet');

  const el = document.querySelector('#cosmetic1 span');

  el.textContent = 'worked';
  el.classList.add('positive');
})();
`);
  const resources = String.raw`
test.js application/javascript
${scriptlet.code}
`;

  return resources;
}
