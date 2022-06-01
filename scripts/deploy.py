
from brownie import accounts, network, config#, FundMe

LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]


def deploy_contract():
    # account = get_account()
    # print(account)
    print('hello')
    # print(config['TOKEN']['MAX_SUPPLY'])
    # contract = FundMe.deploy(
    #     config['TOKEN']['NAME'],
    #     config['TOKEN']['SYMBOL'],
    #     config['TOKEN']['MINT_COST'],
    #     config['TOKEN']['MAX_SUPPLY'],
    #     config['TOKEN']['IPFS_IMAGE_METADATA_CID'],
    #     config['TOKEN']['IPFS_HIDDEN_IMAGE_METADATA_CID'],
    #     {"from": account}, publish_source=config["networks"][network.show_active()].get("verify")
    # )

    # if network.show_active() == 'rinkeby':
    #     print(f'Contract deployed to:\n https://rinkeby.etherscan.io/address/{contract.address}')

    # return contract


# def get_account():
#     if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
#         return accounts[0]
#     else:
#         return accounts.add(config['wallets']['from_key'])


def main():
    # deploy_contract()
    print('hello')
    print(config['token']['name'])