import { oauthEaseConfig } from './config';
export abstract class OAuthFlow {
  abstract init(): string;
  abstract getToken(): Promise<string>;
  abstract refreshToken(): Promise<string>;
}

export class AuthorisationCodeFlow extends OAuthFlow {
  init(): string {
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
      console.log(error, 'Please check your configuration');
    } finally {
      return 'Configuration is valid';
    }
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let token: Promise<string>;
      fetch(oauthEaseConfig.authorizationUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          grant_type: 'authorization_code',
          client_id: oauthEaseConfig.clientId,
          client_secret: oauthEaseConfig.clientSecret,
          redirect_uri: oauthEaseConfig.redirectUri,
          code: 'code',
        })
      }).then((response) => {
        token = response.json();
        return token;
        console.log(response);
      });
    });
  }
  refreshToken(): Promise<string> {
    throw new Error("Method not implemented.");
  }
}