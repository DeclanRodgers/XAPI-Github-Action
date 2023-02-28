const axios = require('axios');

function UrlConcat(apiEndpoint, deviceId){
  const replacements = {
    id: deviceId        
  };
    
  const completedURL = apiEndpoint.replace(/{\w+}/g, placeholder =>
    replacements[placeholder.substring(1, placeholder.length - 1)] || placeholder
  );

  return completedURL;
};

function SendGetCommand(deviceid, jwtToken){
  let apiEndpoint = "https://mpp.unifiedfx.com/api/devices/{id}?useDemo=true";
  let deviceEndpoint = UrlConcat(apiEndpoint, deviceid);

  console.log(`*** GET REQUEST *** \nEndpoint: ${deviceEndpoint}`);

  let headerConfig = {
    headers: {
        accept: 'text/plain',
        Authorization: 'Bearer '+jwtToken
    }
  };

  try{
    axios.get(deviceEndpoint, headerConfig).then(response =>{
        console.log(`\nGET Data recieved:\n${JSON.stringify(response.data, null, "\t")}`);
    }).catch(function(error){
        if(error.response){
            console.log(`Axios error:\n${error.stack}`);
        }
    });
  } catch (error) {
      fs.writeFileSync("logs/error.txt", error.stack);
      console.log("Error data written.");
  };
}

function SendPostCommand(deviceid, jwtToken, xCommand){
  let apiEndpoint = "https://mpp.unifiedfx.com/api/devices/{id}/command?useDemo=true";
  let deviceEndpoint = UrlConcat(apiEndpoint, deviceid);

  console.log(`*** POST REQUEST *** \nEndpoint: ${deviceEndpoint} \nCommand: ${xCommand}`);

  let bodyData = {
    "command": xCommand
  };

  let headerConfig = {
    headers: {
        accept: '*/*',
        ContentType: 'application/json',
        Authorization: 'Bearer '+jwtToken
    }
  };

  try{
    axios.post(deviceEndpoint, bodyData, headerConfig).then(response =>{
      console.log(`\nPOST Data recieved:\n${JSON.stringify(response.data, null, "\t")}`);
    }).catch(function(error){
      if(error.response){
        console.log(`Axios error:\n${error.stack}`);
      }
  });
  }catch(error){
    console.log(`Error occured written:\n${error.stack}`);
  };
}

module.exports = {UrlConcat, SendGetCommand, SendPostCommand};