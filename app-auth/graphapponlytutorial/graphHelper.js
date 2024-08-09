// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// <AppOnlyAuthConfigSnippet>
import 'isomorphic-fetch';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
// prettier-ignore
import { TokenCredentialAuthenticationProvider } from
  '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';

let _settings = undefined;
let _clientSecretCredential = undefined;
let _appClient = undefined;

export function initializeGraphForAppOnlyAuth(settings) {
  // Ensure settings isn't null
  if (!settings) {
    throw new Error('Settings cannot be undefined');
  }

  _settings = settings;

  // Ensure settings isn't null
  if (!_settings) {
    throw new Error('Settings cannot be undefined');
  }

  if (!_clientSecretCredential) {
    _clientSecretCredential = new ClientSecretCredential(
      _settings.tenantId,
      _settings.clientId,
      _settings.clientSecret,
    );
  }

  if (!_appClient) {
    const authProvider = new TokenCredentialAuthenticationProvider(
      _clientSecretCredential,
      {
        scopes: ['https://graph.microsoft.com/.default'],
      },
    );

    _appClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
  }
}
// </AppOnlyAuthConfigSnippet>

// <GetAppOnlyTokenSnippet>
export async function getAppOnlyTokenAsync() {
  // Ensure credential isn't undefined
  if (!_clientSecretCredential) {
    throw new Error('Graph has not been initialized for app-only auth');
  }

  // Request token with given scopes
  const response = await _clientSecretCredential.getToken([
    'https://graph.microsoft.com/.default',
  ]);
  return response.token;
}
// </GetAppOnlyTokenSnippet>

// <GetUsersSnippet>
export async function getUsersAsync() {
  // Ensure client isn't undefined
  if (!_appClient) {
    throw new Error('Graph has not been initialized for app-only auth');
  }

  return _appClient
    ?.api('/users')
    .select(['displayName', 'id', 'mail'])
    .top(25)
    .orderby('displayName')
    .get();
}
// </GetUsersSnippet>

// <MakeGraphCallSnippet>
// This function serves as a playground for testing Graph snippets
// or other code
export async function makeGraphCallAsync() {
  // INSERT YOUR CODE HERE
}
// </MakeGraphCallSnippet>
