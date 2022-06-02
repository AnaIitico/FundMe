
from brownie import FundMePunks
from scripts.deploy import get_account

def fund():
    contract = FundMePunks
    account = get_account()
    total_supply = contract.totalSupply()
    print(total_supply)
    
def main():
    fund()