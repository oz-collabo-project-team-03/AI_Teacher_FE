import { setupWorker } from 'msw/browser';
import { AuthHandlers } from './authHandlers';
import { editProfileHandlers } from './editProfileHandlers';
import { myPageHandlers } from './myPageHandlers';
import { postDetailHandlers } from './postDetailHandlers';

export const worker = setupWorker(
  ...AuthHandlers,
  ...myPageHandlers,
  ...editProfileHandlers,
  ...postDetailHandlers
);

worker.start();
