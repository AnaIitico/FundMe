
from brownie import FundMePunks, accounts, config


def read_contract():
    contract = FundMePunks
    print(contract.address)


def main():
    read_contract()