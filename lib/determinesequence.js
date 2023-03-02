const endpointActions = require('./endpointactions');

function DetermineSequence(destinationFilter, tokenData, xCommand){
    //logic to check destination filter is single or array of devices
    let multipleDevicesCheck = Array.isArray(destinationFilter);
    if(multipleDevicesCheck){
        SequenceMultipleDevices(destinationFilter, tokenData, xCommand);
    } else {
        SequenceSingleDevice(destinationFilter, tokenData, xCommand);
    }
}

function SequenceSingleDevice(){
    if (xCommand){
        endpointActions.SendPostCommand(device, tokenData, xCommand);    
    } else{
        endpointActions.SendGetCommand(device, tokenData);
    }
}

function SequenceMultipleDevices(destinationFilter, tokenData, xCommand){
    destinationFilter.forEach(device => {
        if (xCommand){
            endpointActions.SendPostCommand(device, tokenData, xCommand);    
        } else{
            endpointActions.SendGetCommand(device, tokenData);
        }
    });
}

module.exports = {DetermineSequence};