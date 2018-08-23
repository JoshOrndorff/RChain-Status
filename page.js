"use strict"

// Include the RChain-API (I symlinked it in my node_modules folder)
const {RNode, logged} = require("RChain-API")

// Need electron-specific version of grpc
// https://stackoverflow.com/a/45016752
// https://grpc.io/grpc/node/
const grpc = require('grpc')
//const protoLoader = require('@grpc/proto-loader')

const myNode = RNode(grpc, {host: "localhost", port: 40401})

window.addEventListener("DOMContentLoaded", () => {

  var startButton = document.getElementById("start-node")

  var nameBox = document.getElementById("name")
  var registerButton = document.getElementById("register")

  var resultP = document.getElementById("result")
  var proposeButton = document.getElementById("propose")

  startButton.addEventListener("click", () => {
    //TODO implement this
    // Maybe also something to deploy the proper contract.
    console.info("This feature is not yet implemented. Please issue the command manually.")
  })

  registerButton.addEventListener("click", () => {
    var name = nameBox.value
    var code = `@"register"!("${name}")`
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

  proposeButton.addEventListener("click", () => {
    myNode.createBlock()
      .then(maybeBlock => myNode.addBlock(logged(maybeBlock, '@@createBlock(): ').block));
  })

  // Messing around with RNode stuff.
  //console.log(api.RSON.fromData({"name": "Joshy", "occupation": "dev"}))

})
