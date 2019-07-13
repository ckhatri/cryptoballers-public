// Allows us to use ES6 in our migrations and tests.
require('babel-register')
var HDWalletProvider = require("truffle-hdwallet-provider")
var mnemonic = ""
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    ropsten: {
        provider: function() {
            return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/0weTUgjfTXPYIVBjAY8Q")
        },
        network_id: 3,
        gas: 2900000
    },
    live: {
        provider: function() {
            return new HDWalletProvider(mnemonic, "https://mainnet.infura.io/0weTUgjfTXPYIVBjAY8Q")
        },
        network_id: 1,
        gasPrice: 4000000000
    }
  }
}
