module.exports = function(callback) {
  const artifacts = require('../build/contracts/BallerToken.json')
  const contract = require('truffle-contract')
  const BallerToken = contract(artifacts)
  BallerToken.setProvider(web3.currentProvider)
  var p1 = {name:'Steph Curry', teamID: 1}
  var p2 = {name:'Lebron James', teamID: 2}
  var p3 = {name:'Kyrie Curry', teamID: 3}
  var p4 = {name:'James Curry', teamID: 4}
  var p5 = {name:'Dirk Nowitzki', teamID: 5}
  var playerNames = [p1, p2, p3, p4, p5]

  web3.eth.getAccounts((error, accounts) => {
    var owner = accounts[0]
    var acc1 = accounts[1]
    BallerToken.deployed().then(async (instance) => {
      let price = web3._extend.utils.toWei(0.01, 'ether')
      try {
        for (var a = 0; a < playerNames.length; a++) {
          await instance.createPlayer(playerNames[a].name, playerNames[a].teamID, price, {from: owner, gas:3000000})
        }
        console.log(await instance.totalPlayerSupply())
        console.log("players created!")
      }
      catch (e) {
        console.log(e)
      }
    })
  })
}
