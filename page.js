"use strict"

// Include the RChain-API (I symlinked it in my node_modules folder)
const {RNode, RHOCore, logged} = require("rchain-api")

// Need electron-specific version of grpc
// https://stackoverflow.com/a/45016752
// https://grpc.io/grpc/node/
const grpc = require('grpc')
//const protoLoader = require('@grpc/proto-loader')

const myNode = RNode(grpc, {host: "localhost", port: 40401})

window.addEventListener("DOMContentLoaded", () => {

  var nameBox = document.getElementById("name")
  var registerButton = document.getElementById("register")
  var newStatusBox = document.getElementById("new-status")
  var setStatusButton = document.getElementById("set-status")

  var friendBox = document.getElementById("friend-name")
  var checkButton = document.getElementById("check-status")
  var friendStatusP = document.getElementById("friend-status")


  var proposeButton = document.getElementById("propose").addEventListener("click", myNode.createBlock)



  registerButton.addEventListener("click", () => {
    var userName = nameBox.value
    // TODO: What am I supposed to do with the ack channel when calling from off-chain?
    var code = `@"register"!("${userName}", 0)`
    console.log(code)
    var deployData = {term: code,
                      timestamp: new Date().valueOf()
                      // from: '0x1',
                      // nonce: 0,
                     }

    myNode.doDeploy(deployData).then(result => {
      if (!result.success) { throw(result) }
    }).catch(oops => { console.log(oops); })
  })



  checkButton.addEventListener("click", () => {
    var userName = friendBox.value
    // Generate a public ack channel
    // TODO this should be unforgeable. Can I make one from JS?
    var ack = Math.random().toString(36).substring(7)
    console.log("ack is " + ack)

    // This shouldn't actually require a transaction, for publicly visible data, right?
    // Check the status, sending it to the ack channel
    var code = `@["${userName}", "check"]!("${ack}")`
    console.log(code)
    var response = myNode.doDeploy({
      term: code,
      timestamp: new Date().valueOf()
    }).then(result => {
      if (!result.success) { throw(result) }
      return myNode.createBlock()
    }).then(_ => {
      // Get the data from the node
      myNode.listenForDataAtName(ack)
      .then((blockResults) => {
        console.log("blocks received: " + blockResults.length)
        // TODO: If we got no blocks back, fail gracefully.
        var lastBlock = blockResults.slice(-1).pop()
        var lastDatum = lastBlock.postBlockData.slice(-1).pop()
        friendStatusP.innerHTML = RHOCore.toRholang(lastDatum)
      })
    }).catch(oops => { console.log(oops); })
  })



  setStatusButton.addEventListener("click", () => {
    var newStatus = newStatusBox.value
    var userName = nameBox.value

    //TODO think about this ack channel a little more.
    // Maybe the new status should come back on it for easy updating of current status display?
    // I guess it isn't too much harder to just call check
    var code = `@["${userName}", "newStatus"]!("${newStatus}", "ack")`
    console.log(code)
    var deployData = {term: code,
                      timestamp: new Date().valueOf()
                      // from: '0x1',
                      // nonce: 0,
                     }

    myNode.doDeploy(deployData).then(result => {
      if (!result.success) { throw(result) }
      //TODO Maybe we should force a propose here? But I think the node will learn to do that on it's own soon, right?
    }).catch(oops => { console.log(oops); })
  })


/*
  proposeButton.addEventListener("click", () => {
    myNode.createBlock()
      .then(maybeBlock => myNode.addBlock(maybeBlock.block));
  })
*/
  // Messing around with RNode stuff.
  //console.log(api.RSON.fromData({"name": "Joshy", "occupation": "dev"}))

})
