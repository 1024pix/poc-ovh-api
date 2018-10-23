const fs = require('fs');
const request = require('request');

require('dotenv').config();

const ovh = require('ovh')({
  endpoint: process.env.OVH_API_ENDPOINT,
  appKey: process.env.OVH_API_AK,
  appSecret: process.env.OVH_API_AS,
  consumerKey: process.env.OVH_API_CK,
});

function listProjectServices() {
  ovh.requestPromised('GET', '/cloud/project')
    .then((result) => {
      console.log(result);
    });
}
// listProjectServices();

function listStorageContainers() {
  ovh.requestPromised('GET', `/cloud/project/${process.env.OVH_API_SERVICE}/storage`)
    .then((result) => {
      console.log(result);
    });
}
// listStorageContainers();

function createStorageContainer(containerName) {
  ovh.requestPromised('POST', `/cloud/project/${process.env.OVH_API_SERVICE}/storage`, {
      archive: false,
      containerName,
      region: 'GRA5'
    })
    .then((result) => {
      console.log(result);
    });
}
// createStorageContainer('org_XXX');

function getStorageContainer(containerId) {
  console.log(`containerId = ${containerId}`);

  ovh.requestPromised('GET', `/cloud/project/${process.env.OVH_API_SERVICE}/storage/${containerId}`)
    .then((result) => {
      console.log(result);
    });
}
// getStorageContainer('62334a6e587a457552314a424e513d3d');

async function addDocument(containerName, documentName) {
  const result = await ovh.requestPromised('POST', `/cloud/project/${process.env.OVH_API_SERVICE}/storage/access`);

  const data = fs.readFileSync(`${__dirname}/images/${documentName}`);

  const endpointUrl = result.endpoints.find((endpoint) => endpoint.region === process.env.OVH_API_REGION).url;

  const options = {
    url: `${endpointUrl}/${containerName}/${documentName}`,
    headers: { 'X-Auth-Token': result.token },
    body: data
  };
  request.put(options, (err, response) => {
    if (err) throw err;
    console.log(`${response.statusCode} - ${response.statusMessage}`);
  });
}
// addDocument('org_3', 'logo-ifcam.png');
