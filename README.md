# OVH-API-Exploration

### Pre-requesites : 

You must have:
- an OVH application well configured with its key & secret ;
- Node (8+) and NPM (5+)

### Getting started

*1/* Clone the repository

```
git clone git@github.com:1024pix/poc-ovh-api.git && cd poc-ovh-api
```

*2/* Install the NPM dependencies

```
npm install
```

*3/* Create a `.env` file (at the root of the project) with the following variables :

```
OVH_API_ENDPOINT=<> # ex: 'ovh-eu'
OVH_API_AK=<your_application_key>
OVH_API_AS=<your_application_secret>
OVH_API_SERVICE=<your_ovh_cloud_project_storage_service_id>
OVH_API_REGION=<your_ovh_cloud_project_storage_service_container_region> # ex: 'GRA5'
```

*4/* Run the `credentials.js` program to generate a new consumer key associated to your account.

```
node credentials
```

*5/* Validate the consumer key by opening the result validation URL in a browser and logging in and add it to your `.env` file.

```
OVH_API_CK=<your_consumer_key>
```

From now you are ready to use the OVH API client.

*6/* Uncomment an exemple method in `index.js` and execute it:

```
npm start
```

