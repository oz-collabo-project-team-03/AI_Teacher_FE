import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { myPageHandlers } from './myPageHandlers';
import { editProfileHandlers } from './editProfileHandlers';

export const worker = setupWorker(
  ...handlers,
  ...myPageHandlers,
  ...editProfileHandlers
);

worker.start();
