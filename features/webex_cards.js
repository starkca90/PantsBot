const samplecards = require('../lib/cards');
const ACData = require('adaptivecards-templating');
const MongDB = require('../lib/mongodb');

module.exports = function (controller) {

    controller.hears(async (message) => message.text && samples.includes(message.text.toLowerCase()), ['message', 'direct_message'], async (bot, message) => {

        console.log(message.text.toLowerCase());
        console.log(samplecards[message.text.toLowerCase()]);

        var template = new ACData.Template(samplecards[message.text.toLowerCase()]);

        var cardPayload = template.expand({
            $root: {
                "title": "Publish Adaptive Card Schema",
                "description": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
                "creator": {
                    "name": "Matt Hidinger",
                    "profileImage": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg"
                },
                "createdUtc": "2017-02-14T06:08:39Z",
                "viewUrl": "https://adaptivecards.io",
                "properties": [
                    {
                        "key": "Board",
                        "value": "Adaptive Cards"
                    },
                    {
                        "key": "List",
                        "value": "Backlog"
                    },
                    {
                        "key": "Assigned to",
                        "value": "Matt Hidinger"
                    },
                    {
                        "key": "Due date",
                        "value": "Not set"
                    }
                ]
            }
        });

        console.log(cardPayload);

        let reply = await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: cardPayload
        });

        await MongDB.sentCardInser(reply, message.personEmail, message.text.toLowerCase())
    });

    controller.on('attachmentActions', async (bot, message) => {
        if (message.value.card == 'testcard') {
            console.log('A Wild Testcard Action Has Appeared');

            let messageId = await MongDB.sentCardFind(message.personEmail, message.value.card);

            if (messageId.length != 0) {
                await bot.deleteMessage(messageId[0].messageId);
                MongDB.sentCardDelete(messageId[0].messageId);
            }
        }
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