## Classes

<dl>
<dt><a href="#Albis">Albis</a></dt>
<dd><p>An Albis class</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ResponseGetAlbisToken">ResponseGetAlbisToken</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseAlbisPing">ResponseAlbisPing</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseAlbisEcho">ResponseAlbisEcho</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseGetContractDocuments">ResponseGetContractDocuments</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseChangePassword">ResponseChangePassword</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseGetRates">ResponseGetRates</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseSaveApplication">ResponseSaveApplication</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseUpdateApplication">ResponseUpdateApplication</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseFindApplication">ResponseFindApplication</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseGetLegalForms">ResponseGetLegalForms</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseGetContractTypes">ResponseGetContractTypes</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseGetProductGroups">ResponseGetProductGroups</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseGetPaymentMethods">ResponseGetPaymentMethods</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseGetApplicationsStatus">ResponseGetApplicationsStatus</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseUploadContractDocuments">ResponseUploadContractDocuments</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseGetSalutations">ResponseGetSalutations</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseFindFrameApplication">ResponseFindFrameApplication</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseSaveFrameSubApplication">ResponseSaveFrameSubApplication</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseFindFrameSubApplications">ResponseFindFrameSubApplications</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#ResponseLogout">ResponseLogout</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="Albis"></a>

## Albis
An Albis class

**Kind**: global class  

* [Albis](#Albis)
    * [new Albis(settings)](#new_Albis_new)
    * [.getAlbisToken()](#Albis+getAlbisToken) ⇒ [<code>ResponseGetAlbisToken</code>](#ResponseGetAlbisToken)
    * [.albisPing(albisToken)](#Albis+albisPing) ⇒ [<code>ResponseAlbisPing</code>](#ResponseAlbisPing)
    * [.albisEcho([data], albisToken)](#Albis+albisEcho) ⇒ [<code>ResponseAlbisEcho</code>](#ResponseAlbisEcho)
    * [.getContractDocuments(applicationId, albisToken)](#Albis+getContractDocuments) ⇒ [<code>ResponseGetContractDocuments</code>](#ResponseGetContractDocuments)
    * [.changePassword([albisNewPassword], [auth0NewPassword], albisToken)](#Albis+changePassword) ⇒ [<code>ResponseChangePassword</code>](#ResponseChangePassword)
    * [.getRates(values, albisToken)](#Albis+getRates) ⇒ [<code>ResponseGetRates</code>](#ResponseGetRates)
    * [.saveApplication(values, albisToken)](#Albis+saveApplication) ⇒ [<code>ResponseSaveApplication</code>](#ResponseSaveApplication)
    * [.updateApplication(values, albisToken)](#Albis+updateApplication) ⇒ [<code>ResponseUpdateApplication</code>](#ResponseUpdateApplication)
    * [.findApplication(id, albisToken)](#Albis+findApplication) ⇒ [<code>ResponseFindApplication</code>](#ResponseFindApplication)
    * [.getLegalForms(albisToken)](#Albis+getLegalForms) ⇒ [<code>ResponseGetLegalForms</code>](#ResponseGetLegalForms)
    * [.getContractTypes(albisToken)](#Albis+getContractTypes) ⇒ [<code>ResponseGetContractTypes</code>](#ResponseGetContractTypes)
    * [.getProductGroups(albisToken)](#Albis+getProductGroups) ⇒ [<code>ResponseGetProductGroups</code>](#ResponseGetProductGroups)
    * [.getPaymentMethods(albisToken)](#Albis+getPaymentMethods) ⇒ [<code>ResponseGetPaymentMethods</code>](#ResponseGetPaymentMethods)
    * [.getApplicationsStatus(albisToken)](#Albis+getApplicationsStatus) ⇒ [<code>ResponseGetApplicationsStatus</code>](#ResponseGetApplicationsStatus)
    * [.uploadContractDocuments(id, documents, albisToken)](#Albis+uploadContractDocuments) ⇒ [<code>ResponseUploadContractDocuments</code>](#ResponseUploadContractDocuments)
    * [.getSalutations(albisToken)](#Albis+getSalutations) ⇒ [<code>ResponseGetSalutations</code>](#ResponseGetSalutations)
    * [.findFrameApplication(frameApplicationId, albisToken)](#Albis+findFrameApplication) ⇒ [<code>ResponseFindFrameApplication</code>](#ResponseFindFrameApplication)
    * [.saveFrameSubApplication(values, albisToken)](#Albis+saveFrameSubApplication) ⇒ [<code>ResponseSaveFrameSubApplication</code>](#ResponseSaveFrameSubApplication)
    * [.findFrameSubApplications(frameApplicationId, showExternalStatus, albisToken)](#Albis+findFrameSubApplications) ⇒ [<code>ResponseFindFrameSubApplications</code>](#ResponseFindFrameSubApplications)
    * [.logout(albisToken)](#Albis+logout) ⇒ [<code>ResponseLogout</code>](#ResponseLogout)

<a name="new_Albis_new"></a>

### new Albis(settings)
Create an Albis object
Note: due to security reasons, keep all sensitive data (i.e. APIid, APIsecret, username, ...)


| Param | Type | Description |
| --- | --- | --- |
| settings | <code>Object</code> |  |
| settings.username | <code>string</code> | shop owner or shop admins Albis username |
| settings.password | <code>string</code> | shop owner or shop admins Albis password |
| settings.auth0Username | <code>string</code> | shop owner or shop admins auth0 username |
| settings.auth0Password | <code>string</code> | shop owner or shop admin auth0 password |
| settings.realm | <code>string</code> | shop owner connection name |
| settings.provision | <code>number</code> | provision - defines how much commission, retailer wants to receives for each deal. Possible values min: 0, max: 5. Default 0. Value in half percentage i.e. 1.5 not 1.65 |
| settings.SDKendpoint | <code>string</code> | SDK endpoint |
| [settings.apiStage] | <code>boolean</code> | defines proper API Gateway endpoints stage (API version) for requests (optional) |

**Example**  
```js
new Albis(
 {
   username: 'username',
   password: 'password',
   auth0Username: 'auth0Username',
   auth0Password: 'auth0Password',
   realm: 'shop',
   provision: 3,
   SDKendpoint: 'https://sdkEndpoint',
   apiStage: 'staging',
 })
```
<a name="Albis+getAlbisToken"></a>

### albis.getAlbisToken() ⇒ [<code>ResponseGetAlbisToken</code>](#ResponseGetAlbisToken)
getAlbisToken() returns albisToken needed to call other Albis functions

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseGetAlbisToken</code>](#ResponseGetAlbisToken) - response object  
**Example**  
```js
Albis.getAlbisToken()
```
<a name="Albis+albisPing"></a>

### albis.albisPing(albisToken) ⇒ [<code>ResponseAlbisPing</code>](#ResponseAlbisPing)
albisPing(albisToken) checks the connection with Albis API and shop credentials

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseAlbisPing</code>](#ResponseAlbisPing) - response object  

| Param | Type | Description |
| --- | --- | --- |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.albisPing({ token: '1234' })
```
<a name="Albis+albisEcho"></a>

### albis.albisEcho([data], albisToken) ⇒ [<code>ResponseAlbisEcho</code>](#ResponseAlbisEcho)
albisEcho(data, albisToken)

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseAlbisEcho</code>](#ResponseAlbisEcho) - response object  

| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>string</code> | random string (optional) |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.albisEcho("Hello World", { token: '1234' })
```
<a name="Albis+getContractDocuments"></a>

### albis.getContractDocuments(applicationId, albisToken) ⇒ [<code>ResponseGetContractDocuments</code>](#ResponseGetContractDocuments)
getContractDocuments(applicationId, albisToken) returns needed documents. Warning: this function needs sometimes (rare) even up to 2mins for response

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseGetContractDocuments</code>](#ResponseGetContractDocuments) - response object  

| Param | Type | Description |
| --- | --- | --- |
| applicationId | <code>number</code> | application number |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.getContractDocuments(123456, { token: 12345 })
```
<a name="Albis+changePassword"></a>

### albis.changePassword([albisNewPassword], [auth0NewPassword], albisToken) ⇒ [<code>ResponseChangePassword</code>](#ResponseChangePassword)
changePassword(albisNewPassword, auth0NewPassword, albisToken)

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseChangePassword</code>](#ResponseChangePassword) - response object  

| Param | Type | Description |
| --- | --- | --- |
| [albisNewPassword] | <code>string</code> | albis new password (optional) |
| [auth0NewPassword] | <code>string</code> | auth0 new password (optional) |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.changePassword("albisNewPassword", "auth0NewPassword", { token: 12345 })
```
<a name="Albis+getRates"></a>

### albis.getRates(values, albisToken) ⇒ [<code>ResponseGetRates</code>](#ResponseGetRates)
getRates(values, albisToken) retrieves proposed rates. Returned object is needed for proceed getApplication(albisToken)

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseGetRates</code>](#ResponseGetRates) - response object  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Object</code> | An object with data for providing rate offers |
| values.purchasePrice | <code>number</code> | Total net value of the cart [EUR] |
| values.productGroup | <code>number</code> | Product group of chosen products |
| [values.downPayment] | <code>number</code> | Net value of down payment [EUR]. Default 0 (optional) |
| values.contractType | <code>number</code> | Contract type |
| values.paymentMethod | <code>number</code> | Payment options |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.getRates({ purchasePrice: 5000, productGroup: 1, downPayment: 500, contractType: 1, paymentMethod: 1 }, { token: '12345' })
```
<a name="Albis+saveApplication"></a>

### albis.saveApplication(values, albisToken) ⇒ [<code>ResponseSaveApplication</code>](#ResponseSaveApplication)
saveApplication(values, albisToken) saves an application

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseSaveApplication</code>](#ResponseSaveApplication) - response - response object  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Object</code> | An object with application data |
| [values.contactByEmail] | <code>boolean</code> | indicator that the leasing contract should be sent to the lessee by e-mail after approval. TRUE/FALSE, Default:FALSE (optional) |
| values.contractType | <code>number</code> | contract type (result of getContractTypes() method) |
| [values.downPayment] | <code>number</code> | down payment (optional) |
| [values.iban] | <code>string</code> | IBAN of account to be charged with contract instalments (may be entered with spaces) (optional) |
| values.lessee | <code>Object</code> | lessee data |
| values.lessee.city | <code>string</code> | lessee city |
| values.lessee.email | <code>string</code> | lessee email |
| values.lessee.legalForm | <code>number</code> | lessee legal form |
| values.lessee.name | <code>string</code> | lessee name |
| values.lessee.phoneNumber | <code>string</code> | lessee phone number |
| values.lessee.street | <code>string</code> | lessee street |
| values.lessee.zipCode | <code>string</code> | lessee zip code |
| values.lessee.manager | <code>Object</code> | lessee's manager data |
| values.lessee.manager.birthDate | <code>string</code> | lessee's manager birth date (format required: "YYYY-MM-DD") |
| values.lessee.manager.city | <code>string</code> | lessee's manager city |
| [values.lessee.manager.faxNumber] | <code>string</code> | lessee's manager phone number (optional) |
| values.lessee.manager.firstName | <code>string</code> | lessee's manager first name |
| values.lessee.manager.lastName | <code>string</code> | lessee's manager last name |
| [values.lessee.manager.phoneNumber] | <code>string</code> | lessee's manager phone number (optional) |
| values.lessee.manager.salutation | <code>number</code> | lessee's manager salutation form (result of getSalutations() method) |
| values.lessee.manager.street | <code>string</code> | lessee's manager street |
| values.lessee.manager.zipCode | <code>string</code> | lessee's manager zip code |
| values.leaseTerm | <code>number</code> | lease term (returned from getRates() method) |
| values.object | <code>string</code> | name of the object (80 char max) |
| values.paymentMethod | <code>number</code> | payment method (result of getPaymentMethods() method) |
| values.productGroup | <code>number</code> | product group (is a part of "credentials". Can be assigned by Albis only) |
| [values.promotionId] | <code>string</code> | lease term (returned from getRates() if conditions matched any promotion) (optional) |
| values.purchasePrice | <code>number</code> | purchase price (object value) |
| values.rate | <code>number</code> | rate (returned from getRates() method) |
| [values.reference] | <code>string</code> | application reference (helper for shop employees) (optional) |
| [values.receiverEndpoint] | <code>string</code> | endpoint address where requests about application/documentation updates should be delivered (optional) |
| [values.receiverFailEmails] | <code>Array.&lt;String&gt;</code> | array of string emails where info about connection with reveiver endpoint should be delivered (optional) |
| [values.receiverToken] | <code>string</code> | a string, which can be used by a client to ensure that the notification concerns his application (optional) |
| [values.residualValuePercent] | <code>number</code> | required if contract type equals 2 (optional) |
| [values.serviceFee] | <code>number</code> | required if contract type equals 7 or 12 (optional) |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with SDK API (returned from getAlbisToken() method) |

**Example**  
```js
Albis.saveApplication(
 {
   contactByEmail: true,
   contractType: 1,
   downPayment: 500,
   finalPayment: 150,
   iban: 'DE88100900001234567892',
   lessee: {
     name: 'Antonina',
     street: 'Lichtenrade',
     city: 'Berlin',
     zipCode: '50000',
     phoneNumber: '+48500000000',
     email: 'abc@gmail.com',
     legalForm: 1,
     manager: {
       salutation: 1,
       firstName: 'Johanna',
       lastName: 'Surname',
       street: 'Piłsudskiego',
       zipCode: '50000',
       city: 'Hamburg',
       birthDate: '1990-12-30'
     },
   },
   leaseTerm: 12,
   object: 'Fridge VW',
   paymentMethod: 1,
   productGroup: 1,
   promotionId: 'xyz',
   purchasePrice: 5000,
   rate: 300,
   rateWithInsurance: 323,
   reference: 'abc123',
   ssv: true,
   receiverToken: '123abc',
   receiverEndpoint: 'company.com/endpoint',
   receiverFailEmails: ['abc@gmail.com', 'abc2@gmail.com']
},
{token: '12345'})
```
<a name="Albis+updateApplication"></a>

### albis.updateApplication(values, albisToken) ⇒ [<code>ResponseUpdateApplication</code>](#ResponseUpdateApplication)
updateApplication(values, albisToken) updates an application. Warning: empty/null values will overwrite atributes to empty/null. If you wouldn't like to overwrite value to empty/null then please fill the attribute with proper data

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseUpdateApplication</code>](#ResponseUpdateApplication) - response object  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Object</code> | An object with application data |
| values.id | <code>number</code> | application number, which will be updated |
| values.contactByEmail | <code>boolean</code> | indicator that the leasing contract should be sent to the lessee by e-mail after approval |
| values.contractType | <code>number</code> | contract type |
| values.downPayment | <code>number</code> | down payment |
| values.iban | <code>string</code> | iban |
| values.lessee | <code>Object</code> | lessee data |
| values.lessee.city | <code>string</code> | lessee city |
| values.lessee.email | <code>string</code> | lessee email |
| values.lessee.legalForm | <code>number</code> | lessee legal form |
| values.lessee.name | <code>string</code> | lessee name |
| values.lessee.phoneNumber | <code>string</code> | lessee phone number |
| values.lessee.street | <code>string</code> | lessee street |
| values.lessee.zipCode | <code>string</code> | lessee zip code |
| values.leaseTerm | <code>number</code> | lease term (returned from getRates() method) |
| values.object | <code>string</code> | name of the object (80 char max) |
| values.paymentMethod | <code>number</code> | payment method |
| values.productGroup | <code>number</code> | product group |
| values.promotionId | <code>string</code> | promotionId (returned from getRates() if conditions matched any promotion) |
| values.provision | <code>string</code> | defines how much commission, retailer wants to receives for each deal. Possible values min: 0, max: 5. Default 0 |
| values.purchasePrice | <code>number</code> | purchase price (object value) |
| values.receiverEndpoint | <code>string</code> | endpoint address where requests about application/documentation updates should be delivered |
| values.receiverFailEmails | <code>Array.&lt;String&gt;</code> | array of string emails where info about connection with reveiver endpoint should be delivered |
| values.receiverToken | <code>string</code> | a string, which can be used by a client to ensure that the notification concerns his application |
| values.rate | <code>number</code> | rate (returned from getRates() method) |
| values.reference | <code>string</code> | application reference (helper for shop employees) |
| values.residualValuePercent | <code>number</code> | required if contract type equals 2 |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with SDK API (returned from getAlbisToken() method) |

**Example**  
```js
Albis.updateApplication(
 {
  "applicationId": 272076,
  "contactByEmail": true,
  "contractType": 1,
  "downPayment": 1000,
  "iban": "DE88100900001234567892",
  "leaseTerm": 54,
  "lessee": {
    "name": "John Doe",
    "legalForm": 1,
    "street": "Fifth Avenue 10",
    "zipCode": "50000",
    "city": "Wroclaw",
    "email": "abc@gmail.com",
    "phoneNumber": "123456789"
   },
  "object": "Skoda",
  "paymentMethod": 2,
  "productGroup": 1,
  "provision": 2,
  "promotionId": "zyx",
  "purchasePrice": 50000,
  "rate": 10,
  "reference": "abc321321",
  "receiverEndpoint": "https://companyName/shop1",
  "receiverFailEmails": ["abc@gmail.com", "abc2@gmail.com"]
},
{ token: '12345' })
```
<a name="Albis+findApplication"></a>

### albis.findApplication(id, albisToken) ⇒ [<code>ResponseFindApplication</code>](#ResponseFindApplication)
findApplication(id, albisToken) finds application by its id

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseFindApplication</code>](#ResponseFindApplication) - response - An object with application data  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> |  |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.findApplication(54321, { token: '12345' })
```
<a name="Albis+getLegalForms"></a>

### albis.getLegalForms(albisToken) ⇒ [<code>ResponseGetLegalForms</code>](#ResponseGetLegalForms)
getLegalForms(albisToken) get a map of all legal forms (needed for lessee data)

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseGetLegalForms</code>](#ResponseGetLegalForms) - response object  

| Param | Type | Description |
| --- | --- | --- |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.getLegalForms({ token: '12345' })
```
<a name="Albis+getContractTypes"></a>

### albis.getContractTypes(albisToken) ⇒ [<code>ResponseGetContractTypes</code>](#ResponseGetContractTypes)
getContractTypes(albisToken) get an array of all contract types available for the shop user (needed for lessee data)

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseGetContractTypes</code>](#ResponseGetContractTypes) - response object  

| Param | Type | Description |
| --- | --- | --- |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.getContractTypes({ token: '12345' })
```
<a name="Albis+getProductGroups"></a>

### albis.getProductGroups(albisToken) ⇒ [<code>ResponseGetProductGroups</code>](#ResponseGetProductGroups)
getProductGroups(albisToken) get an array of all product groups available for the shop user (needed for lessee data)

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseGetProductGroups</code>](#ResponseGetProductGroups) - response object  

| Param | Type | Description |
| --- | --- | --- |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.getProductGroups({ token: '12345' })
```
<a name="Albis+getPaymentMethods"></a>

### albis.getPaymentMethods(albisToken) ⇒ [<code>ResponseGetPaymentMethods</code>](#ResponseGetPaymentMethods)
getPaymentMethods(albisToken) get an array of all payment methods available for the shop user (needed for lessee data)

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseGetPaymentMethods</code>](#ResponseGetPaymentMethods) - response object  

| Param | Type | Description |
| --- | --- | --- |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.getPaymentMethods({ token: '12345' })
```
<a name="Albis+getApplicationsStatus"></a>

### albis.getApplicationsStatus(albisToken) ⇒ [<code>ResponseGetApplicationsStatus</code>](#ResponseGetApplicationsStatus)
getApplicationsStatus(albisToken) get an array of all posible application status

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseGetApplicationsStatus</code>](#ResponseGetApplicationsStatus) - response  

| Param | Type | Description |
| --- | --- | --- |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.getApplicationsStatus({ token: '12345' })
```
<a name="Albis+uploadContractDocuments"></a>

### albis.uploadContractDocuments(id, documents, albisToken) ⇒ [<code>ResponseUploadContractDocuments</code>](#ResponseUploadContractDocuments)
uploadContractDocuments(applicationId, documents, albisToken) lets to upload application documents

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseUploadContractDocuments</code>](#ResponseUploadContractDocuments) - response object  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | application id |
| documents | <code>Array.&lt;Object&gt;</code> | array of objects |
| documents.art | <code>number</code> | document type number (possible values: 1 for Identity card, 2 for Acquired possession form, 3 for Signed contract, 4 for Direct debit authorization, 99 for miscellaneous) |
| documents.ext | <code>string</code> | file extension (possible values: 'pdf', 'jpg', 'jpeg', 'png') |
| documents.doc | <code>string</code> | string created by file encoding using base64 |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.uploadContractDocuments(12345, [{ art: 1, ext: "pdf", "doc": "string created by file encoding using base64" }], { token: '12345' })
```
<a name="Albis+getSalutations"></a>

### albis.getSalutations(albisToken) ⇒ [<code>ResponseGetSalutations</code>](#ResponseGetSalutations)
getSalutations(albisToken) get an array of all posible salutations (needed for saveApplication in values.lessee.manager.salutation)

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseGetSalutations</code>](#ResponseGetSalutations) - response object  

| Param | Type | Description |
| --- | --- | --- |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.getSalutations({ token: '12345' })
```
<a name="Albis+findFrameApplication"></a>

### albis.findFrameApplication(frameApplicationId, albisToken) ⇒ [<code>ResponseFindFrameApplication</code>](#ResponseFindFrameApplication)
findFrameApplication(frameApplicationId, albisToken) finds frame application - returns its data

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseFindFrameApplication</code>](#ResponseFindFrameApplication) - response - An object which contains a frame application data  

| Param | Type | Description |
| --- | --- | --- |
| frameApplicationId | <code>number</code> |  |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.findFrameApplication(54321, { token: '12345' })
```
<a name="Albis+saveFrameSubApplication"></a>

### albis.saveFrameSubApplication(values, albisToken) ⇒ [<code>ResponseSaveFrameSubApplication</code>](#ResponseSaveFrameSubApplication)
saveFrameSubApplication(values, albisToken) saves a sub application of the indicated frame application

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseSaveFrameSubApplication</code>](#ResponseSaveFrameSubApplication) - response - response object  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Object</code> | An object with application data |
| [values.contactByEmail] | <code>boolean</code> | indicator that the leasing contract should be sent to the lessee by e-mail after approval. TRUE/FALSE, Default:FALSE (optional) |
| values.contractType | <code>number</code> | contract type (result of getContractTypes() method) |
| [values.downPayment] | <code>number</code> | down payment (optional) |
| [values.iban] | <code>string</code> | IBAN of account to be charged with contract instalments (may be entered with spaces) (optional) |
| values.frameApplicationId | <code>number</code> | a frame application id |
| values.lessee | <code>Object</code> | lessee data |
| values.lessee.city | <code>string</code> | lessee city |
| values.lessee.email | <code>string</code> | lessee email |
| values.lessee.legalForm | <code>number</code> | lessee legal form |
| values.lessee.name | <code>string</code> | lessee name |
| values.lessee.phoneNumber | <code>string</code> | lessee phone number |
| values.lessee.street | <code>string</code> | lessee street |
| values.lessee.zipCode | <code>string</code> | lessee zip code |
| values.lessee.manager | <code>Object</code> | lessee's manager data |
| values.lessee.manager.birthDate | <code>string</code> | lessee's manager birth date (format required: "YYYY-MM-DD") |
| values.lessee.manager.city | <code>string</code> | lessee's manager city |
| [values.lessee.manager.faxNumber] | <code>string</code> | lessee's manager phone number (optional) |
| values.lessee.manager.firstName | <code>string</code> | lessee's manager first name |
| values.lessee.manager.lastName | <code>string</code> | lessee's manager last name |
| [values.lessee.manager.phoneNumber] | <code>string</code> | lessee's manager phone number (optional) |
| values.lessee.manager.salutation | <code>number</code> | lessee's manager salutation form (result of getSalutations() method) |
| values.lessee.manager.street | <code>string</code> | lessee's manager street |
| values.lessee.manager.zipCode | <code>string</code> | lessee's manager zip code |
| values.leaseTerm | <code>number</code> | lease term (returned from getRates() method) |
| values.object | <code>string</code> | name of the object (80 char max) |
| values.paymentMethod | <code>number</code> | payment method (result of getPaymentMethods() method) |
| values.productGroup | <code>number</code> | product group (is a part of "credentials". Can be assigned by Albis only) |
| [values.promotionId] | <code>string</code> | lease term (returned from getRates() if conditions matched any promotion) (optional) |
| values.purchasePrice | <code>number</code> | purchase price (object value) |
| values.rate | <code>number</code> | rate (returned from getRates() method) |
| [values.reference] | <code>string</code> | application reference (helper for shop employees) (optional) |
| [values.receiverEndpoint] | <code>string</code> | endpoint address where requests about application/documentation updates should be delivered (optional) |
| [values.receiverFailEmails] | <code>Array.&lt;String&gt;</code> | array of string emails where info about connection with reveiver endpoint should be delivered (optional) |
| [values.receiverToken] | <code>string</code> | a string, which can be used by a client to ensure that the notification concerns his application (optional) |
| [values.residualValuePercent] | <code>number</code> | required if contract type equals 2 (optional) |
| [values.serviceFee] | <code>number</code> | required if contract type equals 7 or 12 (optional) |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with SDK API (returned from getAlbisToken() method) |

**Example**  
```js
Albis.saveFrameSubApplication(
 {
   contactByEmail: true,
   contractType: 1,
   downPayment: 500,
   finalPayment: 150,
   iban: 'DE88100900001234567892',
   frameApplicationId: 123456
   lessee: {
     name: 'Antonina',
     street: 'Lichtenrade',
     city: 'Berlin',
     zipCode: '50000',
     phoneNumber: '+48500000000',
     email: 'abc@gmail.com',
     legalForm: 1,
     manager: {
       salutation: 1,
       firstName: 'Johanna',
       lastName: 'Surname',
       street: 'Piłsudskiego',
       zipCode: '50000',
       city: 'Hamburg',
       birthDate: '1990-12-30'
     },
   },
   leaseTerm: 12,
   object: 'Fridge VW',
   paymentMethod: 1,
   productGroup: 1,
   promotionId: 'xyz',
   purchasePrice: 5000,
   rate: 300,
   rateWithInsurance: 323,
   reference: 'abc123',
   ssv: true,
   receiverToken: '123abc',
   receiverEndpoint: 'company.com/endpoint',
   receiverFailEmails: ['abc@gmail.com', 'abc2@gmail.com']
},
{token: '12345'})
```
<a name="Albis+findFrameSubApplications"></a>

### albis.findFrameSubApplications(frameApplicationId, showExternalStatus, albisToken) ⇒ [<code>ResponseFindFrameSubApplications</code>](#ResponseFindFrameSubApplications)
findFrameSubApplications(frameApplicationId, albisToken) finds all sub applications of the indicated frame application

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseFindFrameSubApplications</code>](#ResponseFindFrameSubApplications) - response - An object which contains an array in the result attribute of sub applications belonging to the frame application  

| Param | Type | Description |
| --- | --- | --- |
| frameApplicationId | <code>number</code> |  |
| showExternalStatus | <code>boolean</code> | indicates, if applicationStatusTxt with a description of received application status should be attached to the result set |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.findFrameSubApplications(54321, { token: '12345' })
```
<a name="Albis+logout"></a>

### albis.logout(albisToken) ⇒ [<code>ResponseLogout</code>](#ResponseLogout)
logout(albisToken) logs the user out

**Kind**: instance method of [<code>Albis</code>](#Albis)  
**Returns**: [<code>ResponseLogout</code>](#ResponseLogout) - response object  

| Param | Type | Description |
| --- | --- | --- |
| albisToken | <code>Object</code> | object with Albis token, which lets to communicate with Albis API |

**Example**  
```js
Albis.logout({ token: '12345' })
```
<a name="ResponseGetAlbisToken"></a>

## ResponseGetAlbisToken : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| albisToken.token | <code>string</code> | token used for user authorisation |
| albisToken.scope | <code>string</code> | shows users access |
| albisToken.token_type | <code>string</code> | token type |
| albisToken.expires_in_Auth0 | <code>number</code> | how long the token will be valid (number of seconds) |
| albisToken.expires | <code>number</code> | how long the token will be valid (Unix time stamp) |

<a name="ResponseAlbisPing"></a>

## ResponseAlbisPing : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>string</code> | 'pong' |

<a name="ResponseAlbisEcho"></a>

## ResponseAlbisEcho : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>string</code> | data input string (or default "Test") |

<a name="ResponseGetContractDocuments"></a>

## ResponseGetContractDocuments : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>string</code> | base64 string (i.e. a PDF file) |

<a name="ResponseChangePassword"></a>

## ResponseChangePassword : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.albisPassChangeStatus.id | <code>string</code> | json rpc lib id |
| response.albisPassChangeStatus.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.albisPassChangeStatus.result | <code>string</code> | null |
| response.auth0PassChangeStatus.created_at | <code>string</code> | date when the user has been created |
| response.auth0PassChangeStatus.email | <code>string</code> | user's email (same as login) |
| response.auth0PassChangeStatus.email_verified | <code>boolean</code> | is email verified |
| response.auth0PassChangeStatus.identities | <code>Object</code> | object with description of user connection |
| response.auth0PassChangeStatus.name | <code>boolean</code> | user login name (same as email) |
| response.auth0PassChangeStatus.nickname | <code>boolean</code> | user nickname name (same as email without the domain ending) |
| response.auth0PassChangeStatus.picture | <code>string</code> | user picture URL (png) |
| response.auth0PassChangeStatus.updated_at | <code>string</code> | date of the last update |
| response.auth0PassChangeStatus.user_id | <code>string</code> | auth0 user id |
| response.auth0PassChangeStatus.last_password_reset | <code>string</code> | date of the last password reset |
| response.auth0PassChangeStatus.last_ip | <code>string</code> | ip used for the last connection |
| response.auth0PassChangeStatus.last_login | <code>string</code> | date of the last login |
| response.auth0PassChangeStatus.logins_count | <code>number</code> | number of total logins of this user |

<a name="ResponseGetRates"></a>

## ResponseGetRates : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>Array.&lt;Object&gt;</code> | array of objects i.e.  {    leaseTerm: 18,    rate: 188.8,    rateWithInsurance: 195.7,    total: 3522.6  } |

<a name="ResponseSaveApplication"></a>

## ResponseSaveApplication : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>number</code> | a unique number of the application |
| response.receiverToken | <code>string</code> | receiver token (if used in input params), a string, which can be used by a client to ensure that the notification concerns his application |

<a name="ResponseUpdateApplication"></a>

## ResponseUpdateApplication : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.result | <code>null</code> | null |
| response.jsonrpc | <code>string</code> | "2.0" |
| response.id | <code>number</code> | json rpc lib id |
| response.receiverToken | <code>string</code> | receiver token (if used in input params), a string, which can be used by a client to ensure that the notification concerns his application |

<a name="ResponseFindApplication"></a>

## ResponseFindApplication : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.jsonrpc | <code>string</code> | "2.0" |
| response.id | <code>string</code> | json rpc lib id |
| response.result | <code>Object</code> | object with application data |
| response.result.applicationId | <code>number</code> | application id i.e. 54321 |
| response.result.applicationStatus | <code>number</code> | application status number i.e. 1150 (you can compare the result with getApplicationsStatus method) |
| response.result.applicationStatusDesc | <code>string</code> | application status description i.e. 'in Bearbeitung' (you can compare the result with getApplicationsStatus method) |
| response.result.applicationReceptionDate | <code>string</code> | when application data were received i.e. '2020-12-21 09:04:11' |
| response.result.bankName | <code>string</code> | bank name, which will cover the transation i.e. 'Berliner Volksbank' |
| response.result.bankIdentifierCode | <code>string</code> | bank identifier code i.e. 'BEVODEBBXYZ' |
| response.result.contractDocuments | <code>Array.&lt;Object&gt;</code> | list of missing or incorrect contract documents. Array with objects, i.e. {    errorNumber: 1,    errorText: 'Id document is needed to proceed the application',    value: 'some more information about the document error',    documentReceptionDate: '2021-02-20',    documentType: 'id' } |
| response.result.contractType | <code>number</code> | contract type i.e. 1 (you can compare the result with getContractTypes method) |
| response.result.decisionDocuments | <code>Array.&lt;string&gt;</code> | list of missing documents for the decision i.e. ['id'] |
| response.result.downPayment | <code>number</code> | down payment id i.e. 500 |
| response.result.finalPayment | <code>number</code> | possible final payment if the term is shortened. This field is only available to be filled if the contract is cancellable id i.e. 2831.08 |
| response.result.iban | <code>string</code> | IBAN of account to be charged with contract instalments i.e. 'DE88100900001234567892' |
| response.result.insurance | <code>boolean</code> | is insurance i.e. true |
| response.result.isContactByEmail | <code>boolean</code> | indicator that the leasing contract should be sent to the lessee by e-mail after approval i.e. true |
| response.result.isLesseeEmailContact | <code>boolean</code> | did lessee agreed to receive an email i.e. true |
| response.result.leaseTerm | <code>number</code> | term of lease in months i.e. 54 |
| response.result.lessee | <code>Object</code> | object with lessee data |
| response.result.lessee.city | <code>string</code> | lessee city i.e. 'New York' |
| response.result.lessee.email | <code>string</code> | lessee email i.e. 'johndoe@gmail.com' |
| response.result.lessee.fax | <code>string</code> | lessee fax i.e. '0123 123 123' |
| response.result.lessee.manager | <code>Object</code> | lessee manager data |
| response.result.lessee.manager.birthDate | <code>string</code> | lessee manager birth date, i.e. '1960-12-24' (format YYYY-MM-DD) |
| response.result.lessee.manager.city | <code>string</code> | lessee manager city, i.e. 'New York' |
| response.result.lessee.manager.firstName | <code>string</code> | lessee manager first name, i.e. 'Susane' |
| response.result.lessee.manager.fullName | <code>string</code> | lessee manager full name, i.e. 'Susane Cooper' |
| response.result.lessee.manager.lastName | <code>string</code> | lessee manager last name, i.e. 'Cooper' |
| response.result.lessee.manager.salutation | <code>number</code> | lessee manager salutation, i.e. 2 (you can compare the result with getSalutations method) |
| response.result.lessee.manager.salutationDesc | <code>string</code> | lessee manager salutation description, i.e. 'Frau' (you can compare the result with getSalutations method) |
| response.result.lessee.manager.street | <code>string</code> | lessee manager street, i.e. 'Fifth Avenue' |
| response.result.lessee.manager.zipCode | <code>string</code> | lessee manager zip code, i.e. '50123' |
| response.result.lessee.mobileNumber | <code>string</code> | lessee mobile number, i.e. '+49 543 123 123' |
| response.result.lessee.name | <code>string</code> | lessee name, i.e. 'John Doe' |
| response.result.lessee.legalForm | <code>number</code> | lessee legal form, i.e. 1 (you can compare the result with getLegalFroms method) |
| response.result.lessee.phoneNumber | <code>string</code> | lessee phone number, i.e. '030 1234 1234' |
| response.result.lessee.street | <code>string</code> | lessee street, i.e. 'Fifth Avenue' |
| response.result.lessee.zipCode | <code>string</code> | lessee zip code, i.e. '50125' |
| response.result.object | <code>string</code> | designation of object of lease i.e. 'Fridge Samsung model XYZ' |
| response.result.paymentMethod | <code>string</code> | payment method i.e. 2 (you can compare the result with getPaymentMethods method) |
| response.result.productGroup | <code>string</code> | product group of object of lease i.e. 1 |
| response.result.promotionId | <code>string</code> | promotionId (if conditions matched any promotion) i.e. 'xyz' |
| response.result.provision | <code>number</code> | commission, i.e. 4.5 |
| response.result.purchasePrice | <code>number</code> | purchase price for object of lease, i.e. 5000 |
| response.result.rate | <code>number</code> | monthly leasing rate i.e. 117.87 |
| response.result.receiverEndpoint | <code>string</code> | endpoint address where requests about application/documentation updates should be delivered i.e. 'https://companyName.com/shop1' |
| response.result.receiverFailEmails | <code>Array.&lt;string&gt;</code> | array of string emails where info about connection with reveiver endpoint should be delivered i.e. ['emailToBeNotified@gmail.com'] |
| response.result.receiverToken | <code>string</code> | a string, which can be used by a client to ensure that the notification concerns his application i.e. 'xyz123' |
| response.result.reference | <code>string</code> | application reference (helper for shop employees) i.e. '123abc' |
| response.result.residualValue | <code>number</code> | residual value i.e. 300 (0 if contract type different than 2) |
| response.result.residualValuePercent | <code>number</code> | residual value percent i.e. 3.0 (null if contract type different than 2) |
| response.result.saleAndLeaseBack | <code>boolean</code> | is application of type sale and lease back i.e. true |
| response.result.salesmanId | <code>number</code> | salesman id which created the application i.e. 12345 |
| response.result.terminationTerm | <code>number</code> | when the lease is possible to terminate i.e. 30 |

<a name="ResponseGetLegalForms"></a>

## ResponseGetLegalForms : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>Array.&lt;Object&gt;</code> | array of objects like: {   id: 1,   text: 'GmbH' } |

<a name="ResponseGetContractTypes"></a>

## ResponseGetContractTypes : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>Array.&lt;Object&gt;</code> | array of objects like: {   id: 1,      description: "VA-Leasingvertrag",      abbreviation: "VA" } |

<a name="ResponseGetProductGroups"></a>

## ResponseGetProductGroups : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>Array.&lt;Object&gt;</code> | array of objects like: {   id: 1,      maxPossibleTerm: 30,      maxPossibleTermAlbis: 36,      minPossibleTerm: 18,      minPossibleTermAlbis: 18,      description: "EDV (Hard- und Software)",      monthOfCancellation: 30,      position: 1 } |

<a name="ResponseGetPaymentMethods"></a>

## ResponseGetPaymentMethods : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>Array.&lt;Object&gt;</code> | array of objects like: {   id: 1,      description: "quartalsweise" } |

<a name="ResponseGetApplicationsStatus"></a>

## ResponseGetApplicationsStatus : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>Array.&lt;string&gt;</code> | array of strings with names of applications status |

<a name="ResponseUploadContractDocuments"></a>

## ResponseUploadContractDocuments : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>string</code> | an approval message |

<a name="ResponseGetSalutations"></a>

## ResponseGetSalutations : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>Array.&lt;Object&gt;</code> | array with objects like: {   id: 1,   text: 'Herr' } |

<a name="ResponseFindFrameApplication"></a>

## ResponseFindFrameApplication : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.jsonrpc | <code>string</code> | "2.0" |
| response.id | <code>string</code> | json rpc lib id |
| response.result | <code>Object</code> | object with application data |
| response.result.applicationId | <code>number</code> | application id i.e. 54321 |
| response.result.framePurchasePriceSum | <code>number</code> | a sum of all purchase aldready made under frame application |
| response.result.frameRestSum | <code>number</code> | remaining purchase value under frame application |
| response.result.contractTypes | <code>Array.&lt;Object&gt;</code> | a list of contract types, which could be used. Array with objects, i.e. {    contractType: 1,    contractTypeDesc: 'VA-Leasingvertrag', } |
| response.result.lessee | <code>number</code> | object with lessee data |
| response.result.lessee.salutation | <code>string</code> | lessee salutation i.e. "Herr" |
| response.result.lessee.title | <code>string</code> | lessee title i.e. "POSTDOC" |
| response.result.lessee.firstName | <code>string</code> | lessee first name i.e. "Marion" |
| response.result.lessee.lastName | <code>string</code> | lessee last name i.e. "Smith" |
| response.result.lessee.street | <code>string</code> | lessee street, i.e. 'Fifth Avenue' |
| response.result.lessee.zipCode | <code>string</code> | lessee zip code, i.e. '50125' |
| response.result.lessee.city | <code>string</code> | lessee city i.e. 'New York' |
| response.result.lessee.phoneNumber | <code>string</code> | lessee phone number, i.e. '030 1234 1234' |
| response.result.lessee.mobileNumber | <code>string</code> | lessee mobile number, i.e. '+49 543 123 123' |
| response.result.lessee.email | <code>string</code> | lessee email i.e. 'johndoe@gmail.com' |
| response.result.lessee.birthDate | <code>number</code> | lessee birth date i.e. 1990-03-03 00:00:00 |

<a name="ResponseSaveFrameSubApplication"></a>

## ResponseSaveFrameSubApplication : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>number</code> | a unique number of the sub application |
| response.receiverToken | <code>string</code> | receiver token (if used in input params), a string, which can be used by a client to ensure that the notification concerns his application |

<a name="ResponseFindFrameSubApplications"></a>

## ResponseFindFrameSubApplications : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>Array.&lt;Object&gt;</code> | array with objects like: {   subApplication: 987654,       applicationReceptionDate: "2021-06-01",       applicationStatus: 123,       lastUpdate: "2021-05-01",       object: "Fridge",       purchasePrice: 30000,       leaseTerm: 36,       rate": 35.50,       contractType": 1,       terminationTerm: 12,       isInsurance: false,       hid400: 123456, - salesman id number       serviceFee: 0,       retailer: "EDEKABANK AG",       user: "Kris Henkel",       applicationStatusTxt: "Antrag genehmigt"} |

<a name="ResponseLogout"></a>

## ResponseLogout : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| response.id | <code>string</code> | json rpc lib id |
| response.jsonrpc | <code>string</code> | json rpc version number ("2.0") |
| response.result | <code>null</code> |  |

