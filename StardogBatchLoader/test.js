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

var filePaths;
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
    
        it('Read all turtle files into array of strings', async () => {
            
            // Read all turtle files into strings in parallel
            readFilePromises = [];
            filePaths = [];

            for(let filePath of config.filePaths){
                var files = await fs.readdir(filePath);

                for(let file of files){
                    var fileType = path.extname(file);

                    if(fileType == '.ttl'){
                        var f = path.join(filePath,file);
                        filePaths.push(f);
                        readFilePromises.push(fs.readFile(f, 'utf8'));
                    }
                    
                }
            }

            this.ttlStrings = await Promise.all(readFilePromises);
            this.filePaths = filePaths;

            console.log(`\t- created array with ${filePaths.length} Turtle strings`);

            expect(this.ttlStrings).to.be.an('array').to.not.be.empty;

        });

        it(`Load triples in store via HTTP`, async () => {
            var i = 0;
            for(let triples of this.ttlStrings){
                var res = await db.graph.doPost(conn, dbName, triples, undefined, 'text/turtle');
                this.ttlStrings.shift();

                expect(res).to.have.property('status').that.is.equals(200);

                const q = 'SELECT (count(?s) AS ?count) WHERE {?s ?p ?o}';
                res = await query.execute(conn, dbName, q);
                const cnt =res.body.results.bindings[0].count.value;
                console.log(`\t${i+1}:\t${cnt}\ttriples in store [${this.filePaths[i]}]`);
                i+=1;
            }
        });

        // it(`Load triples in store via CMD`, async () => {
        //     var i = 0;
        //     for(let file of this.filePaths){

        //         // The command to run
        //         const cmd = `stardog data add ${dbName} ${file}`;
    
        //         // Execute command 
        //         try{
        //             let { stdout, stderr } = await sh(cmd);
        //             res = stdout;
        //         }
        //         catch(err){
        //             expect(err).to.be(null);
        //         }

        //         this.filePaths.shift();

        //         const q = 'SELECT (count(?s) AS ?count) WHERE {?s ?p ?o}';
        //         res = await query.execute(conn, dbName, q);
        //         const cnt =res.body.results.bindings[0].count.value;
        //         console.log(`\t${i+1}:\t${cnt}\ttriples in store [${this.filePaths[i]}]`);
        //         i+=1;
        //     }
        // });

        // it(`Load 01_LinkOsh again`, async () => {
        //     const f = '../01_LinkOsh.ttl';
        //     const triples = await fs.readFile(f, 'utf8');
        //     var res = await db.graph.doPost(conn, dbName, triples, undefined, 'text/turtle');

        //     expect(res).to.have.property('status').that.is.equals(200);

        //     const q = 'SELECT (count(?s) AS ?count) WHERE {?s ?p ?o}';
        //     res = await query.execute(conn, dbName, q);
        //     const cnt =res.body.results.bindings[0].count.value;

        //     console.log(`\tstore now has ${cnt} triples`);
        // });

        // it(`Load 02_GeoFromRevit again`, async () => {
        //     const f = '../02_GeoFromRevit.ttl';
        //     const triples = await fs.readFile(f, 'utf8');
        //     var res = await db.graph.doPost(conn, dbName, triples, undefined, 'text/turtle');

        //     expect(res).to.have.property('status').that.is.equals(200);

        //     const q = 'SELECT (count(?s) AS ?count) WHERE {?s ?p ?o}';
        //     res = await query.execute(conn, dbName, q);
        //     const cnt =res.body.results.bindings[0].count.value;

        //     console.log(`\tstore now has ${cnt} triples`);
        // });



});