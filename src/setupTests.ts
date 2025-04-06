import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from 'src/mocks/server';

// Add debug logging
console.log('Setting up MSW server for tests');
console.log('Node.js version:', process.version);
console.log('Node.js executable path:', process.execPath);

// Establish API mocking before all tests
beforeAll(() => {
  console.log('Starting MSW server');
  server.listen({ onUnhandledRequest: 'warn' });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  console.log('Resetting MSW handlers after test');
  server.resetHandlers();
});

// Clean up after the tests are finished
afterAll(() => {
  console.log('Closing MSW server');
  server.close();
});
