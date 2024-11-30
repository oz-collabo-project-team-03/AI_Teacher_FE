import { setupWorker } from 'msw/browser';
import { AuthHandlers } from './authHandlers';
import { editProfileHandlers } from './editProfileHandlers';
import { homeFeedHandlers } from './homeFeedHandlers';
import { myPageHandlers } from './myPageHandlers';
import { postDetailHandlers } from './postDetailHandlers';
import { teachersAndGroupsHandler } from './teachersAndGroupsHandlers';
import { verifyPasswordHandler } from './verifyPasswordHandlers';

export const worker = setupWorker(
  ...AuthHandlers,
  ...myPageHandlers,
  ...editProfileHandlers,
  ...postDetailHandlers,
  ...homeFeedHandlers,
  ...teachersAndGroupsHandler,
  ...verifyPasswordHandler
);

worker.start();
