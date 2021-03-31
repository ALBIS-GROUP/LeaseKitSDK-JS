import axios from 'axios';
import _ from 'lodash';
import { getEndpointPath, getToken, errorObj } from './helpers';

// run:
// jsdoc -d ../public/doc/ src/index.js to create a documentation for this file
// OR if .md file needed
// jsdoc2md src/index.js  > yourFile.md to create a .md version of documentation (for GitHub)

/**
 * An Albis class
 */

class Albis {
  /**
   * Create an Albis object
   * Note: due to security reasons, keep all sensitive data (i.e. APIid, APIsecret, username, ...)
   * @param {Object} settings
   * @param {string} settings.username - shop owner or shop admins Albis username
   * @param {string} settings.password - shop owner or shop admins Albis password
   * @param {string} settings.auth0Username - shop owner or shop admins auth0 username
   * @param {string} settings.auth0Password - shop owner or shop admin auth0 password
   * @param {string} settings.realm - shop owner connection name
   * @param {number} settings.provision - provision - defines how much commission, retailer wants to receives for each deal. Possible values min: 0, max: 5. Default 0. Value in half percentage i.e. 1.5 not 1.65
   * @param {string} settings.SDKendpoint - SDK endpoint
   * @param {boolean} settings.apiStage - defines proper API Gateway endpoints stage (API version) for requests 
   *
   * @example
   *
   * new Albis(
   *  {
   *    username: 'username',
   *    password: 'password',
   *    auth0Username: 'auth0Username',
   *    auth0Password: 'auth0Password',
   *    realm: 'shop',
   *    provision: 3,
   *    SDKendpoint: 'https://sdkEndpoint',
   *    apiStage: 'staging',
   *  })
   */

  constructor(settings) {
    this.username = settings.username;
    this.password = settings.password;
    this.auth0Username = settings.auth0Username;
    this.auth0Password = settings.auth0Password;
    this.realm = settings.realm;
    this.provision = settings.provision;
    this.SDKendpoint = settings.SDKendpoint;
    this.apiStage = settings.apiStage;
  }
  
  /**
   * getAlbisToken() returns albisToken needed to call other Albis functions
   * 
   * @returns {Object} albisToken
   * @param {string} albisToken.token - token used for user authorisation
   * @param {string} albisToken.scope - shows users access
   * @param {string} albisToken.token_type - token type
   * @param {number} albisToken.expires_in_Auth0 - how long the token will be valid (number of seconds)
   * @param {number} albisToken.expires - how long the token will be valid (Unix time stamp)
   *
   * @example
   * Albis.getAlbisToken()
   */

   async getAlbisToken() {
    let albisToken = ""
    try {
      albisToken = await getToken(
        this.SDKendpoint,
        this.apiStage,
        this.username,
        this.password,
        this.auth0Username,
        this.auth0Password,
        this.realm,
      );
    } catch (e) {
      throw errorObj(e)
    }
    return albisToken
   }

  /**
   * ping(albisToken) checks the connection with Albis API and shop credentials
   * 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} response
   * @param {string} response.id - json rpc lib id
   * @param {string} response.jsonrpc - json rpc version number ("2.0")
   * @param {string} response.result - 'pong'
   *
   * @example
   * Albis.ping({ token: '1234' })
   */

  async ping(albisToken) {
    const endpoint = getEndpointPath('ping', this.apiStage, this.SDKendpoint);
    let res = {}
    try {
      res = await axios.get(endpoint, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
        },
      });
    } catch (e) {
      throw errorObj(e)
    }
    return res.data
  }

  /**
  * echo(data, albisToken)
  * @param {string=} data - random string (optional)
  * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
  * 
  * @returns {Object} response
  * @param {string} response.id - json rpc lib id
  * @param {string} response.jsonrpc - json rpc version number ("2.0")
  * @param {string} response.result - data input string (or default "Test")
  * 
  * @example
  * Albis.echo("Hello World", { token: '1234' })
  */

 async echo(data, albisToken) {
  const endpoint = getEndpointPath('echo', this.apiStage, this.SDKendpoint);
  let res = {}
  try {
    res = await axios.get(endpoint, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
      },
      params: {
        data 
      }
    })
  } catch (e) {
    throw errorObj(e)
  }
  return res.data
}

/**
 * getDocuments(applicationId, albisToken) returns needed documents. Warning: this function needs sometimes (rare) even up to 2mins for response
 * @param {number} applicationId - application number
 * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
 * 
 * @returns {Object} response
 * @param {string} response.id - json rpc lib id
 * @param {string} response.jsonrpc - json rpc version number ("2.0")
 * @param {string} response.result - base64 string (i.e. a PDF file)
 * 
 * @example 
 * 
 * Albis.getDocuments(123456, { token: 12345 })
 */

async getDocuments(applicationId, albisToken) {
  const endpoint = getEndpointPath('documents', this.apiStage, this.SDKendpoint);
  let res = {}
  try {
    res = await axios.get(endpoint, {
      headers: { 
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
      },
      params: {
        applicationId,
      },
    });
  } catch (e) {
    throw errorObj(e)
  }
  return res.data
}

/**
 * changePassword(albisNewPassword, auth0NewPassword, albisToken)
 * 
 * @param {string=} albisNewPassword - albis new password (optional)
 * @param {string=} auth0NewPassword - auth0 new password (optional)
 * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API 
 * 
 * @returns {Object} response
 * @param {string} response.albisPassChangeStatus.id - json rpc lib id
 * @param {string} response.albisPassChangeStatus.jsonrpc - json rpc version number ("2.0")
 * @param {string} response.albisPassChangeStatus.result - null
 * @param {string} response.auth0PassChangeStatus.created_at - date when the user has been created
 * @param {string} response.auth0PassChangeStatus.email - user's email (same as login)
 * @param {boolean} response.auth0PassChangeStatus.email_verified - is email verified
 * @param {Object} response.auth0PassChangeStatus.identities - object with description of user connection
 * @param {boolean} response.auth0PassChangeStatus.name - user login name (same as email)
 * @param {boolean} response.auth0PassChangeStatus.nickname - user nickname name (same as email without the domain ending)
 * @param {string} response.auth0PassChangeStatus.picture - user picture URL (png)
 * @param {string} response.auth0PassChangeStatus.updated_at - date of the last update
 * @param {string} response.auth0PassChangeStatus.user_id - auth0 user id
 * @param {string} response.auth0PassChangeStatus.last_password_reset - date of the last password reset
 * @param {string} response.auth0PassChangeStatus.last_ip - ip used for the last connection
 * @param {string} response.auth0PassChangeStatus.last_login - date of the last login
 * @param {number} response.auth0PassChangeStatus.logins_count - number of total logins of this user
 * 
 * @example 
 * Albis.changePassword("albisNewPassword", "auth0NewPassword", { token: 12345 })
 */

async changePassword(albisNewPassword, auth0NewPassword, albisToken) {
  const endpoint = getEndpointPath('password', this.apiStage, this.SDKendpoint);
  let res = {}
  try {
    res = await axios.post(endpoint,
      {
        albisNewPassword,
        auth0NewPassword
      }, 
      {
        headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
       }
    })
  } catch(e) {
    throw errorObj(e)
  }
  return res.data
}

  /**
   * getRates(values, albisToken) retrieves proposed rates. Returned object is needed for proceed getApplication(albisToken)
   *
   * @param {Object} values - An object with data for providing rate offers
   * @param {number} values.purchasePrice - Total net value of the cart [EUR]
   * @param {number} values.productGroup - Product group of chosen products
   * @param {number=} values.downPayment - Net value of down payment [EUR]. Default 0 (optional)
   * @param {number} values.contractType - Contract type
   * @param {number} values.paymentMethod - Payment options
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} response
   * @param {string} response.id - json rpc lib id
   * @param {string} response.jsonrpc - json rpc version number ("2.0")
   * @param {Object[]} response.result - array of objects i.e.
   * {
   *  leaseTerm: 18,
   *  rate: 188.8,
   *  rateWithInsurance: 195.7,
   *  total: 3522.6
   * }
   *
   * @example
   *
   * Albis.getRates({ purchasePrice: 5000, productGroup: 1, downPayment: 500, contractType: 1, paymentMethod: 1 }, { token: '12345' })
   */

  async getRates(values, albisToken) {
    let res = {};
    const endpoint = getEndpointPath('rate', this.apiStage, this.SDKendpoint);

    try {
      res = await axios.get(endpoint, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
        },
        params: {
          ...values,
          provision: this.provision,
        },
      });
    } catch (e) {
      throw errorObj(e)
    }

    return res.data;
  }

  /**
   * saveApplication(values, albisToken) saves an application
   * 
   * @param {Object} values - An object with application data
   * @param {boolean=} values.contactByEmail - indicator that the leasing contract should be sent to the lessee by e-mail after approval. TRUE/FALSE, Default:FALSE (optional)
   * @param {number} values.contractType - contract type (result of getContractTypes() method)
   * @param {number=} values.downPayment - down payment (optional)
   * @param {string=} values.iban - IBAN of account to be charged with contract instalments (may be entered with spaces) (optional)
   * @param {Object} values.lessee - lessee data
   * @param {string} values.lessee.city - lessee city
   * @param {string} values.lessee.email - lessee email
   * @param {number} values.lessee.legalForm - lessee legal form
   * @param {string} values.lessee.name - lessee name
   * @param {string} values.lessee.phoneNumber - lessee phone number
   * @param {string} values.lessee.street - lessee street
   * @param {string} values.lessee.zipCode - lessee zip code
   * @param {Object} values.lessee.manager - lessee's manager data
   * @param {string} values.lessee.manager.birthDate - lessee's manager birth date (format required: "YYYY-MM-DD")
   * @param {string} values.lessee.manager.city - lessee's manager city
   * @param {string=} values.lessee.manager.faxNumber - lessee's manager phone number (optional)
   * @param {string} values.lessee.manager.firstName - lessee's manager first name
   * @param {string} values.lessee.manager.lastName - lessee's manager last name
   * @param {string=} values.lessee.manager.phoneNumber - lessee's manager phone number (optional)
   * @param {string} values.lessee.manager.salutation - lessee's manager salutation form (result of getSalutations() method)
   * @param {string} values.lessee.manager.street - lessee's manager street
   * @param {string} values.lessee.manager.zipCode - lessee's manager zip code
   * @param {number} values.leaseTerm - lease term (returned from getRates() method)
   * @param {string} values.object - name of the object (80 char max)
   * @param {number} values.paymentMethod - payment method (result of getPaymentMethods() method)
   * @param {number} values.productGroup - product group (is a part of "credentials". Can be assigned by Albis only)
   * @param {string=} values.promotionId - lease term (returned from getRates() if conditions matched any promotion) (optional)
   * @param {number} values.purchasePrice - purchase price (object value)
   * @param {number} values.rate - rate (returned from getRates() method)
   * @param {string=} values.reference - application reference (helper for shop employees) (optional)
   * @param {string=} values.receiverEndpoint - endpoint address where requests about application/documentation updates should be delivered (optional)
   * @param {Array.<String>=} values.receiverFailEmails - array of string emails where info about connection with reveiver endpoint should be delivered (optional)
   * @param {string=} values.receiverToken - a string, which can be used by a client to ensure that the notification concerns his application (optional)
   * @param {number=} values.residualValuePercent - required if contract type equals 2 (optional)
   * @param {number=} values.serviceFee - required if contract type equals 7 or 12 (optional)
   * @param {Object} albisToken - object with Albis token, which lets to communicate with SDK API (returned from getAlbisToken() method)
   *
   * @returns {Object} response - response object
   * @param {string} response.id - json rpc lib id
   * @param {string} response.jsonrpc - json rpc version number ("2.0")
   * @param {number} response.result - a unique number of the application
   * @param {string} response.receiverToken - receiver token (if used in input params), a string, which can be used by a client to ensure that the notification concerns his application
   *
   * @example
   *
   * Albis.saveApplication(
   *  {
   *    contactByEmail: true,
   *    contractType: 1,
   *    downPayment: 500,
   *    finalPayment: 150,
   *    iban: 'DE88100900001234567892',
   *    lessee: {
   *      name: 'Antonina',
   *      street: 'Lichtenrade',
   *      city: 'Berlin',
   *      zipCode: '50000',
   *      phoneNumber: '+48500000000',
   *      email: 'abc@gmail.com',
   *      legalForm: 1,
   *      manager: {
   *        salutation: 1,
   *        firstName: 'Johanna',
   *        lastName: 'Surname',
   *        street: 'Piłsudskiego',
   *        zipCode: '50000',
   *        city: 'Hamburg',
   *        birthDate: '1990-12-30'
   *      },
   *    },
   *    leaseTerm: 12,
   *    object: 'Fridge VW',
   *    paymentMethod: 1,
   *    productGroup: 1,
   *    promotionId: 'xyz',
   *    purchasePrice: 5000,
   *    rate: 300,
   *    rateWithInsurance: 323,
   *    reference: 'abc123',
   *    ssv: true,
   *    receiverToken: '123abc',
   *    receiverEndpoint: 'company.com/endpoint',
   *    receiverFailEmails: ['abc@gmail.com', 'abc2@gmail.com']
   * },
   * {token: '12345'})
   */

  async saveApplication(values, albisToken) {
    const endpoint = getEndpointPath('application', this.apiStage, this.SDKendpoint);
    let res = {}

    if (values.object.length > 80) {
      values = {...values, object: values.object.substring(0,77) + "..." }
    }
    try {
      res = await axios.post(endpoint,
        {
          ...values, provision: this.provision,
        }, 
        {
          headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
         }
      })
    } catch(e) {
      throw errorObj(e)
    }
    return res.data
  }

  /**
   * updateApplication(values, albisToken) updates an application. Warning: empty/null values will overwrite atributes to empty/null. If you wouldn't like to overwrite value to empty/null then please fill the attribute with proper data
   * 
   * @param {Object} values - An object with application data
   * @param {number} values.id - application number, which will be updated
   * @param {boolean} values.contactByEmail - indicator that the leasing contract should be sent to the lessee by e-mail after approval
   * @param {number} values.contractType - contract type
   * @param {number} values.downPayment - down payment
   * @param {string} values.iban - iban
   * @param {Object} values.lessee - lessee data
   * @param {string} values.lessee.city - lessee city
   * @param {string} values.lessee.email - lessee email
   * @param {number} values.lessee.legalForm - lessee legal form
   * @param {string} values.lessee.name - lessee name
   * @param {string} values.lessee.phoneNumber - lessee phone number
   * @param {string} values.lessee.street - lessee street
   * @param {string} values.lessee.zipCode - lessee zip code
   * @param {number} values.leaseTerm - lease term (returned from getRates() method)
   * @param {string} values.object - name of the object (80 char max)
   * @param {number} values.paymentMethod - payment method
   * @param {number} values.productGroup - product group
   * @param {string} values.promotionId - promotionId (returned from getRates() if conditions matched any promotion)
   * @param {string} values.provision - defines how much commission, retailer wants to receives for each deal. Possible values min: 0, max: 5. Default 0
   * @param {number} values.purchasePrice - purchase price (object value)
   * @param {string} values.receiverEndpoint - endpoint address where requests about application/documentation updates should be delivered
   * @param {Array.<String>} values.receiverFailEmails - array of string emails where info about connection with reveiver endpoint should be delivered
   * @param {string} values.receiverToken - a string, which can be used by a client to ensure that the notification concerns his application
   * @param {number} values.rate - rate (returned from getRates() method)
   * @param {string} values.reference - application reference (helper for shop employees)
   * @param {number} values.residualValuePercent - required if contract type equals 2
   * @param {Object} albisToken - object with Albis token, which lets to communicate with SDK API (returned from getAlbisToken() method)
   *
   * @returns {Object} response - response object
   * @param {null} response.result - null
   * @param {string} response.jsonrpc - "2.0"
   * @param {number} response.id - json rpc lib id
   * @param {string} response.receiverToken - receiver token (if used in input params), a string, which can be used by a client to ensure that the notification concerns his application
   *
   * @example
   *
   * Albis.updateApplication(
   *  {
   *   "applicationId": 272076,
   *   "contactByEmail": true,
   *   "contractType": 1,
   *   "downPayment": 1000,
   *   "iban": "DE88100900001234567892",
   *   "leaseTerm": 54,
   *   "lessee": {
   *     "name": "John Doe",
   *     "legalForm": 1,
   *     "street": "Fifth Avenue 10",
   *     "zipCode": "50000",
   *     "city": "Wroclaw",
   *     "email": "abc@gmail.com",
   *     "phoneNumber": "123456789"
   *    },
   *   "object": "Skoda",
   *   "paymentMethod": 2,
   *   "productGroup": 1,
   *   "provision": 2,
   *   "promotionId": "zyx",
   *   "purchasePrice": 50000,
   *   "rate": 10,
   *   "reference": "abc321321",
   *   "receiverEndpoint": "https://companyName/shop1",
   *   "receiverFailEmails": ["abc@gmail.com", "abc2@gmail.com"]
   * },
   * { token: '12345' })
   */

  async updateApplication(values, albisToken) {
    const endpoint = getEndpointPath('application', this.apiStage, this.SDKendpoint);
    let res = {}

    if (values.object.length > 80) {
      values = {...values, object: values.object.substring(0,77) + "..." }
    }

    try {
      res = await axios.put(endpoint,
        {...values,
        applicationId: values.id}, 
        {
          headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
         }
      })
    } catch(e) {
      throw errorObj(e)
    }
    return res.data
  }

  /**
   * findApplication(id, albisToken) finds application by its id
   * @param {number} id
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} response - An object with application data
   * @param {string} response.jsonrpc - "2.0"
   * @param {string} response.id - json rpc lib id
   * @param {Object} response.result - object with application data
   * @param {number} response.result.applicationId - application id i.e. 54321
   * @param {number} response.result.applicationStatus - application status number i.e. 1150 (you can compare the result with getApplicationsStatus method)
   * @param {string} response.result.applicationStatusDesc - application status description i.e. 'in Bearbeitung' (you can compare the result with getApplicationsStatus method)
   * @param {string} response.result.applicationReceptionDate - when application data were received i.e. '2020-12-21 09:04:11'
   * @param {string} response.result.bankName - bank name, which will cover the transation i.e. 'Berliner Volksbank'
   * @param {string} response.result.bankIdentifierCode - bank identifier code i.e. 'BEVODEBBXYZ'
   * @param {Object[]} response.result.contractDocuments - list of missing or incorrect contract documents. Array with objects, i.e.
   * {
   *    errorNumber: 1,
   *    errorText: 'Id document is needed to proceed the application',
   *    value: 'some more information about the document error',
   *    documentReceptionDate: '2021-02-20',
   *    documentType: 'id'
   * }
   * @param {number} response.result.contractType - contract type i.e. 1 (you can compare the result with getContractTypes method)
   * @param {string[]} response.result.decisionDocuments - list of missing documents for the decision i.e. ['id']
   * @param {number} response.result.downPayment - down payment id i.e. 500
   * @param {number} response.result.finalPayment - possible final payment if the term is shortened. This field is only available to be filled if the contract is cancellable id i.e. 2831.08
   * @param {string} response.result.iban - IBAN of account to be charged with contract instalments i.e. 'DE88100900001234567892'
   * @param {boolean} response.result.insurance - is insurance i.e. true
   * @param {boolean} response.result.isContactByEmail - indicator that the leasing contract should be sent to the lessee by e-mail after approval i.e. true
   * @param {boolean} response.result.isLesseeEmailContact - did lessee agreed to receive an email i.e. true
   * @param {number} response.result.leaseTerm - term of lease in months i.e. 54
   * @param {Object} response.result.lessee - object with lessee data
   * @param {string} response.result.lessee.city - lessee city i.e. 'New York'
   * @param {string} response.result.lessee.email - lessee email i.e. 'johndoe@gmail.com'
   * @param {string} response.result.lessee.fax - lessee fax i.e. '0123 123 123'
   * @param {Object} response.result.lessee.manager - lessee manager data
   * @param {string} response.result.lessee.manager.birthDate - lessee manager birth date, i.e. '1960-12-24' (format YYYY-MM-DD)
   * @param {string} response.result.lessee.manager.city - lessee manager city, i.e. 'New York'
   * @param {string} response.result.lessee.manager.firstName - lessee manager first name, i.e. 'Susane'
   * @param {string} response.result.lessee.manager.fullName - lessee manager full name, i.e. 'Susane Cooper'
   * @param {string} response.result.lessee.manager.lastName - lessee manager last name, i.e. 'Cooper'
   * @param {number} response.result.lessee.manager.salutation - lessee manager salutation, i.e. 2 (you can compare the result with getSalutations method)
   * @param {string} response.result.lessee.manager.salutationDesc - lessee manager salutation description, i.e. 'Frau' (you can compare the result with getSalutations method)
   * @param {string} response.result.lessee.manager.street - lessee manager street, i.e. 'Fifth Avenue'
   * @param {string} response.result.lessee.manager.zipCode - lessee manager zip code, i.e. '50123'
   * @param {string} response.result.lessee.mobileNumber - lessee mobile number, i.e. '+49 543 123 123'
   * @param {string} response.result.lessee.name - lessee name, i.e. 'John Doe'
   * @param {number} response.result.lessee.legalForm - lessee legal form, i.e. 1 (you can compare the result with getLegalFroms method)
   * @param {string} response.result.lessee.phoneNumber - lessee phone number, i.e. '030 1234 1234'
   * @param {string} response.result.lessee.street - lessee street, i.e. 'Fifth Avenue'
   * @param {string} response.result.lessee.zipCode - lessee zip code, i.e. '50125'
   * @param {string} response.result.object - designation of object of lease i.e. 'Fridge Samsung model XYZ'
   * @param {string} response.result.paymentMethod - payment method i.e. 2 (you can compare the result with getPaymentMethods method)
   * @param {string} response.result.productGroup - product group of object of lease i.e. 1
   * @param {string} response.result.promotionId - promotionId (if conditions matched any promotion) i.e. 'xyz'
   * @param {number} response.result.provision - commission, i.e. 4.5
   * @param {number} response.result.purchasePrice - purchase price for object of lease, i.e. 5000
   * @param {number} response.result.rate - monthly leasing rate i.e. 117.87
   * @param {string} response.result.receiverEndpoint - endpoint address where requests about application/documentation updates should be delivered i.e. 'https://companyName.com/shop1'
   * @param {string[]} response.result.receiverFailEmails - array of string emails where info about connection with reveiver endpoint should be delivered i.e. ['emailToBeNotified@gmail.com']
   * @param {string} response.result.receiverToken - a string, which can be used by a client to ensure that the notification concerns his application i.e. 'xyz123'
   * @param {string} response.result.reference - application reference (helper for shop employees) i.e. '123abc'
   * @param {number} response.result.residualValue - residual value i.e. 300 (0 if contract type different than 2)
   * @param {number} response.result.residualValuePercent - residual value percent i.e. 3.0 (null if contract type different than 2)
   * @param {boolean} response.result.saleAndLeaseBack - is application of type sale and lease back i.e. true
   * @param {number} response.result.salesmanId - salesman id which created the application i.e. 12345
   * @param {number} response.result.terminationTerm - when the lease is possible to terminate i.e. 30
   *
   * @example
   * Albis.findApplication(54321, { token: '12345' })
   */

  async findApplication(id, albisToken) {
    const endpoint = getEndpointPath('application', this.apiStage, this.SDKendpoint);
    let res = {}
    try {
      res = await axios.get(endpoint, {
        headers: { 
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
        },
        params: {
          applicationId: id,
        },
      });
    } catch (e) {
      throw errorObj(e)
    }
    return res.data
  }

    /**
   * getLegalForms(albisToken) get a map of all legal forms (needed for lessee data)
   * 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   * 
   * @returns {Object} response
   * @param {string} response.id - json rpc lib id
   * @param {string} response.jsonrpc - json rpc version number ("2.0")
   * @param {Object[]} response.result - array of objects like:
   * {
   *   id: 1,
   *   text: 'GmbH'
   * }
   *
   * @example
   * Albis.getLegalForms({ token: '12345' })
   */

  async getLegalForms(albisToken) {
    const endpoint = getEndpointPath('legal-forms', this.apiStage, this.SDKendpoint);
    let res = {}

    try {
      res = await axios.get(endpoint, {
        headers: { 
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
        },
      });
    } catch (e) {
      throw errorObj(e)
    }

    return res.data
  }

   /**
   * getApplicationsStatus(albisToken) get an array of all posible application status
   * 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} response
   * @param {string} response.id - json rpc lib id
   * @param {string} response.jsonrpc - json rpc version number ("2.0")
   * @param {string[]} response.result - array of strings with names of applications status
   *
   * @example
   * Albis.getApplicationsStatus({ token: '12345' })
   */

  async getApplicationsStatus(albisToken) {
    const endpoint = getEndpointPath('applications-status', this.apiStage, this.SDKendpoint);
    let res = {}

    try {
      res = await axios.get(endpoint, {
        headers: { 
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
        },
      });
    } catch(e) {
      throw errorObj(e)
    }

    return res.data
  }

   /**
   * uploadDocuments(applicationId, documents, albisToken) lets to upload application documents
   * 
   * @param {number} id - application id
   * @param {Object[]} documents - array of objects
   * @param {number} documents.art - document type number (possible values: 1 for Identity card, 2 for Acquired possession form, 3 for Signed contract, 4 for Direct debit authorization, 99 for miscellaneous)
   * @param {string} documents.ext - file extension (possible values: 'pdf', 'jpg', 'jpeg', 'png')
   * @param {string} documents.doc - string created by file encoding using base64
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} response
   * @param {string} response.id - json rpc lib id
   * @param {string} response.jsonrpc - json rpc version number ("2.0")
   * @param {string} response.result - an approval message
   *
   * @example
   * Albis.uploadDocuments(12345, [{ art: 1, ext: "pdf", "doc": "string created by file encoding using base64" }], { token: '12345' })
   */

  async uploadDocuments(id, documents, albisToken) {
    const endpoint = getEndpointPath('documents', this.apiStage, this.SDKendpoint);
    let res = {}

    try {
      res = await axios.post(endpoint, 
        {
          applicationId: id,
          documents
        },
        {
        headers: { 
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
        },
      });
    } catch(e) {
      throw errorObj(e)
    }

    return res.data;
  }

  /**
   * getSalutations(albisToken) get an array of all posible salutations (needed for saveApplication in values.lessee.manager.salutation)
   * 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} response
   * @param {string} response.id - json rpc lib id
   * @param {string} response.jsonrpc - json rpc version number ("2.0")
   * @param {Object[]} response.result - array with objects like:
   * {
   *   id: 1,
   *   text: 'Herr'
   * }
   *
   * @example
   * Albis.getSalutations({ token: '12345' })
   */

  async getSalutations(albisToken) {
    const endpoint = getEndpointPath('salutations', this.apiStage, this.SDKendpoint);
    let res = {}

    try {
      res = await axios.get(endpoint, {
        headers: { 
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
        },
      });
    } catch(e) {
      throw errorObj(e)
    }

    return res.data;
  }

  /**
   * logout(albisToken) logs the user out
   * 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} response
   * @param {string} response.id - json rpc lib id
   * @param {string} response.jsonrpc - json rpc version number ("2.0")
   * @param {null} response.result
   *
   * @example
   * Albis.logout({ token: '12345' })
   */

  async logout(albisToken) {
    const endpoint = getEndpointPath('token', this.apiStage, this.SDKendpoint);
    let res = {}

    try {
      res = await axios.delete(endpoint, {
        headers: { 
          'content-type': 'application/json',
          'Authorization': `Bearer ${albisToken.token}`,
        },
      });
    } catch(e) {
      throw errorObj(e)
    }

    return res.data;
  }

}

export default Albis;
