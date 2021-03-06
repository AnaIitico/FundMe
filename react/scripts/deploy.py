
from brownie import accounts, network, config, FundMePunksNFT

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]


def deploy_contract():
    """
    Deploys the contract according to the current network and veryfies the code ccordingly.
    Builds the ipfs public and hidden paths.
    """
    ipfs_image_metadata_cid = ""
    ipfs_hidden_image_cid = ""
    if network.show_active() == 'development':
        ipfs_image_metadata_cid = config['token']['ipfs_image_metadata_cid']
        ipfs_hidden_image_cid = config['token']['ipfs_hidden_image_cid']
    if network.show_active() == 'rinkeby':
        ipfs_image_metadata_cid = f"ipfs://{config['token']['ipfs_image_metadata_cid']}/"
        ipfs_hidden_image_cid = f"ipfs://{config['token']['ipfs_hidden_image_cid']}/hidden.json"
    print('Deploying Contract...\n')
    # print(network.show_active()) # @dev for testing only
    # print(ipfs_image_metadata_cid) # @dev for testing only
    # print(ipfs_hidden_image_cid) # @dev for testing only

    account = get_account()
    print('from: account', account, '\n')

    contract = FundMePunksNFT.deploy(
        config['token']['name'],
        config['token']['symbol'],
        float(config['token']['mint_cost'])*10**18, # @dev The minimum donation value for the NFT converted to wei value
        config['token']['max_supply'],
        ipfs_image_metadata_cid,
        ipfs_hidden_image_cid,
        {"from": account}, publish_source=config["networks"][network.show_active()].get("verify")# @dev will only verify outside of Ganache based on brownie-config.yaml settings
    )

    if network.show_active() == 'rinkeby':
        print(f'\nContract deployed to:\n https://rinkeby.etherscan.io/address/{contract.address}')
    else:
        print(f"\nGanache Deployed {config['token']['name']} to address: {contract.address}")

    return contract


def get_account():
    """
    Get the account according to the network environment.
    """
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    else:
        return accounts.add(config['wallets']['from_key'])


def main():
    deploy_contract()