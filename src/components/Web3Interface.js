import config from '../config.json';
import CertificateContract from './ContractAbi.json'

const Web3 = require('web3');

//Hier hohlen wir uns das Web3 Object von Metamask und initialisieren die Accounts. Wir erstellen ebenfalls ein Contract objekt
//mit dem wir dann die Funktionen aufrufen.
export default class Web3Service {
  //web3;
  //contract;
  constructor() {
    if (window['ethereum']) {
      this.web3 = new Web3(window['ethereum'])
    } else if (window['web3']) {
      this.web3 = new Web3(config.remoteProvider)
    }

    this.contract = new this.web3.eth.Contract(CertificateContract, config.contractAddress)
    this.contractAddress = config.contractAddress

    this.state = {
      initialized: false
    }
    this.initAccounts = this.initAccounts.bind(this)
  }

  //necessary so that metamask allows use of accounts
  async initAccounts() {
    if (window['ethereum']) {
      try {
        //returns the active address
        await window['ethereum'].enable()
      } catch (error) {}
    }


  }
}