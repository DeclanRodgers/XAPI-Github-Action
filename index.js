const endpointActions = require('./endpointactions');
const core = require('@actions/core');
const github = require('@actions/github')
const fs = require('file-system');

// let xCommand //= fs.readFileSync("textfiles/command.txt").toString();
// let tokenData = fs.readFileSync("textfiles/secret.txt").toString();
// let destinationFilter =  fs.readFileSync("textfiles/destinationFilter.txt").toString();

//let apiEndpoint = core.getInput('api-endpoint');
let destinationFilter = core.getInput('destination-filter');
let xCommand = core.getInput('device-command');
let tokenData = core.getInput('token-data');

if (typeof xCommand !== 'undefined'|| xCommand != null){
    console.log(`Device:${destinationFilter}\nCommand:${xCommand}\n`);
    endpointActions.SendPostCommand(destinationFilter, tokenData, xCommand);    
} else{
    console.log(`Device:${destinationFilter}\n`);
    endpointActions.SendGetCommand(destinationFilter, tokenData);
}
