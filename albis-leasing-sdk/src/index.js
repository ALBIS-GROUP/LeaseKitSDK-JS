import axios from 'axios';
import _ from 'lodash';
import { getEndpointPath, getToken, testGetRates } from './helpers';
import { mapPaymentOption } from './helpers';

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
    const albisToken = await getToken(
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
    const endpoint = getEndpointPath('rate', this.apiStage, this.SDKendpoint, this.nodeEnv);

    values = {...values, paymentMethod: mapPaymentOption(values.paymentMethod)}
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
   * @param values.contractType - contract type
   * @param {number} values.downPayment - down payment
   * @param values.finalPayment - final payment (returned from getRates() method)
   * @param values.iban - iban
   * @param {Object} values.lessee - lessee data
   * @param values.lessee.city - lessee city
   * @param values.lessee.email - lessee email
   * @param values.lessee.legalForm - lessee legal form
   * @param values.lessee.name - lessee name
   * @param values.lessee.phoneNumber - lessee phone number
   * @param values.lessee.street - lessee street
   * @param values.lessee.zipCode - lessee zip code
   * @param {Object} values.lessee.manager - lessee's manager data
   * @param values.lessee.manager.birthDate - lessee's manager birth date
   * @param values.lessee.manager.city - lessee's manager city
   * @param values.lessee.manager.firstName - lessee's manager first name
   * @param values.lessee.manager.lastName - lessee's manager last name
   * @param values.lessee.manager.salutation - lessee's manager salutation form
   * @param values.lessee.manager.street - lessee's manager street
   * @param values.lessee.manager.zipCode - lessee's manager zip code
   * @param values.leaseTerm - lease term (returned from getRates() method)
   * @param values.object - name of the object (80 char max)
   * @param values.paymentMethod - payment method ('monthly' or 'quarterly')
   * @param values.productGroup - product group
   * @param values.promotion_id - lease term (returned from getRates() if conditions matched any promotion)
   * @param values.purchasePrice - purchase price (object value)
   * @param values.rate - rate (returned from getRates() method)
   * @param values.rateWithInsurance - rate with insurance (returned from getRates() method)
   * @param values.reference - application reference (helper for shop employees)
   * @param {Object} values.retailer - retailer (supplier) data - a company, which stores the object
   * @param values.retailer.city - retailer (supplier) city
   * @param values.retailer.email - retailer (supplier) email
   * @param values.retailer.name - retailer (supplier) name
   * @param values.retailer.street - retailer (supplier) street
   * @param values.retailer.telnr - retailer (supplier) phone number
   * @param values.retailer.zipCode - retailer (supplier) zip code
   * @param values.receiverEndpoint - endpoint address where requests about application/documentation updates should be delivered (optional)
   * @param values.receiverFailEmails - array of emails where info about connection with reveiver endpoint should be delivered (optional)
   * @param values.residualValue - 
   * @param {Object} albisToken - object with Albis token, which lets to communicate with SDK API
   *
   * @returns {Object} response - response object
   * @param response.result - a unique number of the application
   * @param jsonrpc - "2.0"
   * @param id - json rpc lib id
   *
   * @example
   *
   * saveApplication(
   *  {
   *    contactByEmail: true,
   *    contractType: 1,
   *    downPayment: null,
   *    finalPayment: 150,
   *    iban: 'DE88100900001234567892',
   *    lessee: {
   *      name: 'Antonina',
   *      street: 'Lichtenrade',
   *      city: 'Berlin',
   *      zipCode: 50000,
   *      phoneNumber: '+48500000000',
   *      email: 'abc@gmail.com',
   *      legalForm: 'GmbH',
   *      manager: {
   *        salutation: 1,
   *        firstName: 'Johanna',
   *        lastName: 'Surname',
   *        street: 'Piłsudskiego',
   *        zipCode: 50000,
   *        city: 'Hamburg',
   *        birthDate: '2000-01-01'
   *      }
   *    },
   *    leaseTerm: 12,
   *    object: 'Fridge VW',
   *    paymentMethod: 'quarterly',
   *    productGroup: 1,
   *    promotion_id: 'xyz',
   *    purchasePrice: 5000,
   *    rate: 300,
   *    rateWithInsurance: 323,
   *    reference: 'abc123',
   *    ssv: true,,
   *    retailer: {
   *      email: 'xyz@gmai.com',
   *      name: 'Retailer company',
   *      ort: 'Hamburg',
   *      plz: '10000',
   *      strasse: 'Kitzingstrasse',
   *      telnr: '123456789'
   *    }
   *    receiverEndpoint: 'company.com/endpoint',
   *    receiverFailEmails: [abc@gmail.com, abc2@gmail.com]
   * },
   * {token: '12345'})
   */

  async saveApplication(values, albisToken) {
    const endpoint = getEndpointPath('application', this.apiStage, this.SDKendpoint, this.nodeEnv);

    //mapping payment options
    values = {...values, paymentMethod: mapPaymentOption(values.paymentMethod)}

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
    return axios.post(endpoint,
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
    const endpoint = getEndpointPath('application', this.apiStage, this.SDKendpoint, this.nodeEnv);

    //check if chosen lease term exist for those values

    const app = await this.findApplication(id);
    const rates = await this.getRates(
      _.pick(app.rate, [
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
      return axios.put(endpoint, 
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
    const endpoint = getEndpointPath('legal-forms', this.apiStage, this.SDKendpoint, this.nodeEnv);

    const legalForms = await axios.get(endpoint, {
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

export default Albis;
