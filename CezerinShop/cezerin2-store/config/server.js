// config used by store server side only
require('dotenv').config();

module.exports = {
	// store UI language
	language: process.env.LANGUAGE || 'en',
	// used by Store (server side)
	ajaxBaseUrl: process.env.AJAX_BASE_URL || 'http://localhost:3001/ajax',
	// used by Store (server side)
	apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api/v1',

	storeListenPort: process.env.STORE_PORT || 3000,

	// key to sign tokens
	jwtSecretKey: process.env.JWT_SECRET_KEY || '-',

	// key to sign store cookies
	cookieSecretKey: process.env.COOKIE_SECRET_KEY || '-',

	albisAuth0Endpoint: process.env.ALBIS_AUTH0ENDPOINT,
	albisApiId: process.env.ALBIS_API_ID,
	albisApiSecret: process.env.ALBIS_API_SECRET,
	albisShopUsername: process.env.ALBIS_SHOP_USERNAME,
	albisPassword: process.env.ALBIS_SHOP_PASSWORD,
	albisShopRealm: process.env.ALBIS_SHOP_REALM,
	albisAudience: process.env.ALBIS_AUDIENCE,
	albisGrantType: process.env.ALBIS_GRANT_TYPE,
	SDKendpoint: process.env.SDK_ENDPOINT,
	receiverEndpoint:  process.env.RECEIVER_ENDPOINT,
	receiverFailEmails: process.env.RECEIVER_FAIL_EMAILS,
	apiStage: process.env.API_STAGE,
	nodeEnv: process.env.NODE_ENV
};
