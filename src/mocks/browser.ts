import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { myPageHandlers } from './myPageHandlers';

export const worker = setupWorker(...handlers, ...myPageHandlers);

worker.start();
