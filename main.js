const { RNode, RHOCore } = require('rchain-api');
const docopt = require('docopt').docopt;
const { rho } = require('./rhoTemplate')

const usage = `

const host = argv[2] ? argv[2] : 'localhost';
const port = argv[3] ? parseInt(argv[3], 10) : 40401;
const uiPort = argv[4] ? parseInt(process.argv[4], 10) : 8080;


Start a fresh node, deploy the contract, note the uri and then start this middleware.

Usage:
  main.js [options]

Options:
 --host INT             The hostname or IPv4 address of the node
                        [default: localhost]
 --port INT             The tcp port of the nodes gRPC service
                        [default: 40401]
 --ui-port INT          The tcp port for the dApp UI to connect on
                        [default: 8080]
 -c --register URI      The dApp's register contract's URI in the registry
 -h --help              show usage

`;

function main(argv, { grpc, express, clock, random }) {
  const cli = docopt(usage, { argv: argv.slice(2) });
  console.log('DEBUG: cli:', cli);

  const myNode = RNode(grpc, { host: cli["--host"], port: cli["--port"] });
  const app = express();

  // Serve static assets like index.html and page.js from root directory
  app.use(express.static(__dirname));

  app.post('/users/:name', registerHandler(myNode, clock, cli["--register"]));
  app.post('/users/:name/status', setHandler(myNode, clock));
  app.get('/users/:name/status', checkHandler(myNode, clock, random));

  app.listen(cli["--ui-port"], () => {
    console.log('RChain status dapp started.');
    console.log(`Using ${cli["--host"]}:${cli["--port"]} to contact RNode.`);
    console.log(`User interface on port ${cli["--ui-port"]}`);
  });
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


function registerHandler(myNode, clock, uri) {
  return (req, res) => {

    const rholangCode = rho`
    new lookup(\`rho:registry:lookup\`), registerCh in {
      lookup!(\`URI\`, *registerCh)|

      for (registerForStatus <- registerCh){
        registerForStatus!(${req.params.name}, ${req.query.sig}, ${req.query.pubKey}, "bogusReturn")
      }
    }
    `.replace("URI", uri) //TODO Do this better

    const deployData = {
      term: rholangCode,
      timestamp: clock().valueOf(),
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

    const rholangCode = rho`@[${req.params.name}, "newStatus"]!(${req.query.status}, ${req.query.signature}, "notUsingAck")`

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

    // Generate a public ack channel
    // TODO this should be unforgeable.
    const ack = random().toString(36).substring(7);
    const rholangCode = rho`@[${req.params.name}, "check"]!(${ack})`;

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
