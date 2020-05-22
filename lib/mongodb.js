/*
 * Copyright (c) 2016 ObjectLabs Corporation
 * Distributed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Written with: mongodb@3.3.2
 * Documentation: http://mongodb.github.io/node-mongodb-native/
 * A Node script connecting to a MongoDB database given a MongoDB Connection URI.
 */

// server.js
// where your node app starts

// init project
const MongoClient = require('mongodb').MongoClient;

// Standard URI format: mongodb://[dbuser:dbpassword@]host:port/dbname, details set in .env
var uri = 'mongodb+srv://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST + '/' + process.env.DB + '?retryWrites=true&w=majority';

const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => {
    console.log(err);
});

const cards = client.db(process.env.DB).collection(process.env.COL_CARDS);

function clientConnect() {
    client.connect(err => {
        if (err) throw err;
    });
}

async function cardInsert(messageId, user, cardType) {
    var entry = {
        messageId: messageId,
        user: user,
        cardType: cardType
    };

    if (!client.isConnected())
        clientConnect();

    try {
        let res = await cards.insertOne(entry);

        console.log(res);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

module.exports = {
    sentCardInsert: function (messageId, user, cardType) {
        console.log('MongoDB: sentCardInsert ' + messageId + ' ' + user + ' ' + cardType);

        cardInsert(messageId, user, cardType);
    },

    sentCardFind: async function (user, cardType) {
        if (!client.isConnected())
            clientConnect();

        try {
            let res = await cards.find({
                user: user,
                cardType: cardType
            });

            return await res.sort({
                messageId: 1
            }).toArray();
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    },

    sentCardDelete: function (messageId) {
        console.log('MongoDB: Delete ' + messageId);

        if (!client.isConnected())
            clientConnect();

        cards.deleteOne({
            messageId: messageId
        }, function (error, result) {
            if (error) throw error;
        });
    }
};