const express = require("express")
const axios = require("axios")
require('dotenv').config();

const app = express();
app.use(express.json())

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

//env vars for the Auth0 CLI Client that has create:tenants scope
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE

const getAccessToken = async () => {
  const tokenData = {
    "client_id": AUTH0_CLIENT_ID,
    "client_secret": AUTH0_CLIENT_SECRET,
    "audience": AUTH0_AUDIENCE,
    "grant_type": "client_credentials"
  }

  const getTokenEndpoint = AUTH0_DOMAIN + '/oauth/token';
  try {
    const response = await axios.post(getTokenEndpoint, tokenData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.access_token;
  } catch (error) { return error; }

}

const createTenant = async (access_token, tenantData) => {
  const createTenantEndpoint = AUTH0_DOMAIN + '/api/v2/tenants';
  let tenant, error;
  try {
    const response = await axios.post(createTenantEndpoint, tenantData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + access_token
      },
      withCredentials: false
    })

    return {
      name: response.data.name,
      client_id: response.data.management_client.client_id,
      client_secret: response.data.management_client.client_secret
    };
  } catch (error) {
    return error.response.data;
  }
}

app.post("/tenant", async (req, res) => {

  const tenantData = req.body;

  //get access token
  const access_token = await getAccessToken();

  // create tenant
  const result = await createTenant(access_token, tenantData)
  console.log(result);
  return res.send(result);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});