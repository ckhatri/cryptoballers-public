
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Metamask already refreshed the page, this most likely never runs
var checkConnection = debounce(function() {
  if (typeof web3 == 'undefined') {
    location.reload(true);
  }
}, 250);

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined' && web3.version.network == 1) {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
    document.getElementById('status').style.backgroundImage = "url('/app/img/eth_green.svg')";

  } else {
    alert('You are not connected to the Ethereum Main Network! You can do so by installing MetaMask and making sure MetaMask is on the main network. Once done, refresh the page.')
  }

});

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

  web3.eth.defaultAccount = web3.eth.accounts[0];
