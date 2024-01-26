import { AuthorisationCodeFlow } from '../src/index';

test('AuthorisationCodeFlow', () => {
  const auth = new AuthorisationCodeFlow();
  const init = auth.init();
  expect(init).toBe('Configuration is valid');
});
