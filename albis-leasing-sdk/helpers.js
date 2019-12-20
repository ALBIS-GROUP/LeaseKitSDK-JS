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
  grant_type,
) {
  let LocalStorageToken = "{}"
  if (!(typeof window === 'undefined')) {
    LocalStorageToken = localStorage.getItem('albisToken')
  }
  let albisToken = JSON.parse(LocalStorageToken)
  const date = new Date();
  if (
    (_.isEmpty(albisToken) || albisToken.expires < new Date()) &&
    process.env.NODE_ENV !== 'test'
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
        grant_type,
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
  grant_type,
) {
  if (process.env.NODE_ENV === 'test')
    return Promise.resolve({ data: { access_token: 'testAlbisToken12345' } });
  return axios.post(auth0Endpoint, {
    headers: { 'content-type': 'application/json' },
    // username,
    // password,
    // realm,
    client_id: APIid,
    client_secret: APIsecret,
    audience: audience,
    grant_type: 'client_credentials',
  });
}

export function getEndpointPath(resource, devMode) {
  if (resource === 'ping' && devMode)
    return 'https://mzgz6czl6h.execute-api.eu-central-1.amazonaws.com/staging/ping';
  if (resource === 'ping' && !devMode)
    return 'https://mzgz6czl6h.execute-api.eu-central-1.amazonaws.com/v1/ping';
  if (resource === 'rate' && process.env.NODE_ENV === 'test')
    return 'http://localhost:3000/testModels/rates.json';
  if (resource === 'rate' && devMode)
    return 'https://mzgz6czl6h.execute-api.eu-central-1.amazonaws.com/staging/rate';
  if (resource === 'rate' && !devMode)
    return 'https://mzgz6czl6h.execute-api.eu-central-1.amazonaws.com/v1/rate';
  if (resource === 'application' && devMode)
    return 'https://mzgz6czl6h.execute-api.eu-central-1.amazonaws.com/staging/application';
  if (resource === 'application' && !devMode)
    return 'https://mzgz6czl6h.execute-api.eu-central-1.amazonaws.com/v1/application';
  if (resource === 'legalForms' && devMode)
    return 'https://mzgz6czl6h.execute-api.eu-central-1.amazonaws.com/staging/legal-forms';
  if (resource === 'legalForms' && !devMode)
    return 'https://mzgz6czl6h.execute-api.eu-central-1.amazonaws.com/v1/legal-forms';
  return "Such endpoint doesn't exist";
}

export async function testGetRates(values) {
  if (isNaN(values.purchasePrice))
    return Promise.reject('purchasePrice has not a proper type');
  if (isNaN(values.productGroup))
    return Promise.reject('productGroup has not a proper type');

  if (isNaN(values.contractType))
    return Promise.reject('contractType has not a proper type');

  if (isNaN(values.provision))
    return Promise.reject('provision has not a proper type');

  if (
    !(
      typeof values.downPayment === 'number' ||
      values.downPayment === undefined ||
      values.downPayment === null
    )
  ) {
    return Promise.reject('downPayment has not a proper type');
  }

  if (typeof values.paymentMethod !== 'string') {
    return Promise.reject('paymentMethod has not a proper type');
  }

  if (values.provision > 5 || values.provision < 0) {
    return Promise.reject(
      'Error has occured - provision value exceeds range 0-5',
    );
  }

  if (
    !(
      values.paymentMethod === 'monthly' || values.paymentMethod === 'quarterly'
    )
  ) {
    return Promise.reject(
      "Error has occured - provision option has uncorrect value. Should be 'monthly' or 'quartely'",
    );
  }
  return true;
}

export function mapPaymentOption(paymentOption) {
  const paymentOptions = {
    quarterly: 1,
  };
  return paymentOptions[paymentOption] || 2;
}
