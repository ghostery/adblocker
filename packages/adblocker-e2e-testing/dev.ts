import { createServer } from './e2e.js';

function server() {
  const server = createServer();

  server.listen(4812, '127.0.0.1', () => {
    const address = server.address();

    if (typeof address === 'string') {
      console.log(address);
    } else if (address !== null) {
      console.log(`http://${address.address}:${address.port}/`);
    } else {
      console.log('Failed to acquire the address!');
    }
  });
}

void server();
