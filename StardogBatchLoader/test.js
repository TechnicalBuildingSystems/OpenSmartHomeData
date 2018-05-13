const { Connection, query, db } = require('stardog');
const expect = require('chai').expect;
const fs = require('fs-extra');
var path = require('path');
const config = require('./config.json');
const sh = require('./helpers/async-cmd');  // To execute a shell command

/**
 * CONFIG DB CONNECTION
 */
var conn = new Connection({
    username: config.username,
    password: config.password,
    endpoint: config.endpoint,
});
var dbName = config.database;

var filePaths = ['../00_OpenSmartHomeData.ttl'];
var ttlStrings;

describe('Test Stardog connection', () => {

    //Wipe database if exists
    it('Wipe database', async () => {
        
        const res = await db.drop(conn, dbName);

        expect(res).to.have.property('status').that.is.equals(200);     // Should return status 200

    });

    //Create database
    it('Create database', async () => {
        
        const res = await db.create(conn, dbName);

        expect(res).to.have.property('status').that.is.equals(201);     // Should return status 201

    });

});

describe('Load data in triplestore', () => {

    it(`Load data in store`, async () => {

        for(let file of config.filePaths){
            // Load in store
            // file = '../00_OpenSmartHomeData.ttl'
            const triples = await fs.readFile(file, 'utf8');
            var res = await db.graph.doPost(conn, dbName, triples, undefined, 'text/turtle');
            expect(res).to.have.property('status').that.is.equals(200);
            
            // Perform check
            const q = 'SELECT (count(?s) AS ?count) WHERE {?s ?p ?o}';
            res = await query.execute(conn, dbName, q);
            const cnt =res.body.results.bindings[0].count.value;
            console.log(`\t${cnt}\ttriples in store [${file}]`);
        }

    });

});