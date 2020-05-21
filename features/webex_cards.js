const samplecards = require('../lib/cards');
import * as ACData from "adaptivecards-templating";

module.exports = function (controller) {

    controller.hears(async (message) => message.text && samples.includes(message.text.toLowerCase()), ['message', 'direct_message'], async (bot, message) => {

        console.log(message.text.toLowerCase());
        console.log(samplecards[message.text.toLowerCase()]);

        var template = new ACData.Template(samplecards[message.text.toLowerCase]);

        var cardPayload = template.expand({
            $root: {
                test: "Bob Dole"
            }
        });

        console.log(cardPayload);

        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: cardPayload
        });
    });

    controller.on('attachmentActions', async (bot, message) => {
        // if (message.value.card == 'tickets') {
        //     let engineer = await bot.api.people.get(message.user);
        //     await ticketLib.storeCounts(message.value.incidents, message.value.requests, engineer, bot, message);
        // }

        let markdown = "Thanks.  Received:  \n```\n" + JSON.stringify(message.value) + "\n```\n"
        await bot.reply(message, {
            markdown: markdown
        });
    });

    const samples = [
        "testcard"
    ]

    const helpmarkdown = `
## Samples 
Use the following commands to see the samples from [adaptivecards.io](https://adaptivecards.io/samples/):  
* ${samples.join("  \n* ")}
`

}