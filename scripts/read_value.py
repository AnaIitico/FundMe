
from brownie import FundMe, accounts, config


def read_contract():
    contract = FundMe[-1]
    print(contract.address)
    print(contract.retrieve())


def main():
    read_contract()