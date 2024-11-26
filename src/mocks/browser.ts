import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { myPageHandlers } from './myPageHandlers';
import { editProfileHandlers } from './editProfileHandlers';
import { postDetailHandlers } from './postDetailHandlers';

export const worker = setupWorker(
  ...handlers,
  ...myPageHandlers,
  ...editProfileHandlers,
  ...postDetailHandlers
);

worker.start();
