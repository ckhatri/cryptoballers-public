module.exports = function(callback) {
  const artifacts = require('../build/contracts/BallerToken.json')
  const contract = require('truffle-contract')
  const BallerToken = contract(artifacts)
  BallerToken.setProvider(web3.currentProvider)
  const teamNames = [
    'Atlanta Hawks',
    'Boston Celtics',
    'Brooklyn Nets',
    'Charlotte Hornets',
    'Chicago Bulls',
    'Cleveland Cavaliers',
    'Dallas Mavericks',
    'Denver Nuggets',
    'Detroit Pistons',
    'Golden State Warriors',
    'Houston Rockets',
    'Indiana Pacers',
    'LA Clippers',
    'LA Lakers',
    'Memphis Grizzlies',
    'Miami Heat',
    'Milwaukee Bucks',
    'Minnesota Timberwolves',
    'New Orleans Pelicans',
    'New York Knicks',
    'Oklahoma City Thunder',
    'Orlando Magic',
    'Philadelphia Sixers',
    'Phoenix Suns',
    'Portland Trail Blazers',
    'Sacramento Kings',
    'San Antonio Spurs',
    'Toronto Raptors',
    'Utah Jazz',
    'Washington Wizards'
  ]

  web3.eth.getAccounts((error, accounts) => {
    var owner = accounts[0]
    var acc1 = accounts[1]
    BallerToken.deployed().then(async (instance) => {
      let price = web3._extend.utils.toWei(0.01, 'ether')
      try {
        for (var a = 0; a < teamNames.length; a++) {
          await instance.createTeam(teamNames[a], price, {from: owner, gas:3000000})
        }
        console.log(await instance.totalSupply())
        console.log("teams created!")
      }
      catch (e) {
        console.log(e)
      }
    })
  })
}
