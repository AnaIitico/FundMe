
from brownie import FundMePunksNFT, accounts, config
from scripts.deploy import deploy_contract

def read_contract():
    """
    Test if the contract variables can be viewed.
    """
    contract = deploy_contract()
    # contract = FundMePunksNFT
    print(contract.address)
    donation = contract.cost()
    max_supply = contract.maxSupply()
    owner = contract.owner()
    print('donation', donation)
    print(max_supply)
    print(owner)


def main():
    read_contract()