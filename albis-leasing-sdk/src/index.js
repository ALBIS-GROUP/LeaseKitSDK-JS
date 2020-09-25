import axios from 'axios';
import _ from 'lodash';
import { getEndpointPath, getToken } from './helpers';

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
   * @param {string=} settings.username - shop owner or shop admins Albis username
   * @param {string=} settings.password - shop owner or shop admins Albis password
   * @param {string=} settings.auth0Username - shop owner or shop admins auth0 username
   * @param {string=} settings.auth0Password - shop owner or shop admin auth0 password
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
   *    auth0Username: 'auth0Username',
   *    auth0Password: 'auth0Password',
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
    this.auth0Username = settings.auth0Username;
    this.auth0Password = settings.auth0Password;
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
    const albisToken = await getToken(
      this.SDKendpoint,
      this.apiStage,
      this.username,
      this.password,
      this.auth0Username,
      this.auth0Password,
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
    const endpoint = getEndpointPath('ping', this.apiStage, this.SDKendpoint, this.nodeEnv);
    return axios.get(endpoint, {
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
   * @param {number} values.paymentMethod - Payment options
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} An Object with attributes passed to the function and additional attributes:
   * leaseTerm,
   * rate,
   * rateWithInsurance
   * finalPayment (if there is an opportunity to shrotening the lease term),
   * total
   *
   * @example
   *
   * getRates({ purchasePrice: 5000, productGroup: 1, downPayment: 500, contractType: 1, paymentMethod: 1 }, { token: '12345' })
   */

  async getRates(values, albisToken) {
    let rates = {};
    const endpoint = getEndpointPath('rate', this.apiStage, this.SDKendpoint, this.nodeEnv);

    rates = axios.get(endpoint, {
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
   * @param {Object} values - An object with application data
   * @param {boolean} values.contactByEmail - is contact by email required
   * @param {number} values.contractType - contract type
   * @param {number} values.downPayment - down payment
   * @param {number} values.finalPayment - final payment (returned from getRates() method)
   * @param {string} values.iban - iban
   * @param {Object} values.lessee - lessee data
   * @param {string} values.lessee.city - lessee city
   * @param {string} values.lessee.email - lessee email
   * @param {number} values.lessee.legalForm - lessee legal form
   * @param {string} values.lessee.name - lessee name
   * @param {string} values.lessee.phoneNumber - lessee phone number
   * @param {string} values.lessee.street - lessee street
   * @param {string} values.lessee.zipCode - lessee zip code
   * @param {Object} values.lessee.manager - lessee's manager data
   * @param {string} values.lessee.manager.birthDate - lessee's manager birth date (format required: "DD.MM.YYYY")
   * @param {string} values.lessee.manager.city - lessee's manager city
   * @param {string} values.lessee.manager.firstName - lessee's manager first name
   * @param {string} values.lessee.manager.lastName - lessee's manager last name
   * @param {string} values.lessee.manager.salutation - lessee's manager salutation form
   * @param {string} values.lessee.manager.street - lessee's manager street
   * @param {string} values.lessee.manager.zipCode - lessee's manager zip code
   * @param {number} values.leaseTerm - lease term (returned from getRates() method)
   * @param {string} values.object - name of the object (80 char max)
   * @param {number} values.paymentMethod - payment method
   * @param {number} values.productGroup - product group
   * @param {string} values.promotionId - lease term (returned from getRates() if conditions matched any promotion)
   * @param {number} values.purchasePrice - purchase price (object value)
   * @param {number} values.rate - rate (returned from getRates() method)
   * @param {number} values.rateWithInsurance - rate with insurance (returned from getRates() method)
   * @param {string} values.reference - application reference (helper for shop employees)
   * @param {Object} values.retailer - retailer (supplier) data - a company, which stores the object
   * @param {string} values.retailer.city - retailer (supplier) city
   * @param {string} values.retailer.email - retailer (supplier) email
   * @param {string} values.retailer.name - retailer (supplier) name
   * @param {string} values.retailer.street - retailer (supplier) street
   * @param {string} values.retailer.telnr - retailer (supplier) phone number
   * @param {string} values.retailer.zipCode - retailer (supplier) zip code
   * @param {string} values.receiverEndpoint - endpoint address where requests about application/documentation updates should be delivered (optional)
   * @param {Object[]} values.receiverFailEmails - array of string emails where info about connection with reveiver endpoint should be delivered (optional)
   * @param values.residualValuePercent - required if contract type equals 2
   * @param {Object} albisToken - object with Albis token, which lets to communicate with SDK API (returned from getAlbisToken() method)
   *
   * @returns {Object} response - response object
   * @param response.result - a unique number of the application
   * @param response.jsonrpc - "2.0"
   * @param response.id - json rpc lib id
   *
   * @example
   *
   * saveApplication(
   *  {
   *    contactByEmail: true,
   *    contractType: 1,
   *    downPayment: null,
   *    finalPayment: 150,
   *    hid400: 1234567,
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
   *        birthDate: '01.01.1990'
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
   *    ssv: true,,
   *    retailer: {
   *      email: 'xyz@gmai.com',
   *      name: 'Retailer company',
   *      city: 'Hamburg',
   *      zipCode: '10000',
   *      street: 'Kitzingstrasse',
   *      phoneNumber: '123456789'
   *    },
   *    receiverEndpoint: 'company.com/endpoint',
   *    receiverFailEmails: ['abc@gmail.com', 'abc2@gmail.com']
   * },
   * {token: '12345'})
   */

  async saveApplication(values, albisToken) {
    const endpoint = getEndpointPath('application', this.apiStage, this.SDKendpoint, this.nodeEnv);

    if (values.object.length > 80) {
      values = {...values, object: values.object.substring(0,77) + "..." }
    }
    return axios.post(endpoint,
      {
        ...values, provision: this.provision,
      }, 
      {
        headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
       }
    })
  }

  /**
   * updateApplication(values, albisToken) updates an application
   * 
   * @param {Object} values - An object with application data
   * @param {number} values.id - application number, which will be updated
   * @param {boolean} values.contactByEmail - is contact by email required
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
   * @param {string} values.promotionId - lease term (returned from getRates() if conditions matched any promotion)
   * @param {string} values.provision - defines how much commission, retailer wants to receives for each deal. Possible values min: 0, max: 5. Default 0
   * @param {number} values.purchasePrice - purchase price (object value)
   * @param {number} values.rate - rate (returned from getRates() method)
   * @param {string} values.reference - application reference (helper for shop employees)
   * @param {string} values.receiverEndpoint - endpoint address where requests about application/documentation updates should be delivered (optional)
   * @param {Object[]} values.receiverFailEmails - array of string emails where info about connection with reveiver endpoint should be delivered (optional)
   * @param values.residualValuePercent - required if contract type equals 2
   * @param {Object} albisToken - object with Albis token, which lets to communicate with SDK API (returned from getAlbisToken() method)
   *
   * @returns {Object} response - response object
   * @param response.result - a unique number of the application
   * @param response.resultjsonrpc - "2.0"
   * @param response.resultid - json rpc lib id
   *
   * @example
   *
   * updateApplication(
   *  {
   *    id: 12345,
   *    contactByEmail: true,
   *    contractType: 1,
   *    downPayment: null,
   *    iban: 'DE88100900001234567892',
   *    lessee: {
   *      name: 'Antonina',
   *      street: 'Lichtenrade',
   *      city: 'Berlin',
   *      zipCode: '50000',
   *      phoneNumber: '+48500000000',
   *      email: 'abc@gmail.com',
   *      legalForm: 1,
   *    },
   *    leaseTerm: 12,
   *    object: 'Fridge VW',
   *    paymentMethod: 1,
   *    productGroup: 1,
   *    promotionId: 'xyz',
   *    provision: 3,
   *    purchasePrice: 5000,
   *    rate: 300,
   *    reference: 'abc123',
   *    receiverEndpoint: 'company.com/endpoint',
   *    receiverFailEmails: ['abc@gmail.com', 'abc2@gmail.com']
   * },
   * {token: '12345'})
   */

  async updateApplication(values, albisToken) {
    const endpoint = getEndpointPath('application', this.apiStage, this.SDKendpoint, this.nodeEnv);

    if (values.object.length > 80) {
      values = {...values, object: values.object.substring(0,77) + "..." }
    }
    return axios.put(endpoint,
      {...values,
      applicationId: values.id}, 
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
    const endpoint = getEndpointPath('application', this.apiStage, this.SDKendpoint, this.nodeEnv);

    return axios.get(endpoint, {
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
   * getLegalForms(albisToken) get a map of all legal forms (needed for lessee data)
   * 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} An object with legal forms and their respective IDs
   *
   * @example
   * getLegalForms({token: '12345'})
   */

  async getLegalForms(albisToken) {
    const endpoint = getEndpointPath('legal-forms', this.apiStage, this.SDKendpoint, this.nodeEnv);

    const legalForms = await axios.get(endpoint, {
      headers: { 
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
      },
    });

    return legalForms.data;
  }

   /**
   * getApplicationsStatus(albisToken) get an array of all posible application status
   * 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} An object with array of possible application status (plural)
   *
   * @example
   * getApplicationsStatus({token: '12345'})
   */

  async getApplicationsStatus(albisToken) {
    const endpoint = getEndpointPath('applications-status', this.apiStage, this.SDKendpoint, this.nodeEnv);

    const applicationStatus = await axios.get(endpoint, {
      headers: { 
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
      },
    });

    return applicationStatus.data;
  }

   /**
   * uploadDocuments(id, documents, albisToken) lets to upload application documents
   * 
   * @param {number} id - application number
   * @param {Object[]} documents - array of objects
   * @param {number} documents.art - document type number (possible values: 1 for Identity card, 2 for Acquired possession form, 3 for Signed contract, 4 for Direct debit authorization, 99 for miscellaneous)
   * @param {string} documents.ext - file extension (possible values: 'pdf', 'jpg', 'jpeg', 'png')
   * @param {string} documents.doc - string created by file encoding using base64
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {string} An approval message
   *
   * @example
   * uploadDocuments(12345, [{art: 1, ext: "pdf", "doc": "string created by file encoding using base64"}], {token: '12345'})
   */

  async uploadDocuments(id, documents, albisToken) {
    const endpoint = getEndpointPath('documents', this.apiStage, this.SDKendpoint, this.nodeEnv);

    const albisResponse = await axios.post(endpoint, 
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

    return albisResponse.data;
  }

  /**
   * getSalutations(albisToken) get an array of all posible salutations (needed for saveApplication in values.lessee.manager.salutation)
   * 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with Albis API
   *
   * @returns {Object} An object with array of possible salutations
   *
   * @example
   * getSalutations({token: '12345'})
   */

  async getSalutations(albisToken) {
    const endpoint = getEndpointPath('salutations', this.apiStage, this.SDKendpoint, this.nodeEnv);

    const salutations = await axios.get(endpoint, {
      headers: { 
        'content-type': 'application/json',
        'Authorization': `Bearer ${albisToken.token}`,
      },
    });

    return salutations.data;
  }

}

export default Albis;
