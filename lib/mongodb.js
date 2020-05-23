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

// const client = MongoClient.connect(uri, {
//     useUnifiedTopology: true
// });

async function cardInsert(messageId, user, cardType) {
    var entry = {
        messageId: messageId,
        user: user,
        cardType: cardType
    };

    const client = await MongoClient.connect(uri, {
        useUnifiedTopology: true
    });

    try {
        const cards = client.db().collection(process.env.COL_CARDS);

        await cards.insertOne(entry);
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
        const client = await MongoClient.connect(uri, {
            useUnifiedTopology: true
        });

        try {            
            const cards = client.db().collection(process.env.COL_CARDS);

            let res = cards.find({
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

    sentCardDelete: async function (messageId) {
        console.log('MongoDB: Delete ' + messageId);

        const client = await MongoClient.connect(uri, {
            useUnifiedTopology: true
        });

        try {
            const cards = client.db().collection(process.env.COL_CARDS);

            cards.deleteOne({
                messageId: messageId
            }, function (error, result) {
                if (error) throw error;
            });
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }
};