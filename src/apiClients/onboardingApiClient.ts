import { type } from 'arktype';
import ky from 'ky';
import { getUserFriendlyError, kyBeforeErrorHook } from './vaultApiClientCommon';

const api = ky.create({
  prefixUrl: 'https://fe-hometask-api.qa.vault.tryvault.com',
  hooks: {
    beforeError: [kyBeforeErrorHook],
  },
});

export const OnboardingFormDataSchema = type({
  firstName: 'string > 0',
  lastName: 'string > 0',
  phone: /^\+1[0-9]{10}$/,
  corporationNumber: 'string == 9',
});

export type OnboardingFormData = typeof OnboardingFormDataSchema.infer;

export const postProfileDetails = async (data: OnboardingFormData) => {
  try {
    await api.post('profile-details', { json: data });
  } catch (error) {
    const isSuccess = false as const;
    const errorMessage = getUserFriendlyError(
      error,
      /* fallback: */ 'An unexpected error occurred while saving your profile details. Please try again later.',
    );
    return { isSuccess, errorMessage };
  }

  return {
    isSuccess: true as const,
    errorMessage: null,
  };
};
