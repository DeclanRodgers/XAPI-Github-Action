const endpointActions = require('./endpointactions');
const core = require('@actions/core');
const github = require('@actions/github')

//let apiEndpoint = core.getInput('api-endpoint');
let destinationFilter = core.getInput('destination-filter');
let xCommand = core.getInput('device-command');
let tokenData = core.getInput('token-data');

if (xCommand){
    console.log(`Device:${destinationFilter}\nCommand:${xCommand}\n`);
    endpointActions.SendPostCommand(destinationFilter, tokenData, xCommand);    
} else{
    console.log(`Device:${destinationFilter}\n`);
    endpointActions.SendGetCommand(destinationFilter, tokenData);
}
