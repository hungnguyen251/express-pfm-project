export const HTTP_RESPONSES = {
  ERROR: {
    BAD_REQUEST: {
      code: 400,
      message: 'Bad request. Please check your input.',
    },
    UNAUTHORIZED: {
      code: 401,
      message: 'Unauthorized access. Please login.',
    },
    FORBIDDEN: {
      code: 403,
      message: 'Forbidden access.',
    },
    NOT_FOUND: {
      code: 404,
      message: 'Resource not found.',
    },
    ALREADY_EXISTS: {
      message: 'Already Exists',
      code: 409,
    },
    SERVER_ERROR: {
      code: 500,
      message: 'Internal server error. Please try again later.',
    },
  },
  SUCCESS: {
    COMMON: {
      code: 200,
      message: 'Success.',
    },
    CREATED: {
      code: 201,
      message: 'Created successful.',
    },
    LOGIN: {
      code: 200,
      message: 'Login successful.',
    },
    LOGOUT: {
      code: 200,
      message: 'Logout successful.',
    },
    UPDATE: {
      code: 200,
      message: 'Update successful.',
    },
    DELETE: {
      code: 200,
      message: 'Deleted successfully.',
    },
  },
};