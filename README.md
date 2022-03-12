# ~ auth0 signup API

> Created for Hackauth0n '22. 🚀

This API provides the ability to create tenants. 

Intended to be used by the `auth0-cli`.


## How To Use

1. Install dependencies
  
   `npm install`

1. Create a `.env` with the following. You will need to have a client in the RTA to interact with the API. See [docs](https://auth0team.atlassian.net/wiki/spaces/CSInfra/pages/323125274/How+to+enable+Tenant+Creation+via+API2+internal+use+only#Setting-up-a-client-in-the-RTA-for-using-the-tenant-creation-API). 

  ```
  AUTH0_DOMAIN=<AUTH0_DOMAIN>
  AUTH0_AUDIENCE=https://<AUTH0_DOMAIN>/api/v2/
  AUTH0_CLIENT_ID=<CLIENT_ID>
  AUTH0_CLIENT_SECRET=<CLIENT_SECRET>

  ```

1. Start up API 

    `npm run dev`

    > Server will run on `http://localhost:3000`

1. Use the cli!
