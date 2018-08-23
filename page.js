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
  var codeBox = document.getElementById("code")
  var deployButton = document.getElementById("deploy")
  var resultP = document.getElementById("result")
  var proposeButton = document.getElementById("propose")

  startButton.addEventListener("click", () => {
    //TODO implement this
    console.info("This feature is not yet implemented. Please issue the command manually.")
  })

  deployButton.addEventListener("click", () => {
    var deployData = {term: codeBox.value,
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
