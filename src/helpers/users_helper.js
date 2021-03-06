import { get, post } from './request_helper';
import { SERVER_URL } from '../constants';

export const MAIN_AUTH_URL = `${SERVER_URL}/auth`;
export const GET_USER_URL = `${MAIN_AUTH_URL}/users/me/`;
export const CHANGE_PASSWOD_URL = `${MAIN_AUTH_URL}/users/set_password/`;
export const CHANGE_USERNAME_URL = `${MAIN_AUTH_URL}/users/set_username/`;

export const MAIN_FILES_URL = `${SERVER_URL}/file`;
export const GET_MY_FILES_URL = `${MAIN_FILES_URL}/my`;
export const CREATE_FILE_URL = `${MAIN_FILES_URL}/create_file/`;
export const DELETE_FILE_URL = `${MAIN_FILES_URL}/delete_file/`;
export const LEAVE_FILE_URL = `${MAIN_FILES_URL}/leave_file/`;
export const OPEN_FILE_URL = `${MAIN_FILES_URL}/open_file/`;

class UsersApi {
  async getMe(user) {
    try {
      const result = await get(GET_USER_URL, undefined, user);
      switch (result.status) {
        case 401:
          return { isGood: false };
        case 200:
          return { data: await result.json(), isGood: true };
        default:
          return { isGood: false };
      }
    } catch (err) {
      return { isGood: false };
    }
  }

  async changePassword(user, currentPassword, newPassword) {
    const params = {
      new_password: newPassword,
      current_password: currentPassword,
    };
    try {
      const result = await post(CHANGE_PASSWOD_URL, params, user);
      switch (result.status) {
        case 400:
          return { reason: await result.json(), isGood: false };
        case 204:
          return { isGood: true };
        default:
          return { reason: {}, isGood: false };
      }
    } catch (err) {
      return { reason: {}, isGood: false };
    }
  }

  async changeUsername(user, username, password) {
    const params = {
      new_username: username,
      current_password: password,
    };
    try {
      const result = await post(CHANGE_USERNAME_URL, params, user);
      switch (result.status) {
        case 400:
          return { reason: await result.json(), isGood: false };
        case 204:
          return { isGood: true };
        default:
          return { reason: {}, isGood: false };
      }
    } catch (err) {
      return { reason: {}, isGood: false };
    }
  }

  async changeEmail(user, email) {
    const params = {
      email,
    };
    try {
      const result = await post(GET_USER_URL, params, user, 'PATCH');
      switch (result.status) {
        case 400:
          return { reason: await result.json(), isGood: false };
        case 200:
          return { isGood: true };
        default:
          return { reason: {}, isGood: false };
      }
    } catch (err) {
      return { reason: {}, isGood: false };
    }
  }

  async getMyFiles(user) {
    try {
      const result = await get(GET_MY_FILES_URL, undefined, user);
      return await result.json();
    } catch (err) {
      return null;
    }
  }

  async createFile(user, name, language, prevFileId) {
    const params = {
      name,
      programming_language: language,
    };
    if (prevFileId) {
      params.prev_file_id = prevFileId;
    }
    try {
      const result = await post(CREATE_FILE_URL, params, user);
      switch (result.status) {
        case 400:
          return { reason: await result.json(), isGood: false };
        case 201:
          return { id: (await result.json()).id, isGood: true };
        default:
          return { reason: [], isGood: false };
      }
    } catch (err) {
      return { reason: [], isGood: false };
    }
  }

  async deleteFile(user, id) {
    const params = {
      file_id: id,
    };
    try {
      const result = await post(DELETE_FILE_URL, params, user);
      switch (result.status) {
        case 400:
          return { reason: await result.json(), isGood: false };
        case 204:
          return { isGood: true };
        default:
          return { reason: [], isGood: false };
      }
    } catch (err) {
      return { reason: [], isGood: false };
    }
  }

  async leaveFile(user, id) {
    const params = {
      file_id: id,
    };
    try {
      const result = await post(LEAVE_FILE_URL, params, user);
      switch (result.status) {
        case 400:
          return { reason: await result.json(), isGood: false };
        case 204:
          return { isGood: true };
        default:
          return { reason: [], isGood: false };
      }
    } catch (err) {
      return { reason: [], isGood: false };
    }
  }

  async getFileLink(id, user) {
    const params = {
      file_id: id,
    };
    try {
      const result = await post(OPEN_FILE_URL, params, user);
      switch (result.status) {
        case 404:
          return { reason: 'Such file does not exist', isGood: false };
        case 200:
          return { link: await result.text(), isGood: true };
        default:
          return { reason: '', isGood: false };
      }
    } catch (err) {
      return { reason: '', isGood: false };
    }
  }

  async deleteUser(user, password) {
    const params = {
      current_password: password,
    };
    try {
      const result = await post(GET_USER_URL, params, user, 'DELETE');
      switch (result.status) {
        case 400:
          return { reason: await result.json(), isGood: false };
        case 204:
          return { isGood: true };
        default:
          return { reason: {}, isGood: false };
      }
    } catch (err) {
      return { reason: {}, isGood: false };
    }
  }
}

const usersApi = new UsersApi();

export default usersApi;
