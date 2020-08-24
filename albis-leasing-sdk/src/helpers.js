import axios from 'axios';
import _ from 'lodash';

export async function getToken(
  SDKendpoint,
  apiStage,
  username,
  password,
  auth0Username,
  auth0Password,
  realm,
  nodeEnv
) {
  let localStorageToken = "{}"
  if (!(typeof window === 'undefined')) {
    localStorageToken = localStorage.getItem('albisToken')
  }
  let albisToken = JSON.parse(localStorageToken)
  const date = new Date();
  if (
    (_.isEmpty(albisToken) || albisToken.expires < new Date()) &&
    nodeEnv !== 'test'
  ) {
    let token = {};
    try {
      token = await login(
        SDKendpoint,
        apiStage,
        username,
        password,
        auth0Username,
        auth0Password,
        realm,
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
  SDKendpoint,
  apiStage,
  username,
  password,
  auth0Username,
  auth0Password,
  realm,
  nodeEnv
) {
  if (nodeEnv === 'test')
    return Promise.resolve({ data: { access_token: 'testAuth0Token12345' } });

  const endpoint = getEndpointPath('token', apiStage, SDKendpoint, nodeEnv);
  return axios.post(endpoint, {
    headers: { 'content-type': 'application/json' },
    username,
    password,
    auth0Username,
    auth0Password,
    realm,
  });
}

export function getEndpointPath(resource, apiStage, SDKendpoint, nodeEnv) {
  if (resource === 'rate' && nodeEnv === 'test')
    return `http://localhost:3000/testModels/rates.json`;
  return `${SDKendpoint}/${apiStage}/${resource}`;
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
    monthly: 2
  };
  return paymentOptions[paymentOption];
}
