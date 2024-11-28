import { setupWorker } from 'msw/browser';
import { AuthHandlers } from './authHandlers';
import { editProfileHandlers } from './editProfileHandlers';
import { myPageHandlers } from './myPageHandlers';
import { postDetailHandlers } from './postDetailHandlers';
import { homeFeedHandlers } from './homeFeedHandlers';

export const worker = setupWorker(
  ...AuthHandlers,
  ...myPageHandlers,
  ...editProfileHandlers,
  ...postDetailHandlers,
  ...homeFeedHandlers
);

worker.start();
