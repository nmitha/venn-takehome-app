import { HttpResponse, http } from 'msw';
import { ONBOARDING_API_BASE_URL } from 'src/apiClients/onboardingApiClient';

export const handlers = [
  http.post(`${ONBOARDING_API_BASE_URL}/profile-details`, () => {
    return new HttpResponse('OK', { status: 200 });
  }),
];
