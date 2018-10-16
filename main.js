const { RNode, RHOCore } = require('rchain-api');


function main(argv, { grpc, express, clock, random }) {
  // Setup server parameters
  const host = argv[2] ? argv[2] : 'localhost';
  const port = argv[3] ? parseInt(argv[3], 10) : 40401;
  const uiPort = argv[4] ? parseInt(process.argv[4], 10) : 8080;

  const myNode = RNode(grpc, { host, port });
  const app = express();

  // Serve static assets like index.html and page.js from root directory
  app.use(express.static(__dirname));

  app.post('/users/:name', registerHandler(myNode, clock));
  app.post('/users/:name/status', setHandler(myNode, clock));
  app.get('/users/:name/status', checkHandler(myNode, clock, random));

  app.listen(uiPort, () => {
    console.log('RChain status dapp started.');
    console.log(`Using ${host}:${port} to contact RNode.`);
    console.log(`User interface on port ${uiPort}`);
  });
}


/**
 * Turn a string into a Rholang string literal, quoting as necessary.
 */
function strLit(txt) {
  return JSON.stringify(txt);
}

/**
 * Helper for when communication with the node goes wrong. Logs the problem
 * the console and sends an HTTP 500 back to the requesting browser with the
 * appropriate message
 * @param response ...
 * @param oops The failure ...
 *
 */
function bail(response, oops) {
  console.log(oops);
  res.status(500).send({ message: oops.message });
}


function registerHandler(myNode, clock) {
  return (req, res) => {
    const deployData = {
      term: req.query.code,
      timestamp: clock.valueOf(),
      phloPrice: { value: 1}, //TODO These are placeholder values.
      phloLimit: { value: 1000000},
      from: '0x01',
    }

    // TODO: use a non-trivial return channel and wait for results there.
    myNode.doDeploy(deployData, true)
      .then((result) => {
        res.send(result);
      }).catch(oops => bail(res, oops));
  };
}


function setHandler(myNode, clock) {
  return (req, res) => {
    const info = {
      name: strLit(req.params.name),
      status: strLit(req.query.status),
      signature: strLit(req.query.signature)
    };

    console.log('set:', info);

    const rholangCode = `@[${info.name}, "newStatus"]!(${info.status}, ${info.signature}, "notUsingAck")`

    const deployData = {
      term: rholangCode,
      timestamp: clock.valueOf(),
      phloPrice: { value: 1}, //TODO These are placeholder values.
      phloLimit: { value: 1000000},
      from: '0x01',
    }

    myNode.doDeploy(deployData, true)
      .then(() => {
        res.send('Status updated successfully');
      }).catch(oops => bail(res, oops));
  };
}


function checkHandler(myNode, clock, random) {
  return (req, res) => {
    const nameExpr = strLit(req.params.name);

    // Generate a public ack channel
    // TODO this should be unforgeable.
    const ack = random().toString(36).substring(7);
    const rholangCode = `@[${nameExpr}, "check"]!("${ack}")`;

    const deployData = {
      term: rholangCode,
      timestamp: clock.valueOf(),
      phloPrice: { value: 1}, //TODO These are placeholder values.
      phloLimit: { value: 1000000},
      from: '0x01',
    }
    // Check the status, sending it to the ack channel
    myNode.doDeploy(deployData, true)
      .then(_ => myNode.listenForDataAtPublicName(ack))
      .then((blockResults) => {
        if (blockResults.length === 0) {
          res.status(404).send({ message: 'No data found' });
          return;
        }
        const lastBlock = blockResults.slice(-1).pop();
        const lastDatum = lastBlock.postBlockData.slice(-1).pop();
        res.status(200).send({ status: RHOCore.toRholang(lastDatum) });
      }).catch(oops => bail(res, oops));
  };
}



if (require.main === module) {
  /* eslint-disable global-require */

  // Import primitive effects only when invoked as main module.
  main(process.argv, {
    // If express followed ocap discipine, we would pass it
    // access to files and the network and such.
    express: require('express'),
    grpc: require('grpc'),
    clock: () => new Date(),
    random: Math.random,
  });
}
