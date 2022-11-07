// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// <AppOnlyAuthConfigSnippet>
require('isomorphic-fetch');
const azure = require('@azure/identity');
const graph = require('@microsoft/microsoft-graph-client');
const authProviders =
  require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');

let _settings = undefined;
let _clientSecretCredential = undefined;
let _appClient = undefined;

function initializeGraphForAppOnlyAuth(settings) {
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
    _clientSecretCredential = new azure.ClientSecretCredential(
      _settings.tenantId,
      _settings.clientId,
      _settings.clientSecret
    );
  }

  if (!_appClient) {
    const authProvider = new authProviders.TokenCredentialAuthenticationProvider(
      _clientSecretCredential, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    _appClient = graph.Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}
module.exports.initializeGraphForAppOnlyAuth = initializeGraphForAppOnlyAuth;
// </AppOnlyAuthConfigSnippet>

// <GetAppOnlyTokenSnippet>
async function getAppOnlyTokenAsync() {
  // Ensure credential isn't undefined
  if (!_clientSecretCredential) {
    throw new Error('Graph has not been initialized for app-only auth');
  }

  // Request token with given scopes
  const response = await _clientSecretCredential.getToken([
    'https://graph.microsoft.com/.default'
  ]);
  return response.token;
}
module.exports.getAppOnlyTokenAsync = getAppOnlyTokenAsync;
// </GetAppOnlyTokenSnippet>

// <GetUsersSnippet>
async function getUsersAsync() {
  // Ensure client isn't undefined
  if (!_appClient) {
    throw new Error('Graph has not been initialized for app-only auth');
  }

  return _appClient?.api('/users')
    .select(['displayName', 'id', 'mail'])
    .top(25)
    .orderby('displayName')
    .get();
}
module.exports.getUsersAsync = getUsersAsync;
// </GetUsersSnippet>

// <MakeGraphCallSnippet>
// This function serves as a playground for testing Graph snippets
// or other code
async function makeGraphCallAsync() {
  // INSERT YOUR CODE HERE
}
module.exports.makeGraphCallAsync = makeGraphCallAsync;
// </MakeGraphCallSnippet>
