'use strict'

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');
const structjson = require('./structJson.js');
const config = require('../config/keys');


const projectID = config.googleProjectID;
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey,
};


const sessionClient = new dialogflow.SessionsClient({projectID, credentials});
const sessionPath = sessionClient.projectAgentSessionPath(config.googleProjectID, config.dialogFlowSessionID);
let mongoose = require('mongoose');
const Registration = mongoose.model('registration');

module.exports = {
    textQuery: async function(text, parameters = {}){
        let self=module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    // The query to send to the dialogflow agent
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;

    },



    eventQuery: async function(event, parameters = {}){
        let self=module.exports;
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    // The query to send to the dialogflow agent
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode,
                },
            },

        };
        let responses = await sessionClient.detectIntent(request);
        responses = await self.handleAction(responses);
        return responses;

    },



    handleAction: function(responses){
        let self = module.exports;
        let queryResult = responses[0].queryResult;

        switch (queryResult.action) {
            case 'recommendcourses-yes':
                    if(queryResult.allRequiredParamsPresent) {
                        self.saveRegistration(queryResult.parameters.fields);
                    }
                break;
        }
        return responses;
    },
    saveRegistration: async function(fields){
        const registration = new Registration({
            name: fields.name.stringValue,
            address: fields.address.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            dateSent: Date.now()
        });
        try{
          let reg = await registration.save();
            console.log(reg);
        } catch (err){
            console.log(err);
        }
    }
}