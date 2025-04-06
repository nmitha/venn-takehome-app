import { HttpResponse, http } from 'msw';

export const handlers = [
  http.post('https://fe-hometask-api.qa.vault.tryvault.com/profile-details', () => {
    return HttpResponse.json({}, { status: 200 });
  }),
];
