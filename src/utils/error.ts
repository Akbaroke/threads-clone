import { AxiosError } from 'axios';

const responseError = (error: unknown) => {
  return error.response?.data.errors;
};

const errorMessage = (error: unknown) => {
  return error.response?.data.errors.message;
};

const errorStatus = (error: unknown) => {
  return error.response?.data.errors.statusCode;
};

export { responseError, errorMessage, errorStatus };
