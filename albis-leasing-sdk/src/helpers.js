import axios from 'axios';
import _ from 'lodash';
import {version} from '../package.json';

export function errorObj(err) {
  if (!err.response) {
    return {
      status: 'Error from LeaseKit lib',
      statusText: err,
    }
  }
  return {
    status: err.response.status,
    statusText: err.response.statusText,
    headers: err.response.headers,
    data: err.response.data
  }
}

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
      throw err;
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

function versionCheck (apiStage) {
  if(!apiStage) return 
  const stageValidator = RegExp(/^v[1-9]+$|^staging$/);
  const validateStage = stageValidator.test(apiStage);
  
  const stageNumber = parseInt(apiStage.slice(1, apiStage.length), 10) || "staging";

  const versionNumber = parseInt(version, 10);

  if (!validateStage) {
    throw ('API stage not valid');
  } 
  if (!(stageNumber === "staging" || stageNumber === versionNumber)){
    throw ('Package version does not match API version')
  }
}

export function getEndpointPath(resource, apiStage, SDKendpoint, nodeEnv) {
  versionCheck(apiStage);
  if (resource === 'rate' && nodeEnv === 'test')
    return `http://localhost:3000/testModels/rates.json`;

  if(!apiStage) return `${SDKendpoint}/${resource}`;

  return `${SDKendpoint}/${apiStage}/${resource}`;
}
