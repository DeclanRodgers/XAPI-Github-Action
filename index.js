const endpointActions = require('./lib/endpointactions');
const sequenceActions = require('./lib/determinesequence');
const core = require('@actions/core');
const github = require('@actions/github')

//let apiEndpoint = core.getInput('api-endpoint');
let destinationFilter = core.getInput('destination-filter');
let xCommand = core.getInput('device-command');
let tokenData = core.getInput('token-data');

sequenceActions.DetermineSequence(destinationFilter, tokenData, xCommand);
