(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"), require("lodash"));
	else if(typeof define === 'function' && define.amd)
		define(["axios", "lodash"], factory);
	else if(typeof exports === 'object')
		exports["albis-leasing-sdk"] = factory(require("axios"), require("lodash"));
	else
		root["albis-leasing-sdk"] = factory(root["axios"], root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_axios__, __WEBPACK_EXTERNAL_MODULE_lodash__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/*! exports provided: getToken, login, getEndpointPath, testGetRates, mapPaymentOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getToken", function() { return getToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getEndpointPath", function() { return getEndpointPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "testGetRates", function() { return testGetRates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapPaymentOption", function() { return mapPaymentOption; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);



async function getToken(
  SDKendpoint,
  apiStage,
  username,
  password,
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
    (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(albisToken) || albisToken.expires < new Date()) &&
    nodeEnv !== 'test'
  ) {
    let token = {};
    try {
      token = await login(
        SDKendpoint,
        apiStage,
        username,
        password,
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

async function login(
  SDKendpoint,
  apiStage,
  username,
  password,
  realm,
  nodeEnv
) {
  if (nodeEnv === 'test')
    return Promise.resolve({ data: { access_token: 'testAuth0Token12345' } });

  const endpoint = getEndpointPath('token', apiStage, SDKendpoint, nodeEnv);
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(endpoint, {
    headers: { 'content-type': 'application/json' },
    username,
    password,
    realm,
  });
}

function getEndpointPath(resource, apiStage, SDKendpoint, nodeEnv) {
  if (resource === 'ping')
    return `${SDKendpoint}/${apiStage}/ping`;
  if (resource === 'rate' && nodeEnv === 'test')
    return `http://localhost:3000/testModels/rates.json`;
  if (resource === 'rate')
    return `${SDKendpoint}/${apiStage}/rate`;
  if (resource === 'application')
    return `${SDKendpoint}/${apiStage}/application`;
  if (resource === 'legalForms')
    return `${SDKendpoint}/${apiStage}/legal-forms`;
  return "Such endpoint doesn't exist";
}

async function testGetRates(values) {
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

function mapPaymentOption(paymentOption) {
  const paymentOptions = {
    quarterly: 1,
    monthly: 2
  };
  return paymentOptions[paymentOption];
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");





// run:
// jsdoc -d ./public/doc/ src/utils/albis.js to create a documentation for this file
// OR if .md file needed
// jsdoc2md path/to/JSfile.js  > yourFile.md

/**
 * An Albis class
 */

class Albis {
  /**
   * Create an Albis object
   * Note: due to security reasons, keep all sensitive data (i.e. APIid, APIsecret, username, ...)
   * @param {Object} settings
   * @param {string=} settings.username - shop owner or shop admins username
   * @param {string=} settings.password - shop owner or shop admin password
   * @param {string=} settings.realm - shop owner connection name
   * @param {number=} settings.provision - provision - defines how much commission, retailer wants to receives for each deal. Possible values min: 0, max: 5. Default 0.
   * @param {string=} settings.SDKendpoint - SDK endpoint
   * @param {boolean=} settings.apiStage - defines proper API Gateway endpoints stage (API version) for requests 
   * @param {string=} settings.nodeEnv - defines the environment (development, production, test)
   *
   * @example
   *
   * new Albis(
   *  {
   *    username: 'username',
   *    password: 'password',
   *    realm: 'shop',
   *    provision: 3,
   *    SDKendpoint: 'https://sdkEndpoint',
   *    apiStage: 'staging',
   *    nodeEnv: 'development'
   *  })
   */

  constructor(settings) {
    this.username = settings.username;
    this.password = settings.password;
    this.realm = settings.realm;
    this.provision = settings.provision;
    this.SDKendpoint = settings.SDKendpoint;
    this.apiStage = settings.apiStage;
    this.nodeEnv = settings.nodeEnv
  }

  /**
   * getAlbisToken() returns albisToken needed to call other Albis functions
   * 
   * @returns {Object} albisToken
   *
   * @example
   * getAlbisToken()
   */

   async getAlbisToken() {
    const albisToken = await Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getToken"])(
      this.SDKendpoint,
      this.apiStage,
      this.username,
      this.password,
      this.realm,
      this.nodeEnv,
    );
    return albisToken
   }

  /**
   * ping(albisToken) checks the connection with Albis API and shop credentials
   * 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {string} "{result: "pong"}"
   *
   * @example
   * ping({token: '1234'})
   */

  async ping(albisToken) {
    const endpoint = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getEndpointPath"])('ping', this.apiStage, this.SDKendpoint, this.nodeEnv);
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(endpoint, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
      },
    });
  }

  /**
   * getRates(values, albisToken) retrieves proposed rates. Returned object is needed for proceed getApplication(albisToken)
   *
   * @param {Object} values - An object with data for providing rate offers
   * @param {number} values.purchasePrice - Total net value of the cart [EUR]
   * @param {number} values.productGroup - Product group of chosen products
   * @param {number=} values.downPayment - Net value of down payment [EUR]. Default 0
   * @param {number} values.contractType - Contract type
   * @param {string} values.paymentMethod - Payment options - possible values: 'quarterly' or 'monthly'
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} An Object with attributes passed to the function and additional attributes:
   * leaseTerm,
   * value,
   * insurance
   * finalPayment (if there is an opportunity to shrotening the lease term)
   *
   * @example
   *
   * getRates({ purchasePrice: 5000, productGroup: 1, downPayment: 500, contractType: 1, paymentMethod: 'quarterly'}, , { token: '12345' })
   */

  async getRates(values, albisToken) {
    let rates = {};
    const endpoint = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getEndpointPath"])('rate', this.apiStage, this.SDKendpoint, this.nodeEnv);

    values = {...values, paymentMethod: Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["mapPaymentOption"])(values.paymentMethod)}
    rates = axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(endpoint, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
      },
      params: {
        ...values,
        provision: this.provision,
      },
    });

    return rates;
  }

  /**
   * saveApplication(values, albisToken) saves an application
   *
   * @param {Object} values - An object with values data
   * @param {string} values.object - Name of the object (80 char max)
   * @param {number} values.purchasePrice - purchase price (object value)
   * @param {number} values.downPayment - down payment
   * @param {number} values.leasePayments - lease payments (returned from getRates() method)
   * @param {number} values.leaseTerm - lease term (returned from getRates() method)
   * @param {number} values.leasePaymentsWithInsurance - lease payments with insurance (returned from getRates() method)
   * @param {number} values.finalPayment - final payment (returned from getRates() method)
   * @param {Object} values.lessee
   * @param {string} values.lessee.name - lessee name
   * @param {string} values.lessee.street - lessee street
   * @param {number} values.lessee.zipCode - lessee zip code
   * @param {string} values.lessee.city - lessee city
   * @param {string} values.lessee.phoneNumber - lessee phone number
   * @param {string} values.lessee.email - lessee email
   * @param {string} values.lessee.legalForm - lessee legal form
   * @param {number} values.provision - shop provision
   * @param {string} values.productGroup - product group
   * @param {string} values.contractType - contract type
   * @param {string} values.paymentMethod - payment method ('monthly' or 'quarterly')
   * @param {string} values.iban - iban
   * @param {boolean} values.ssv - insurance value
   * @param {number} values.serviceFee - service fee
   * @param {boolean} values.contractByEmail - is contact by email required
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {number} a unique number of the application
   *
   * @example
   *
   * saveApplication(
   *  {
   *    object: 'Fridge VW',
   *    purchasePrice: 5000,
   *    downPayment: null,
   *    leasePayments: 300,
   *    leaseTerm: 12,
   *    leasePaymentsWithInsurance: 23,
   *    finalPayment: 150,
   *    lessee: {
   *      name: 'Antonina',
   *      street: 'Lichtenrade',
   *      city: 'Berlin',
   *      zipCode: 50000,
   *      phoneNumber: '+48500000000',
   *      faxNumber: '+48500000000'
   *      email: 'abc@gmail.com',
   *      legalForm: 'GmbH'
   *    },
   *    provision: 3,
   *    productGroup: 1,
   *    contractType: 1,
   *    paymentMethod: 'quarterly',
   *    iban: 'DE88100900001234567892',
   *    ssv: true,
   *    serviceFee: 300,
   *    contractByEmail: true
   * },
   * {token: '12345'})
   */

  async saveApplication(values, albisToken) {
    const endpoint = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getEndpointPath"])('application', this.apiStage, this.SDKendpoint, this.nodeEnv);

    //mapping payment options
    values = {...values, paymentMethod: Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["mapPaymentOption"])(values.paymentMethod)}

    //mapping legalForms (from string to number)
    values = {
      ...values,
      lessee: {
        ...values.lessee,
        legalForm: await this.mapLegalForm(values.lessee.legalForm, albisToken),
      },
    };

    if (values.object.length > 80) {
      values = {...values, object: values.object.substring(0,77) + "..." }
    }
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(endpoint,
      {
        params: {
        application: JSON.stringify({...values, provision: this.provision}),
      }
    }, 
      {
        headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
       }
    })
  }

  /**
   * findApplication(id, albisToken) finds application by its id
   * @param {number} id
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} An object with application data (see saveApplication function parameter)
   *
   * @example
   * findApplication(54321, {token: '12345'})
   */

  async findApplication(id, albisToken) {
    const endpoint = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getEndpointPath"])('application', this.apiStage, this.SDKendpoint, this.nodeEnv);

    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(endpoint, {
      headers: { 
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
      },
      params: {
        applicationId: id,
      },
    });
  }

  /**
   * updateApplication(id, leaseTerm, albisToken) - lets to update a particular application - changes lease term and accordingly its value, etc.
   * @param {number} id
   * @param {number} leaseTerm
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns "Application has been successufully sent"
   *
   * @example
   * updateApplication(54321, 24, {token: '12345'})
   */

  async updateApplication(id, leaseTerm, albisToken) {
    const endpoint = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getEndpointPath"])('application', this.apiStage, this.SDKendpoint, this.nodeEnv);

    //check if chosen lease term exist for those values

    const app = await this.findApplication(id);
    const rates = await this.getRates(
      lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pick(app.rate, [
        'purchasePrice',
        'productGroup',
        'downPayment',
        'contractType',
        'paymentMethod',
        'provision',
      ]),
    );
    const rate = rates.filter((rate) => rate.leaseTerm === leaseTerm);
    if (rate) {
      return axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(endpoint, 
      {
        headers: { 
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
        },
      },
      {
        params: {
          applicationId: id,
          leaseTerm: leaseTerm,
        },
      });
    } else {
      return new Promise.reject('There is no rate for chosen leaseTerm');
    }
  }

    /**
   * getLegalForms() get a map of all legal forms (needed for lessee data)
   * 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} An object with legal forms and their respective IDs
   *
   * @example
   * getLegalForms({token: '12345'})
   */

  async getLegalForms(albisToken) {
    const endpoint = Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["getEndpointPath"])('legalForms', this.apiStage, this.SDKendpoint, this.nodeEnv);

    const legalForms = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(endpoint, {
      headers: { 
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
      },
    });

    return legalForms.data;
  }

  async mapLegalForm(name, albisToken) {
    const list = await(this.getLegalForms(albisToken));
    let result = list.find(lf => lf.text === name);
    return result.id || 99;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Albis);


/***/ }),

/***/ "axios":
/*!**************************************************************************************!*\
  !*** external {"commonjs":"axios","commonjs2":"axios","amd":"axios","root":"axios"} ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_axios__;

/***/ }),

/***/ "lodash":
/*!*************************************************************************************!*\
  !*** external {"commonjs":"lodash","commonjs2":"lodash","amd":"lodash","root":"_"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_lodash__;

/***/ })

/******/ });
});
//# sourceMappingURL=albis-leasing-sdk.js.map