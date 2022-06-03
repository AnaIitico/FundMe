
from brownie import FundMePunks, accounts, config


def read_contract():
    """
    Test if the contract variables can be viewed.
    """
    contract = FundMePunks
    print(contract.address)


def main():
    read_contract()