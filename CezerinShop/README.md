# HOW TO RUN ALBIS CEZERIN SHOP DEMO FROM GITHUB DOCKER REGISTRY

To test ALBIS LeaseKit-SDK and to see how it works with a sample shop you need to do the following. We assume that `git` is installed.

1. Install Docker from https://www.docker.com/products/docker-desktop
2. Clone the LeaseKitSDK repo `git clone https://github.com/ALBIS-GROUP/LeaseKitSDK.git`

3. Open a terminal application and navigate to `CezerinShop/`
4. Fill `docker-compose.yml` with credentials received from ALBIS.

```plaintext
`ALBIS_AUTH0ENDPOINT,`
`ALBIS_API_ID,`
`ALBIS_API_SECRET,`
`ALBIS_SHOP_USERNAME,`
`ALBIS_SHOP_PASSWORD,`
`ALBIS_SHOP_REALM,`
`ALBIS_AUDIENCE,`
`ALBIS_GRANT_TYPE`
```

5. Create a GitHub token to access GitHub from the CLI: https://github.com/settings/tokens

[https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token
](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line#creating-a-token)

Select the scopes **`repo`** and **`read:packages`**.

Copy the token for the next step.

6. Log in to GitHub docker registry using the command line

`docker login -u USERNAME -p TOKEN docker.pkg.github.com`

7. In the Terminal application run the command `docker-compose up -d`
The example shop will run on `localhost:3000` (store frontend), `localhost:3001` (backend only, no interface), `localhost:3002` (admin interface).

8. To stop application run the command: `docker-compose down`
9. To remove the downloaded docker images use:
`docker rmi -f imageIDhere` - you will need image IDs from `docker images`.