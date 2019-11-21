import { ApiAdapter } from './api.adapter';
import { UserService } from './UserService';
import { ThreadService } from './ThreadService';

const apiAdapter = new ApiAdapter();
export const userService = new UserService(apiAdapter);
export const threadService = new ThreadService(apiAdapter);
