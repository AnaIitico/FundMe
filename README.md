# FundMe
This is a blockchain application that accepts ETHER FundMe donations from the public based on specific Campaign Objectives and 
issues a NFT as a gift for the donation to the donor


## To Install:
1) git clone the code.
2) go to the react/client directory and do a `yarn install`
3) cp the .env_sample to be a .env file and fill out your specific environment variables.

## To Run:
Way 1:
1) To go the react directory.
2) run `brownie run`
3) run  `brownie run scripts/deploy.py;`
4) cd into the client directory, and then run `npm start`

Way 2:  
Go into the react directory and type `./start_all` which does the above commands for you.

