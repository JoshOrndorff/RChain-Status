const TODO = undefined;
const RHOCore = TODO;

/*
  app.post('/users/:name', registerHandler(myNode, clock, cli['--register']));
  app.post('/users/:name/status', setHandler(myNode, clock));
  app.get('/users/:name/status', checkHandler(myNode, clock, random));
*/

/**
 * Helper for when communication with the node goes wrong. Logs the problem
 * the console and sends an HTTP 500 back to the requesting browser with the
 * appropriate message
 * @param response ...
 * @param oops The failure ...
 *
 */
function bail(res, oops) {
  console.log(oops);
  res.status(500).send({ message: oops.message });
}


export function registerHandler(myNode, clock, uri) {
  return (req, res) => {
    const rholangCode = rhol`
    new lookup(\`rho:registry:lookup\`), registerCh in {
      lookup!(\`URI\`, *registerCh)|

      for (registerForStatus <- registerCh){
        registerForStatus!(${req.params.name}, ${req.query.sig}, ${req.query.pubKey}, "bogusReturn")
      }
    }
    `.replace('URI', uri); //TODO Do this better

    const deployData = {
      term: rholangCode,
      timestamp: clock().valueOf(),
      phloPrice: { value: 1 }, //TODO These are placeholder values.
      phloLimit: { value: 1000000 },
      from: '0x01',
    };

    // TODO: use a non-trivial return channel and wait for results there.
    myNode.doDeploy(deployData, true)
      .then((result) => {
        res.send(result);
      }).catch(oops => bail(res, oops));
  };
}


export function setHandler(myNode, clock) {
  return (req, res) => {
    const rholangCode = rhol`@[${req.params.name}, "newStatus"]!(${req.query.status}, ${req.query.signature}, "notUsingAck")`;

    const deployData = {
      term: rholangCode,
      timestamp: clock.valueOf(),
      phloPrice: { value: 1 }, //TODO These are placeholder values.
      phloLimit: { value: 1000000 },
      from: '0x01',
    };

    myNode.doDeploy(deployData, true)
      .then(() => {
        res.send('Status updated successfully');
      }).catch(oops => bail(res, oops));
  };
}


export function checkHandler(myNode, clock, random) {
  return (req, res) => {
    // Generate a public ack channel
    // TODO this should be unforgeable.
    const ack = random().toString(36).substring(7);
    const rholangCode = rhol`@[${req.params.name}, "check"]!(${ack})`;

    const deployData = {
      term: rholangCode,
      timestamp: clock.valueOf(),
      phloPrice: { value: 1 }, //TODO These are placeholder values.
      phloLimit: { value: 1000000 },
      from: '0x01',
    };
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

function rhol(template, ...subs) {
  const literal = val => JSON.stringify(val);
  const encoded = subs.map(literal);

  const out = [];
  template.forEach((part, ix) => {
    out.push(part);
    out.push(encoded[ix]);
  });

  return out.join('');
}
