# ALBIS LeaseKit SDK - Leasing für Ihre Kunden

![Albis SDK](./CezerinShop/cezerin2-store/src/shared/images/albis-logo.png)

## Übersicht
Mit dem „ALBIS LeaseKit SDK“ kann Leasing einfach als weitere Zahlungsart integriert werden und steht in kurzer Zeit allen Kunden als Full-Service über ALBIS zur Verfügung. Die neue Zahlungsart wird unkompliziert über das SDK in eCommerce-Anwendungen (Shop- oder ERP-System) eingebunden.

Das ganze System ist dafür entworfen worden, um Integrationen in unterschiedlichste eCommerce-Umgebungen so einfach und modern wie möglich zu gestalten und dabei ein Maximum an Sicherheit zu bieten.

## Technische Details

### Aufbau des Systems

![Albis SDK](./CezerinShop/cezerin2-store/src/shared/images/diagram-big.svg)

Der ALBIS LeaseKit-Dienst läuft in der sicheren und hochverfügbaren AWS-Cloud. Dies gewährleistet den schnellen, ausfallsicheren und hochverfügbaren Service für ALBIS-Partner.

Entwickler greifen auf diesen Dienst bequem über das ALBIS LeaseKit SDK zu und können Leasing als Zahlungsmethode einfach in sein System integrieren.

Zum Begutachten der Funktionen steht ein Beispiel-Shop über Docker bereit, über den Interessenten das System ausprobieren können. Außerdem steht zum Entwickeln und Testen des SDK eine eigene Instanz der API bereit.

### SDK-Sprachenunterstützung
Ab sofort ist das ALBIS LeaseKit SDK in JavaScript verfügbar. Weitere Sprachen wie zum Beispiel PHP oder Java folgen in Kürze.

### Dokumentation und Anwendungs-Beispiele
Hier über GitHub finden Enwickler alle notwendigen und hilfreichen Informationen zur Integration der LeaseKit SDK: 

- Dokumentation
- Bibliotheken für gängige Programmiersprachen (soweit verfügbar)
- Code-Beispiele inklusive Beispiel-Shop-Integration

## Installation

Wenn Sie “npm“ verwenden:

```bash
$ npm install @albis-group/albis-leasing-sdk
```

Wenn Sie “yarn” verwenden:

```bash
$ yarn add @albis-group/albis-leasing-sdk
```

## Beispiel

### CommonJS Nutzung

Um die TypeScript-Schreibweisen (für intellisense / autocomplete) bei der Verwendung von CommonJS-Importen mit `require()` zu erhalten, gehen Sie folgendermaßen vor:

```js
const Albis = require('@albis-group/albis-leasing-sdk').default;

// Albis.<method> Autovervollständigung und Parametereingaben stehen jetzt zur Verfügung
```

### Browser Nutzung

```js
import Albis from '@albis-group/albis-leasing-sdk';

```

Beispiel Code:
```js
const albis = new Albis({
   username: 'username',
   password: 'password',
   auth0Username: 'auth0Username',
   auth0Password: 'auth0Password',
   realm: 'shop',
   provision: 3,
   SDKendpoint: 'https://sdkEndpoint',
   apiStage: 'staging',
   nodeEnv: 'development'
 })

const token = albis.getAlbisToken()

const rates = albis.getRates({
  purchasePrice: 5000,
  productGroup: 1,
  downPayment: 0,
  contractType: 1,
  paymentMethod: 'monthly'
  }, token)
