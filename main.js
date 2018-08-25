"use strict"


// Include the RChain-API (may have to npm install --save github:JoshOrndorff/RChain-API)
const {RNode, RHOCore, logged} = require("rchain-api")
const express = require('express')
const grpc = require('grpc')
//const protoLoader = require('@grpc/proto-loader')

//TODO this should be configurable at launch if not in the ui.
var myNode = RNode(grpc, {host: "localhost", port: 40401})
var app = express()

app.use(express.static(__dirname))

// Don't need a route for / because is static

app.listen(54321, () => {
  console.log("started")
})


/////////////////////////////////////////////////


app.post('/register', (req, res) => {
  // TODO: What am I supposed to do with the ack channel when calling from off-chain?
  var code = `@"register"!("${req.query.name}", 0)`
  var deployData = {term: code,
                    timestamp: new Date().valueOf()
                    // from: '0x1',
                    // nonce: 0,
                   }

  myNode.doDeploy(deployData).then(result => {
    return myNode.createBlock()
  }).then(result => {
    res.send(result.message)
  }).catch(oops => { console.log(oops); })
})



app.post('/check', (req, res) => {
  // Generate a public ack channel
  // TODO this should be unforgeable. Can I make one from JS?
  var ack = Math.random().toString(36).substring(7)

  // This shouldn't actually require a transaction, for publicly visible data, right?
  // Check the status, sending it to the ack channel
  var code = `@["${req.query.name}", "check"]!("${ack}")`
  var deployData = {term: code,
                    timestamp: new Date().valueOf()
                    // from: '0x1',
                    // nonce: 0,
                   }
  myNode.doDeploy(deployData).then(_ => {
    return myNode.createBlock()
  }).then(_ => {
    // Get the data from the node
    return myNode.listenForDataAtName(ack)
  }).then((blockResults) => {
    if(blockResults.length === 0){
      res.code = 404
      res.send("No data found")
      //TODO Do I need to return here?
    }
    var lastBlock = blockResults.slice(-1).pop()
    var lastDatum = lastBlock.postBlockData.slice(-1).pop()
    res.send(RHOCore.toRholang(lastDatum))
  }).catch(oops => { console.log(oops); })
})



app.post("/set", (req, res) => {
  var code = `@["${req.query.name}", "newStatus"]!("${req.query.status}", "ack")`
  var deployData = {term: code,
                    timestamp: new Date().valueOf()
                    // from: '0x1',
                    // nonce: 0,
                   }

  myNode.doDeploy(deployData).then(result => {
    return myNode.createBlock()
  }).then(result => {
    res.send("Status updated successfully")
  }).catch(oops => { console.log(oops); })
})
