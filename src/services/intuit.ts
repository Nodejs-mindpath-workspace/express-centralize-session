
const OAuthClient = require('intuit-oauth');

export default class IntuitService {
    private _intuitClient: any;

    private _getOAuthClient() { 
        if (!this._intuitClient) {
            this._intuitClient = new OAuthClient({
                clientId: process.env.INTUIT_CLIENT_ID,
                clientSecret: process.env.INTUIT_CLIENT_SECRET,
                environment: process.env.INTUIT_ENVIRONMENT,
                redirectUri: process.env.INTUIT_REDIRECT_URI,
            });
        }

        return this._intuitClient;
    }

    public getAuthUrl(): string {
        const oauthClient = this._getOAuthClient();
        const authUri = oauthClient.authorizeUri({
            scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
            state: 'testState',
        });
        return authUri;
    }

    public async getAccessToken(url: string): Promise<any> {
        const oauthClient = this._getOAuthClient();
        const client = await oauthClient.createToken(url);
        return client.body;
    }
}
