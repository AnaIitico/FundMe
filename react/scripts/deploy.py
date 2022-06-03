
from brownie import accounts, convert, network, config, FundMePunks

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]


def deploy_contract():
    """
    Deploys the contract according to the current network and veryfies the code ccordingly.
    """
    print('Deploying Contract...')
    account = get_account()
    print(account)
    # print(config['TOKEN']['MAX_SUPPLY'])
    contract = FundMePunks.deploy(
        config['token']['name'],
        config['token']['symbol'],
        0.025, # The minimum donation value for the NFT
        config['token']['max_supply'],
        config['token']['ipfs_image_metadata_cid'],
        config['token']['ipfs_hidden_image_metadata_cid'],
        {"from": account}, publish_source=config["networks"][network.show_active()].get("verify")#will only verify outside of Ganache based on brownie-config.yaml settings
    )

    if network.show_active() == 'rinkeby':
        print(f'\nContract deployed to:\n https://rinkeby.etherscan.io/address/{contract.address}')
    else:
        print(f"\nGanache Deployed {config['token']['name']} to address: {contract.address}")

    return contract


def get_account():
    """
    Get the account for the owner and deployer.
    """
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    else:
        return accounts.add(config['wallets']['from_key'])


def main():
    deploy_contract()
    # print('hello')
    # print(config['token']['name'])