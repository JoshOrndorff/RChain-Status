# Write Your Frist Dapp
This repository is a tutorial on writing your first decentralized application on RChain. It assumes moderate familiarity with the command line, RNode software, and node.js. I will walk you through building a simple microblogging dapp in a way that you can primarily copy and paste. I encourage you to experiment as we move along. RChain is still in a pre-release state and not all of the features we would have used in this dapp are available yet. When we do have to work around an issue with the current RNode, I do my best to point it out.

Written By: Joshy Orndorff
Special Thanks: Dan Connolly

## Just make this thing run!
It's ~~nice~~ necessary to know what you're building before you start building it. So you may want to launch the project before we even begin.

1. Install RNode ([instructions](todo))
2. Install node and npm ([instructions](todo))
3. Clone the repo `git clone https://github.com/JoshOrndorff/Rchain-Status.git`
4. Change into the project directory `cd Rchain-Status`
5. Install dependencies `npm install`
6. Start a fresh, pre-configured RNode `npm run fresh`
7. Deploy the necessary smart contract to your node `npm run deploy-contract`
8. Launch the dapp frontend `npm start`
9. Navigate to the user interface in your favorite browser at `localhost:54321`

## Overview of writing a dapp
Before we begin, I'll show you the plan. These are the big-picture steps that you'll need to follow in order to write any dap

1. Design the smart contract -- ours is in `status.rho`
2. Design an interface -- We're using electronJS (soon to be express)
3. Connect the interface to the contract -- We'll use the RChain-API node module
4. Deploy your contract
5. Use your dapp
6. Celebrate :)

## Overview of the Contract
Our primitive social media Dapp allows users to post a single status message representing their current thoughts, activity, etc. Examples might include "Rainy Saturday...", "Long weekend coming up!", "Go Indians! World series this year!".

### Registering
I Before they can use the dapp, a user has to register. This rholang code does that.

Insert code (signature, setting default status, returning ack (which happens to also be the OCap))
Insert explanation
Insert gui instructions

In reality a user should use an unforgeable name anytime object capabilities are involved. This is the first hack we will employ because the rholang name registry is not yet complete.

### Checking Statuses
One primary feature of such a dapp is to check your friends' statuses. Here's the rholang.

Insert code
explanation

Right now the only person we know using the dapp is us, so let's check our own status. In the dapp, enter our name in the friend box, and click check. We see that our status is currently the default status that we got when we registered.

### Changing Status

### Quitting

## Writing the Frontend

## Connecting Frontend to Blockchain

### Other Frontend Options
* Node command line utility
* Python utility

## Deploying your own
If you've followed along until now, you have a complete working version of this same dapp in your project directory. It's time to deploy and test it.

You'll need to grab the `package.json` file to make these commands work

Insert deploy instructions again.

## Feedback
I sincerely hope that this guide was helpful and made your path to your first dapp a bit easier. I will continue to improve this guide as new node features are release. I'd also love your feedback

(link or something to submit feedback)
