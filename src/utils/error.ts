import { AxiosError } from 'axios';

const errorMessage = (error: unknown) => {
  const errorRes = error as AxiosError;
  return errorRes.response?.data.errors.message;
};


const errorStatus = (error: unknown) => {
  const errorRes = error as AxiosError;
  return errorRes.response?.data.errors.statusCode;
};

export { errorMessage, errorStatus };
