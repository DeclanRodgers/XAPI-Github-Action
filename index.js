const core = require('@actions/core');
const github = require('@actions/github')
const axios = require('axios');
var fs = require('file-system');

let apiEndpoint = fs.readFileSync("destination.txt").toString();
let xCommand = fs.readFileSync("command.txt").toString();

console.log(`Endpoint: ${apiEndpoint} \nCommand: ${xCommand}`);

const destinationFilter = core.getInput('destination-filter');
// if (!destinationFilter){
//     CallEndpoint();
// } else {
//     CallEndpointWithFilter(destinationFilter);
// }
CallEndpoint();

function CallEndpoint(){
    try{
        axios.get(apiEndpoint).then(response =>{
            fs.writeFileSync("logs/output.txt", response.data);
            console.log("Response written.");
            //console.log(response.data);
        }).catch(function(error){
            if(error.response){
                fs.writeFileSync("logs/axios-error.txt", error.message.toString());
                console.log("Axios error data written.");
            }
        });
    } catch (error) {
        fs.writeFileSync("logs/error.txt", error);
        console.log("Error data written.");
    }
}

function CallEndpointWithFilter(destinationFilter){
    let tokenData = '';
    let headerConfig = {
        headers: {
          Authorization: 'Bearer '+tokenData,
        }
    };
      
    let data = {
        'HTTP_CONTENT_LANGUAGE': self.language
    };
    
    try{
        axios.post(apiEndpoint, data, headerConfig).then(response =>{
            console.log(response.data);
        })
    } catch (error) {
        console.log(error);
    }
}