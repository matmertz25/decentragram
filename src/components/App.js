import Decentragram from '../abis/Decentragram.json'
import React, { Component } from 'react';
import Identicon from 'identicon.js';
<<<<<<< Updated upstream
=======
import './App.css';
import Decentragram from '../abis/Decentragra.json'
>>>>>>> Stashed changes
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

<<<<<<< Updated upstream
//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values
=======
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
>>>>>>> Stashed changes

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
<<<<<<< Updated upstream
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Decentragram.networks[networkId]
    if(networkData) {
      const decentragram = new web3.eth.Contract(Decentragram.abi, networkData.address)
      this.setState({ decentragram })
      const imagesCount = await decentragram.methods.imageCount().call()
      this.setState({ imagesCount })
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
=======
    await this.loadBlockChainData()
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      console.log('Non ethereum supported browser detected. Consider installing metamask')
    }

  }

  async loadBlockChainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})

    const networkId = await web3.eth.net.getId()

    let chainData = await (await fetch('https://chainid.network/chains.json')).json()

    let network = 'unknown';
    network = chainData.find(chain => chain.networkId === networkId)

    // if (networkId === 1) {
    //   network = 'mainNet';
    // } else if (networkId === 3) {
    //   network = 'ropsten';
    // } else if (networkId === 4) {
    //   network = 'rinkeby';
    // } else if (networkId === 42) {
    //   network = 'kovan';
    // } else if (networkId === 5) {
    //   network = 'goerli';
    // }
    this.setState({network})

    const networkData = Decentragram.networks[networkId]
    if (networkData) {
      const decentragram = web3.eth.Contract(Decentragram.abi, networkData.address)
      this.setState({decentragram})

      const imagesCount = await decentragram.methods.imageCount().call()
      this.setState({imagesCount})

       // Load images
       for (var i = 1; i <= imagesCount; i++) {
>>>>>>> Stashed changes
        const image = await decentragram.methods.images(i).call()
        this.setState({
          images: [...this.state.images, image]
        })
      }
      // Sort images. Show highest tipped images first
      this.setState({
        images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
      })
<<<<<<< Updated upstream
      this.setState({ loading: false})
    } else {
      window.alert('Decentragram contract not deployed to detected network.')
    }
  }

  captureFile = event => {

    event.preventDefault()
    const file = event.target.files[0]
=======

    } else {   
      console.log('Decentragram contract has not been deployed to the detected network')
    }
    this.setState({loading: false})
  }

  captureFile = e => {
    e.preventDefault();
    const file = e.target.files[0]
>>>>>>> Stashed changes
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
<<<<<<< Updated upstream
      this.setState({ buffer: Buffer(reader.result) })
=======
      this.setState({buffer: Buffer(reader.result)})
>>>>>>> Stashed changes
      console.log('buffer', this.state.buffer)
    }
  }

  uploadImage = description => {
    console.log("Submitting file to ipfs...")

    //adding file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      if(error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      this.state.decentragram.methods.uploadImage(result[0].hash, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  tipImageOwner(id, tipAmount) {
    this.setState({ loading: true })
    this.state.decentragram.methods.tipImageOwner(id).send({ from: this.state.account, value: tipAmount }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
<<<<<<< Updated upstream
=======
      network: '',
>>>>>>> Stashed changes
      decentragram: null,
      images: [],
      loading: true
    }

    this.uploadImage = this.uploadImage.bind(this)
    this.tipImageOwner = this.tipImageOwner.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} network={this.state.network} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
<<<<<<< Updated upstream
              images={this.state.images}
              captureFile={this.captureFile}
              uploadImage={this.uploadImage}
              tipImageOwner={this.tipImageOwner}
=======
            captureFile={this.captureFile}
            uploadImage={this.uploadImage}
            tipImageOwner={this.tipImageOwner}
            images={this.state.images}
>>>>>>> Stashed changes
            />
        }
      </div>
    );
  }
}

export default App;