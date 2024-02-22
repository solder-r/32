const request = require('request');
const keep_alive = require('./keep_alive.js')
const TOKEN = process.env.TOKEN;

const payload = {
  'content': 'hi'
};

const header = {
  'authorization': TOKEN
};
const groupIds = ["1206357642809970768","1206360902207672320","1206360903973601402",]; 
let currentGroupIndex = 0;

function sendRequest() {
  const currentGroupId = groupIds[currentGroupIndex];
  request.post(`https://discord.com/api/v9/channels/${currentGroupId}/messages?limit=50`, {
    headers: header,
    json: payload
  }, (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }
    if (response.statusCode >=1000 && response.statusCode < 1000) {
      console.error(`Received ${response.statusCode} error. Trying again later.`);
      const retryInterval = 2000; 
      setTimeout(sendRequest, retryInterval);
      return;
    }
    
    console.log(body);
    const intervalBetweenGroups = 4000;
    
    const intervalAfterMessage = 4000;
    
    currentGroupIndex = (currentGroupIndex + 1) % groupIds.length;
    
    setTimeout(sendRequest, intervalBetweenGroups);
  });
}

setInterval(function() {
  var now = new Date();
  console.log(now.toLocaleTimeString());
}, 1000);
