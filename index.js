const core = require('@actions/core');
const github = require('@actions/github')
const axios = require('axios');
var fs = require('file-system');

let apiEndpoint = fs.readFileSync("textfiles/destination.txt").toString();
let xCommand = fs.readFileSync("textfiles/command.txt").toString();
let tokenData = fs.readFileSync("textfiles/secret.txt").toString();
//const destinationFilter = core.getInput('destination-filter');
let deviceEndpoint = fs.readFileSync("textfiles/device-endpoint.txt").toString();
const destinationFilter = 'CC5A535FEA2F?useDemo=true';

console.log(`Endpoint: ${apiEndpoint} \nCommand: ${xCommand}`);

// if (!destinationFilter){
//     CallEndpoint();
// } else {
//     CallEndpointWithFilter(destinationFilter);
// }

CallEndpoint();

function CallEndpoint(){
    let headerConfig = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer '+tokenData
        }
    };
    
    try{
        axios.get(apiEndpoint, headerConfig).then(response =>{
            fs.writeFileSync("logs/output.txt", response.data);
            console.log("Response written.");
            //console.log(response.data);
        }).catch(function(error){
            if(error.response){
                fs.writeFileSync("logs/axios-error.txt", error.stack);
                console.log("Axios error data written.");
            }
        });
    } catch (error) {
        fs.writeFileSync("logs/error.txt", error.stack);
        console.log("Error data written.");
    }
}

function CallEndpointWithFilter(destinationFilter){
    let headerConfig = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer '+tokenData
        }
    };
    
    try{
        axios.post(apiEndpoint, headerConfig).then(response =>{
            console.log(response.data);
        })
    } catch (error) {
        console.log(error.stack);
    }
}