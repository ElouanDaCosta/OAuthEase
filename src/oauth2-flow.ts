import { oauthEaseConfig } from './config';


export abstract class OAuthFlow {
  abstract init(): Promise<void>;
  abstract getToken(): Promise<string>;
  abstract refreshToken(): Promise<string>;
}

export class AuthorisationCodeFlow extends OAuthFlow {
  init(): Promise<void> {
    let httpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
    try {
      const { clientId, clientSecret, authorizationUrl, redirectUri, scopes } = oauthEaseConfig;
      if (!clientId || !clientSecret || !authorizationUrl || !redirectUri || !scopes) {
        throw new Error('Missing configuration');
      }
      if (!scopes.length) {
        throw new Error('At least one scope is required');
      }
      if (!clientId || !clientSecret) {
        throw new Error('Missing client credentials');
      }
      if (httpRegex.test(authorizationUrl)) {
        throw new Error('Invalid authorization URL');
      }
      if (httpRegex.test(redirectUri)) {
        throw new Error('Invalid redirect URL');
      }
    
    } catch (error) {
      console.error(error);
    } finally {
      return Promise.resolve();
    }
  }
  getToken(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  refreshToken(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}