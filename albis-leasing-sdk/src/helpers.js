import axios from 'axios';
import _ from 'lodash';

export async function getToken(
  APIid,
  APIsecret,
  auth0Endpoint,
  username,
  password,
  realm,
  audience,
  grantType,
  nodeEnv
) {
  let LocalStorageToken = "{}"
  if (!(typeof window === 'undefined')) {
    LocalStorageToken = localStorage.getItem('albisToken')
  }
  let albisToken = JSON.parse(LocalStorageToken)
  const date = new Date();
  if (
    (_.isEmpty(albisToken) || albisToken.expires < new Date()) &&
    nodeEnv !== 'test'
  ) {
    let token = {};
    try {
      token = await login(
        APIid,
        APIsecret,
        auth0Endpoint,
        username,
        password,
        realm,
        audience,
        grantType,
        nodeEnv
      );
    } catch (err) {
      return `Error occured during authentication: ${err}`;
    }
    albisToken = {
      token: token.data.access_token,
      scope: token.data.scope,
      token_type: token.data.token_type,
      expires_in_Auth0: token.data.expires_in,
      expires: date.setHours(date.getHours() + token.data.expires_in / 3600),
    };
    if (!(typeof window === 'undefined')) {
      localStorage.setItem('albisToken', JSON.stringify(albisToken));
    }
    return albisToken;
  }

  return albisToken;
}

export async function login(
  APIid,
  APIsecret,
  auth0Endpoint,
  username,
  password,
  realm,
  audience,
  grantType,
  nodeEnv
) {
  if (nodeEnv === 'test')
    return Promise.resolve({ data: { access_token: 'testAuth0Token12345' } });
  return axios.post(auth0Endpoint, {
    headers: { 'content-type': 'application/json' },
    username,
    password,
    realm,
    client_id: APIid,
    client_secret: APIsecret,
    audience,
    grant_type: grantType,
  });
}

export function getEndpointPath(resource, apiStage, SDKendpoint, nodeEnv) {
  if (resource === 'rate' && nodeEnv === 'test')
    return `http://localhost:3000/testModels/rates.json`;
  return `${SDKendpoint}/${apiStage}/${resource}`;
}

export function mapPaymentOption(paymentOption) {
  const paymentOptions = {
    quarterly: 1,
    monthly: 2
  };
  return paymentOptions[paymentOption];
}
