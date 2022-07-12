
import React, { useState, useEffect } from 'react';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import Countdown from 'react-countdown';
import Web3 from 'web3';
import abi from "./artifacts/deployments/4/0x837feE9f996c70bd6066b9f64BEe3d38952C9fE2.json";

// Import Images + CSS
import twitter from './images/socials/twitter.svg';
import instagram from './images/socials/instagram.svg';
import opensea from './images/socials/opensea.svg';
import showcase from './images/showcase.png';
import './App.css';

// Import Components
import Navbar from './Navbar';

// Import ABI + Config
// import contract from './artifacts/contracts/FundMePunksNFT.json'// For Testing Only
import config from './config.json';

// For Testing Only
// if(contract) console.log(contract);

function App() {
	const [web3, setWeb3] = useState(null)
	const [contract, setContract] = useState(null)

	const [supplyAvailable, setSupplyAvailable] = useState(0)

	const [account, setAccount] = useState(null)
	const [donation, setDonation] = useState(null)
	const [donationStatus, setDonationStatus] = useState(true)
	
	const [networkId, setNetworkId] = useState(null)
	const [ownerOf, setOwnerOf] = useState([])

	const [explorerURL, setExplorerURL] = useState('https://etherscan.io')
	const [openseaURL, setOpenseaURL] = useState('https://opensea.io')

	const [isMinting, setIsMinting] = useState(false)
	const [isError, setIsError] = useState(false)
	const [message, setMessage] = useState(null)

	const [currentTime, setCurrentTime] = useState(new Date().getTime())
	const [revealTime, setRevealTime] = useState(0)

	const [counter, setCounter] = useState(7)
	const [isCycling, setIsCycling] = useState(false)

	const minDonation = 0.025;

	const loadBlockchainData = async (_web3, _account, _networkId) => {
		// Fetch Contract, Data, etc.
		try {
			let chain = (_networkId === 1337 || _networkId === 5777) ? "dev" : _networkId;
			let contract_address;
			let contractArtifact

			try {
				if(_networkId === 1337 || _networkId === 5777){
					// Comment out the below lines for production deployment
					// let map = await import(`./artifacts/deployments/map.json`)
					// contract_address = map[chain]["FundMePunksNFT"][0]
				}else{
					// For Ganache Uncomment the contract_address
					// For TestNet and Production Paste last deployed contract address
					contract_address = '0x837feE9f996c70bd6066b9f64BEe3d38952C9fE2'
				}
				
			} catch (e) {
				alert(`Couldn't find any deployed contract "FundMePunksNFT" on the chain "${chain}".`)
				console.log(`Couldn't find any deployed contract "FundMePunksNFT" on the chain "${chain}".`)
				setIsError(true)
				setMessage("Contract initiation could not find map.json");
				return;	
			}

			try {
				if(_networkId === 1337 || _networkId === 5777){
					// Comment out the below line for production deployment
					// contractArtifact = await import(`./artifacts/deployments/${chain}/${contract_address}.json`);
				}else{
					contractArtifact = abi;
				}
				
			} catch (e) {
				alert(`Failed to load contract artifact "./artifacts/deployments/${chain}/${contract_address}.json"`)
				console.log(`Failed to load contract artifact "./artifacts/deployments/${chain}/${contract_address}.json"`)
				setIsError(true)
				setMessage("Contract initiation could not find artifact");
				return;	
			}
			// For Testing Only
			// console.log(">> artifact:", contractArtifact);

			const contract = new _web3.eth.Contract(contractArtifact.abi, contract_address)

			// For Testing Only
			// console.log(">>> CONTRACT:::", contract);
			setContract(contract)

			const maxSupply = await contract.methods.maxSupply().call()

			// For Testing Only
			// console.log("MAx supply: ", maxSupply);

			const totalSupply = await contract.methods.totalSupply().call()
			setSupplyAvailable(maxSupply - totalSupply)

			if (_account) {
				const ownerOf = await contract.methods.walletOfOwner(_account).call()
				setOwnerOf(ownerOf)
				// For Testing Only
				// console.log(ownerOf)
			} else {
				setOwnerOf([])
			}

		} catch (error) {
			alert("loadBlockchainData error:", error);
			console.log("loadBlockchainData error:", error);
			setIsError(true)
			setMessage("Contract not deployed to current network, please change network in MetaMask")
		}
	}

	const loadWeb3 = async () => {
		if (typeof window.ethereum !== 'undefined') {
			let web3 = new Web3(window.ethereum)
			setWeb3(web3)

			const accounts = await web3.eth.getAccounts()
			// For Testing Only
			// console.log(accounts)

			if (accounts.length > 0) {
				setAccount(accounts[0])
			} else {
				setMessage('Please connect with MetaMask')
			}

			const networkId = await web3.eth.net.getId()
            // <=42 to exclude Kovan, <42 to include kovan
            if (networkId < 2) {
                alert("MainNet Is Not Supported!") 
                console.log("MainNet Is Not Supported!") 
                return
            } 
			setNetworkId(networkId)

			if (networkId !== 1337 || networkId !== 5777) {
                
				// For Testing Only
				// console.log('netid', config.NETWORKS[networkId])
				
				setExplorerURL(config.NETWORKS[networkId].explorerURL)
				setOpenseaURL(config.NETWORKS[networkId].openseaURL)
			}

			await loadBlockchainData(web3, accounts[0], networkId)

			window.ethereum.on('accountsChanged', function (accounts) {
				setAccount(accounts[0])
				setMessage(null)
			})

			window.ethereum.on('chainChanged', (chainId) => {
				// Handle the new chain.
				// Correctly handling chain changes can be complicated.
				// We recommend reloading the page unless you have good reason not to.
				window.location.reload();
			})
		}
	}

	// MetaMask Login/Connect
	const web3Handler = async () => {
		if (web3) {
			const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
			setAccount(accounts[0])
		}
	}

	const mintNFTHandler = async () => {

		if (ownerOf.length > 150) {
			window.alert("You've reached the max of 150 NFT's.\nThank you for your Donations!")
			return
		}

		// Mint NFT
		if (contract && account) {
			setIsMinting(true)
			setIsError(false)

            let _value = web3.utils.toWei(donation, 'ether');

			// For Testing Only
			// console.log(">>> VALUE:::", _value);

			await contract.methods.mint(1).send({ from: account, value: _value })
				.on('confirmation', async () => {
					const maxSupply = await contract.methods.maxSupply().call()
					const totalSupply = await contract.methods.totalSupply().call()
					setSupplyAvailable(maxSupply - totalSupply)

					const ownerOf = await contract.methods.walletOfOwner(account).call()
					setOwnerOf(ownerOf)
				})
				.on('error', (error) => {
					window.alert(error)
					console.log(">>> ERROR:::", error);
					setIsError(true)
				})
		}

		setIsMinting(false)
	}

	const cycleImages = async () => {
		const getRandomNumber = () => {
			const counter = (Math.floor(Math.random() * 800)) + 1
			setCounter(counter)
		}

		if (!isCycling) { setInterval(getRandomNumber, 3000) }
		setIsCycling(true)
	}

	useEffect(() => {
		loadWeb3()
		cycleImages()
		if(donation >= minDonation) setDonationStatus(false);
		else setDonationStatus(true);
		// console.log(donationStatus);// For Testing Only
	}, [account, donation, donationStatus]);

	return (
		<div>
			<Navbar web3Handler={web3Handler} account={account} explorerURL={explorerURL} />
			<main>
				<section id='welcome' className='welcome'>

					<Row className='header my-3 p-3 mb-0 pb-0'>
						<Col xs={12} md={12} lg={8} xxl={8}>
							<h1>FundMe Punks</h1>
							<p className='sub-header'>Availble on 06 / 8 / 22</p>
						</Col>
						<Col className='flex social-icons'>
							<a
								href="https://twitter.com"
								target='_blank'
								rel="noopener noreferrer"
								className='circle flex button'>
								<img src={twitter} alt="Twitter" />
							</a>
							<a
								href="https://instagram.com"
								target='_blank'
								rel="noopener noreferrer"
								className='circle flex button'>
								<img src={instagram} alt="Instagram" />
							</a>
							<a
								href={`${openseaURL}/collection/${config.PROJECT_NAME}`}
								target='_blank'
								rel="noopener noreferrer"
								className='circle flex button'>
								<img src={opensea} alt="Opensea" />
							</a>
						</Col>
					</Row>

					<Row className='flex m-3'>
						<Col md={5} lg={4} xl={5} xxl={4} className='text-center'>
							<img
								src={`https://gateway.pinata.cloud/ipfs/QmSNdf2PWDEuv5Ut2eq8WDgdxCudJTEruEyxwr5qwH5LoB/${counter}.png`}
								alt="Happy Punks"
								className='showcase'
							/>
						</Col>
						<Col md={5} lg={4} xl={5} xxl={4}>
							{revealTime !== 0 && <Countdown date={currentTime + (revealTime - currentTime)} className='countdown mx-3' />}
							<p className='text'>
								We are a non-profit organization that provides educational resources, opportunities, and support to marginalized communities throughout the U.S. The donations from the FundMe Campaign will allow us to help people from these marginalized communities the opportunity realize their academic and professional dreams.
								<br/><br/>
								This application accepts ETHER donations and in return we will gift you with an exclusive DeFi University FundMe Punks NFT. Thank you for helping us help others!
							</p>
							<a href="#about" className='button mx-3'>Learn More!</a>
						</Col>
					</Row>

				</section>
				<section id='about' className='about'>

					<Row className='flex m-3'>
						<h2 className='text-center p-3'>About the Collection</h2>
						<Col md={5} lg={4} xl={5} xxl={4} className='text-center'>
							<img src={showcase} alt="Multiple Crypto Punks" className='showcase' />
						</Col>
						<Col md={5} lg={4} xl={5} xxl={4}>
							{isError ? (
								<p>Error: {message}</p>
							) : (
								<div>
									<h3>Donate & Mint your NFT</h3>
									
									<ul>
										<li>1,000 generated punked out images using an art generator</li>
										<li>Donation minting on Rinkeby testnet (min {minDonation} ETH)</li>
										<li>Viewable on Opensea shortly after minting</li>
									</ul>

									{isMinting ? 	
										<Spinner animation="border" className='p-3 m-2' />
									 : <div>
											Donation amount:&nbsp;<input style={{"width": "100px"}}className="input"
											placeholder={`min ${minDonation}`}
											onChange={(e)=>{ setDonation(e.currentTarget.value) }}/>
											<br/>
											<Button
												disabled={donationStatus}
												onClick={mintNFTHandler}
												className='button mint-button mt-3'
											>
												Mint
											</Button>
										</div>
									}

									{ownerOf.length > 0 &&
										<p><small>View your NFT on
											<a
												href={`${openseaURL}/assets/${contract._address}/${ownerOf[0]}`}
												target='_blank'
												rel="noopener noreferrer"
												style={{ display: 'inline-block', marginLeft: '3px' }}>
												OpenSea
											</a>
										</small></p>}
								</div>
							)}
						</Col>
					</Row>

					<Row style={{ marginTop: "100px" }}>
						<Col>
							{contract &&
								<a
									href={`${explorerURL}/address/${contract._address}`}
									target='_blank'
									rel="noopener noreferrer"
									className='text-center'>
									{contract._address}
								</a>
							}
						</Col>
					</Row>

				</section>
			</main>
			<footer>

			</footer>
		</div>
	)
}

export default App
