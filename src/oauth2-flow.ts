export abstract class OAuthFlow {
  abstract init(): Promise<void>;
  abstract getToken(): Promise<string>;
  abstract refreshToken(): Promise<string>;
}

export class AuthorisationCodeFlow extends OAuthFlow {
  init(): Promise<void> {
    return Promise.resolve();
  }
  getToken(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  refreshToken(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}