<!-- Find and Replace All [repo_name] -->
<!-- Replace [product-screenshot] [product-url] -->
<!-- Other Badgets https://naereen.github.io/badges/ -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn1][linkedin-shield1]][linkedin-url1]
[![LinkedIn2][linkedin-shield2]][linkedin-url2]
<!-- [![License][license-shield]][license-url] -->

# FundMe Punks NFT
## About

This blockchain Fund Me application that accepts ETHER donations from the public based on specific Campaign Objectives and in return we gift the donor with an exclusive FundMe Punks NFT.

The user can then view their NFT on [OpenSea](https://testnets.opensea.io/collection/fundme-punks-nft) and verify the transactions on [Etherscan](https://rinkeby.etherscan.io/address/0x837feE9f996c70bd6066b9f64BEe3d38952C9fE2). The user is also able to interact with the contract code via [Etherscan](https://rinkeby.etherscan.io/address/0x837feE9f996c70bd6066b9f64BEe3d38952C9fE2#code)

It's hosted on Netlify with a React FrontEnd page that the user can use to interact with the contact and donate to the campaign. You can see the deployed FronEnd [here](https://testnets.opensea.io/collection/fundme-punks-nft) and interact/donate to get an NFT. You will need some [Rinkeby](https://faucets.chain.link/rinkeb) Test Ether

---

## Technologies

This project leverages the following tools for financial analysis:

- [Conda](https://docs.conda.io/en/latest/) - source package management system and environment management system.

- [Node.js & NPM](https://trufflesuite.com/docs/) - For running the FrontEnd. Node.js is an asynchronous event-driven JavaScript runtime.

- [Yarn](https://trufflesuite.com/docs/) - For installing React dependencies. Yarn is used to install all dependencies for a project. 

- [Ethereum](https://ethereum.org/en/developers/) - Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications. 

- [Solidity](https://docs.soliditylang.org/en/v0.8.14/) - Solidity is an object-oriented, high-level language for implementing smart contracts.

- [Brownie](https://eth-brownie.readthedocs.io/en/stable/) - Python-based development and testing framework for smart contracts targeting the Ethereum Virtual Machine.

- [Brownie React Mix](https://github.com/brownie-mix/react-mix) - This mix comes with everything you need to start using [React](https://reactjs.org/) with a Brownie project.

- [Ganache Truffle](https://trufflesuite.com/docs/) - Quickly fire up a personal Ethereum blockchain which you can use to run tests, execute commands, and inspect state while controlling how the chain operates.

- [Pinata](https://docs.pinata.cloud/) - For storing the NFT image and metadata. Pinata secures and moves data with IPFS.

- [Netlify CLI](https://docs.netlify.com/cli/get-started/) - For deploying the React FrontEnd. Netlify’s command line interface (CLI). 

- [Metamask](https://docs.metamask.io/guide/) - MetaMask is an Ethereum evm crypto wallet and handles account management and connecting the user to the blockchain.

---

## Installation
WARNING! We recommend using Node.js 16.13.1 and the React versions used with the project.  You may experience conflict with dependencies if you try to use other versions.  We used Yarn to install the React Dependencies.

1. Clone the repo
   ```bash
   git clone https://github.com/AnaIitico/FundMe.git
   ```

2. You don't need to install pip - Conda comes with pip and you can also use the command
    conda install 'package name'
   
3. Install Conda according to the instructions based on your operating system.
    For windows users you MUST use the Administrator PowerShell. Users with AMD Processors MUST use the Administrator PowerShell 7 (X64) version
  
    Once installed Conda has an Admin PowerShell version shortcut - look on your Start menu for it.
    This shortcut will prove very useful at times when you need to install other apps or make adjustments to your installation

    Once installed and you have finished all Conda instructions, you will see (base) on your terminal.  Make sure that you finish the Conda full installation or this will not work!!
   
4. Activate Conda Dev environment
   ```bash
   conda activate dev
   ```
    You should now see (dev) on your terminal (if not go back to step 3)

5. Install Node.js 16.13.1 according to your Operating System. You may need to use an Administrator Terminal. Follow the instructions on the Docs for Node.js
   ```bash
   npm install -g node@16.13.1
   ```

5. Install Yarn according to your Operating System. You may need to use an Administrator Terminal. Follow the instructions on the Docs for Yarn
   ```bash
   npm install --global yarn
   ```
6. Install the React client dependencies.

    ```bash
    cd ./client
    yarn install
    ```

7. If you want to be able to deploy to testnets, do the following.

    Set your WEB3_INFURA_PROJECT_ID, and PRIVATE_KEY environment variables.

    You can get a WEB3_INFURA_PROJECT_ID by getting a free trial of Infura. https://infura.io/login. 
    
    You can find your PRIVATE_KEY from your ethereum wallet like metamask.

    You'll also need testnet ETH. You can get ETH into your wallet by using the faucet for the appropriate
    testnet.
    
    We used Rinkeby for this project. Rinkeby Faucet Located [Here](https://faucets.chain.link/rinkeb). You can find [Backup Faucets here](https://docs.chain.link/docs/link-token-contracts/#rinkeby) .

    You can add your environment variables to a .env file. You can use the .env_example in this repo 
    as a template, just fill in the values and rename it to '.env'.
   
8. Install and Start Ganache.

    You need to create a new workspace and name it BROWNIE TEST ONLY.

    Use with Network Id of 1337 and Port 8545.

    Launch Ganache and select the BROWNIE TEST ONLY workspace.

9. Install Meatamask and do the following:

    Create a new wallet and make sure that you label it BROWNIE TEST ONLY.

    Copy the private key and save it to the .env file.

    Create a Ganache Network in Metamask with Network Id of 1337 and Port 8545.

    Import at least 2 accounts from Ganache into Metamask by importing their private keys into Metamask.

---

## Usage

1. You don't need the brownie console. But you may start the console and it launches the Ganache CLI instance in the background.

2. Compile the project
    ```python
    brownie compile
    ```

3. Run the [deployment script](scripts/deploy.py) to deploy the project's smart contracts.

    All commands can be performed from the terminal.  We will be covering NOT using the console:

    To deploy the project in Ganache:
    From the react/ folder:
    ```python
    $ brownie run scripts/deploy.py
    
    Brownie v1.18.2 - Python development framework for Ethereum

    ReactProject is the active project.

    Running 'scripts\deploy.py::main'...
    Deploying Contract...      

    from: account 0x4b9f53B331E21145090D9Fa29d0262bb52C34AA5

    Transaction sent: 0x6b56fae6194a609883f6ec3dcc2113edb38b58e4da3a75be6acaf1b1198518a3
    Gas price: 0.0 gwei   Gas limit: 6721975   Nonce: 134
    FundMePunksNFT.constructor confirmed   Block: 143   Gas used: 2336261 (34.76%) 
    FundMePunksNFT deployed at: 0xF8c35D63F20aEc69B7B7Cf524167532C56Ab0079
    ```

4. While Brownie is still running, start the React app in a different terminal.

    The first time this app is used, the node modules have to be installed in /src.
    To do this, navigate to ./client/src and run

    ```bash
    # make sure to use a different terminal, not the brownie console
    Yarn install
    ```

    Start the FrontEnd after installing dependencies. Navigate to ./client and run
    
    ```bash
    # make sure to use a different terminal, not the brownie console
    npm start
    ```

5. Connect Metamask to the local Ganache network. In the upper right corner, click the network dropdown menu. Select `Localhost 8545`.  For TestNet deployment select `Rinkeby Test Network`:


6. Interact with the smart contracts using the web interface or via the Brownie console.

    Any changes to the contracts from the console should show on the website after a refresh, and vice versa.

---

## Ending a Session

When you close the Brownie console, the Ganache instance also terminates and the deployment artifacts are deleted.

To retain your deployment artifacts (and their functionality) you can launch Ganache yourself prior to launching Brownie. Brownie automatically attaches to the ganache instance where you can deploy the contracts. After closing Brownie, the chain and deployment artifacts will persist.


### Deploying to a Live Network

To deploy your contracts to the mainnet or one of the test nets, first modify [`scripts/deploy.py`](`scripts/deploy.py`) to [use a funded account](https://eth-brownie.readthedocs.io/en/stable/account-management.html).

Then:

To deploy and run on Rinkeby, set the network flag to rinkeby

```bash
brownie run scripts/deploy.py --network rinkeby
```

Replace `rinkeby` with the name of the network you wish you use. You may also wish to adjust Brownie's [network settings](https://eth-brownie.readthedocs.io/en/stable/network-management.html).

For contracts deployed on a live network, the deployment information is stored permanently unless you:

* Delete or rename the contract file or
* Manually remove the `client/src/artifacts/` directory

---

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements & Other Resources

Other Resources

This mix provides a bare-bones implementation of [Create React App](https://create-react-app.dev/), configured to work with Brownie.

To get started with React and building a front-end for your dApps:

* [Rimble](https://github.com/consensysmesh/rimble-ui#readme) is an open-source library of React components and guides to help you make dApps. Along with components they provide guides and tutorials to help you get started.
* For more in-depth information, read the [Create React App documentation](https://create-react-app.dev/docs/getting-started)


To get started with Brownie:

* Check out the other [Brownie mixes](https://github.com/brownie-mix/) that can be used as a starting point for your own contracts. They also provide example code to help you get started.
* ["Getting Started with Brownie"](https://medium.com/@iamdefinitelyahuman/getting-started-with-brownie-part-1-9b2181f4cb99) is a good tutorial to help you familiarize yourself with Brownie
* For more in-depth information, read the [Brownie documentation](https://eth-brownie.readthedocs.io/en/stable/)


Acknowledgements
* [Img Shields](https://shields.io)
* [Choose an Open Source License](https://choosealicense.com)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/AnaIitico/FundMe.svg?style=for-the-badge
[contributors-url]: https://github.com/AnaIitico/FundMe/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/AnaIitico/FundMe.svg?style=for-the-badge
[forks-url]: https://github.com/AnaIitico/FundMe/network/members
[stars-shield]: https://img.shields.io/github/stars/AnaIitico/FundMe.svg?style=for-the-badge
[stars-url]: https://github.com/AnaIitico/FundMe/stargazers
[issues-shield]: https://img.shields.io/github/issues/AnaIitico/FundMe/network/members?style=for-the-badge
[issues-url]: https://github.com/AnaIitico/FundMe/issues
<!-- [license-shield]: 
[license-url]:  -->
[linkedin-shield1]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-shield2]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url1]: https://www.linkedin.com/in/josetollinchi/
[linkedin-url2]: https://www.linkedin.com/in/nicklaus-danialy/
[app-screenshot]: /images/website.PNG
[beta-screenshot]: /images/beta_normalized_portfolio.PNG
[heatmap-screenshot]: /images/heatmap_correlation.PNG
[historical-screenshot]: /images/historical_portfolio.PNG
[montecarlo-screenshot]: /images/monte_carlo_output.PNG

---

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
