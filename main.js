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

  const deploy = code => myNode
    .doDeploy({ term: code, timestamp: clock().valueOf() })
    .then(_ => myNode.createBlock());

  app.post('/users/:name', registerHandler(deploy));
  app.get('/users/:name/status', checkHandler(deploy, myNode, random));
  app.post('/users/:name/status', setHandler(deploy));

  app.listen(uiPort, () => {
    console.log('RChain status dapp started.');
    console.log(`Connected to RNode at ${host}:${port}.`);
    console.log(`Userinterface on port ${uiPort}`);
  });
}


/**
 * Turn a string into a Rholang string literal, quoting as necessary.
 */
function strLit(txt) {
  return JSON.stringify(txt);
}


function bail(res, oops) {
  console.log(oops);
  res.status(500).send({ message: oops.message });
}


function registerHandler(deploy) {
  return (req, res) => {
    const nameExpr = strLit(req.params.name);

    // TODO: use a non-trivial return channel and wait for results there.
    deploy(`@"register"!(${nameExpr}, Nil)`)
      .then((result) => {
        res.send(result);
      }).catch(oops => bail(res, oops));
  };
}


function checkHandler(deploy, myNode, random) {
  return (req, res) => {
    const nameExpr = strLit(req.params.name);

    // Generate a public ack channel
    // TODO this should be unforgeable. Can I make one from JS?
    const ack = random().toString(36).substring(7);

    // Check the status, sending it to the ack channel
    deploy(`@[${nameExpr}, "check"]!("${ack}")`)
      .then(_ => myNode.listenForDataAtName(ack)) // Get the data from the node
      .then((blockResults) => {
        if (blockResults.length === 0) {
          res.status(404).send('No data found');
          return;
        }
        const lastBlock = blockResults.slice(-1).pop();
        const lastDatum = lastBlock.postBlockData.slice(-1).pop();
        res.send(RHOCore.toRholang(lastDatum));
      }).catch(oops => bail(res, oops));
  };
}


function setHandler(deploy) {
  return (req, res) => {
    const info = {
      name: strLit(req.params.name),
      status: strLit(req.query.status),
    };

    console.log('set:', info);

    deploy(`@[${info.name}, "newStatus"]!(${info.status}, "ack")`)
      .then(() => {
        res.send('Status updated successfully');
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
