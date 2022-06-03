
def test_contract_deploy(contract):
    """
    Test if the contract is correctly deployed.
    """
    assert contract.get() == 5


def test_contract_mint(accounts, contract):
    """
    Test if user can mint.
    """
    contract.mint(1, {'from': accounts[0]})
    assert contract.get() == 1
