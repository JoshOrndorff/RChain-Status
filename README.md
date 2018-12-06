# RChain Status dApp Example
This repository is an example and tutorial for writing decentralized applications on RChain. Using it requires moderate familiarity with the command line, RNode software, and node.js. I encourage you to experiment and make changesg. RChain is still in a pre-release state and not all of the features we would have used in this dapp are available yet.

Written By:\
Joshy Orndorff\
Dan Connolly

## Build

1. Install RNode ([instructions](https://rchain.atlassian.net/wiki/spaces/CORE/pages/428376065/User+guide+for+running+RNode))
2. Install node and npm ([instructions](https://www.npmjs.com/get-npm))
3. Clone the repo `git clone https://github.com/JoshOrndorff/Rchain-Status.git`
4. Change into the project directory `cd Rchain-Status`
5. Install dependencies `npm install`
6. Start a fresh, pre-configured RNode `freshr`
7. Deploy the smart contract `npm run deploy-contract` and observe its URI in the node log. (eg. rho:id:z8s9ussdc5hx3z4m8a9a98cah3r5d8ick6yj5bfs4wc8oyrhacbabc)
8. Launch the frontend server `node main.js start --register <uri>`
9. Navigate to the user interface in your favorite browser at `localhost:8080`

## Overview of writing a dapp
These big-picture steps apply to writing _any_ dApp including ours.

1. Design the smart contract -- ours is in `status.rho`
2. Design an interface -- (eg express.js, and [spectre css](https://picturepan2.github.io/spectre/))
3. Connect the interface to the contract -- We'll use the [rchain-api](https://github.com/rchain-community/rchain-api) node module
4. Deploy your contract
5. Use your dapp
6. Celebrate :)

## Overview of the Contract
Our primitive social media Dapp allows users to post a single status message representing their current thoughts, activity, etc. Examples might include "Rainy Saturday...", "Long weekend coming up!", "Go Indians! World series this year!".


## Feedback
I sincerely hope that this example dApp was helpful and made the path to your first dapp a bit easier. I will continue to improve this guide as new node features are release. I'd also love your feedback either in the issue queue, the pull requests, or on the [RChain discord](https://discord.gg/fvY8qhx).
