import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { brotliCompressSync, brotliDecompressSync } from 'node:zlib';

const cwd = process.cwd();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const samplesDirectory = path.resolve(__dirname, '../test/data/samples');

function getSamples() {
  return fs
    .readdirSync(samplesDirectory)
    .map((filename) => path.resolve(samplesDirectory, filename));
}

function compress(filepath: string) {
  const compressed = brotliCompressSync(fs.readFileSync(filepath, 'utf8'));
  fs.writeFileSync(filepath + '.br', compressed); // Add .br suffix on save
}

function decompress(filepath: string) {
  const compressed = brotliDecompressSync(fs.readFileSync(filepath));
  fs.writeFileSync(filepath.slice(0, -3), compressed); // Remove .br suffix on save
}

// Cli utils
function getTargets(args: string[]) {
  const filepaths: Set<string> = new Set();

  for (const arg of args) {
    if (arg === '--all') {
      for (const name of getSamples()) {
        filepaths.add(name);
      }
    } else {
      filepaths.add(path.resolve(cwd, arg));
    }
  }

  return filepaths;
}

function help() {
  console.log(
    `Usage:
    - Compression: <compress|decompress> <--all|path_to_file> [...path_to_file]
    - Filename serializer: <serialize-url> [...url]
    - Clean decompressed files: <clean>
    - Help: <help>`,
  );
}

const [mode, ...args] = process.argv.slice(2);

if (mode === 'compress') {
  for (const target of getTargets(args)) {
    if (target.endsWith('.br')) {
      continue;
    }
    console.log(`compressing "${target}"...`);
    compress(target);
  }
} else if (mode === 'decompress') {
  for (const target of getTargets(args)) {
    if (!target.endsWith('.br')) {
      continue;
    }
    console.log(`decompressing "${target}"...`);
    decompress(target);
  }
} else if (mode === 'clean') {
  console.log('cleaning up files without ".br" suffix...');
  for (const target of getTargets(['--all'])) {
    if (!target.endsWith('.br')) {
      fs.unlinkSync(target);
    }
  }
} else if (mode === 'serialize-url') {
  for (const arg of args) {
    console.log(arg.replace(/[^a-z0-9.]/g, '_'));
  }
} else {
  help();
  if (mode !== 'help') {
    throw new Error('Invalid mode provided!');
  }
}

process.exit(0);
