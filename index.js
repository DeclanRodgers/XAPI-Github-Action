const urlConcat = require('./lib/endpointConcat');
const core = require('@actions/core');
const github = require('@actions/github')
const axios = require('axios');
var fs = require('file-system');

//const destinationFilter = core.getInput('destination-filter');
let apiEndpoint = fs.readFileSync("textfiles/destination.txt").toString();
let xCommand = fs.readFileSync("textfiles/command.txt").toString();
let tokenData = fs.readFileSync("textfiles/secret.txt").toString();
let destinationFilter =  fs.readFileSync("textfiles/destinationFilter.txt").toString();
let deviceEndpoint = urlConcat.urlConcat(apiEndpoint, destinationFilter);

console.log(`Endpoint: ${deviceEndpoint} \nCommand: ${xCommand}`);

// if (!destinationFilter){
//     CallEndpoint();
// } else {
//     CallEndpointWithFilter(destinationFilter);
// }

//CallEndpoint();

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
            console.log(`Token recieved:\n`,response.data);
            //console.log(response.data);
        }).catch(function(error){
            if(error.response){
                fs.writeFileSync("logs/axios-error.txt", error.message);
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