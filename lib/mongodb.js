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

async function cardInsert(messageId, user, cardType) {
    var entry = {
        messageId: messageId,
        user: user,
        cardType: cardType
    };

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(err => {
        console.log(err);
    });

    try {
        let cards = client.db(process.env.DB).collection(process.env.COL_CARDS);

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

        if (!client.isConnected())
            clientConnect();

        cardInsert(messageId, user, cardType);
    },

    sentCardFind: async function (user, cardType) {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch(err => {
            console.log(err);
        });

        try {
            let cards = client.db(process.env.DB).collection(process.env.COL_CARDS);

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

        const cards = client.db(process.env.DB).collection(process.env.COL_CARDS);

        cards.deleteOne({
            messageId: messageId
        }, function (error, result) {
            if (error) throw error;
        });
    },

    scheduleDelete: function (room, user) {
        console.log('MongoDB: Delete ' + room + ' ' + user);

        if (!client.isConnected())
            clientConnect();

        const schedules = client.db(process.env.DB).collection(process.env.schedule);

        schedules.deleteOne({
            user: user,
            room: room
        }, function (error, result) {
            if (error) throw error;

            //      console.log(result);
        });
    },

    scheduleUpdate: function (room, hour, user, schedule) {

        console.log('MongoDB ' + room + ' ' + hour + ' ' + user);

        if (!client.isConnected())
            clientConnect();

        const schedules = client.db(process.env.DB).collection(process.env.schedule);

        schedules.find({
            user: user,
            room: room
        }).sort({
            room: 1
        }).toArray(function (err, docs) {

            if (err) throw err;

            if (docs.length == 0) {
                scheduleInsert(room, hour, user, schedule)
            } else {
                schedules.updateOne({
                        room: room,
                        user: user
                    }, {
                        $set: {
                            hour: hour
                        }
                    },
                    function (err, result) {
                        if (err) throw err;
                    });
            }
        });
    },

    ticketUpdate: async function (engineer, incidents, requests) {
        incidents = parseInt(incidents, 10);
        requests = parseInt(requests, 10);

        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch(err => {
            console.log(err);
        });

        var today = DateTime.local().setZone('America/Chicago');
        var date = today.year + '-' + today.month + '-' + today.day;

        var weekNumber = today.weekNumber;

        try {
            let tickets = client.db(process.env.DB).collection(process.env.ticket);

            let res = await tickets.find({
                date: date,
                engineer: engineer
            });

            let docs = await res.sort({
                date: 1
            }).toArray();

            if (docs.length == 0) {
                await ticketInsert(date, weekNumber, engineer, incidents, requests);
            } else {
                incidents = incidents + parseInt(docs[0].incidents, 10);
                requests = requests + parseInt(docs[0].requests, 10);

                await tickets.updateOne({
                    date: date,
                    engineer: engineer
                }, {
                    $set: {
                        incidents: incidents,
                        requests: requests
                    }
                });

            }
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    },

    getEngineerToday: async function (engineer) {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch(err => {
            console.log(err);
        });

        var today = DateTime.local().setZone('America/Chicago');
        var date = today.year + '-' + today.month + '-' + today.day;

        try {
            let tickets = client.db(process.env.DB).collection(process.env.ticket);

            let res = await tickets.find({
                date: date,
                engineer: engineer
            });

            return await res.sort({
                date: 1
            }).toArray();
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    },

    getWeekCount: async function (week = DateTime.local().setZone('America/Chicago').weekNumber) {
        const client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).catch(err => {
            console.log(err);
        });

        try {
            let tickets = client.db(process.env.DB).collection(process.env.ticket);

            let res = await tickets.find({
                week: parseInt(week, 10)
            });

            return await res.toArray();
        } catch (err) {
            console.log(err);
        } finally {
            client.close();
        }
    }
};