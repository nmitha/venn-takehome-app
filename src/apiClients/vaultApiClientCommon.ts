import { HTTPError } from 'ky';

export const kyBeforeErrorHook = async (error: HTTPError) => {
  try {
    const errorResponse = await error.response.json<{ message: string } | null>();
    if (errorResponse?.message) {
      // Mutating `error` is OK here per the ky docs: https://github.com/sindresorhus/ky?tab=readme-ov-file#hooksbeforeerror
      error.message = errorResponse.message;
      error.name = 'VaultUserFriendlyError';
    }
  } catch (responseParsingError) {
    // TODO: Add proper logging (e.g. pino) and error reporting (e.g. Sentry)
    console.error(responseParsingError);
  }
  return error;
};

export const getUserFriendlyError = (error: unknown, fallbackErrorMessage: string) => {
  if (error instanceof HTTPError && error.name === 'VaultUserFriendlyError' && error.message) {
    return error.message;
  }
  return fallbackErrorMessage;
};
