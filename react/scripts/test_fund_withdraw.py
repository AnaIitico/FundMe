
from brownie import FundMePunksNFT
from scripts.deploy import get_account

def fund():
    """
    Test if the contract is correctly deployed.
    """
    contract = FundMePunksNFT
    account = get_account()
    total_supply = contract.totalSupply()
    print(total_supply)
    
def main():
    fund()