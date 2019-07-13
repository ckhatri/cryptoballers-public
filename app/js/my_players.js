window.App = {
  start: function() {
    var self = this;

    // our smart contract ABI - do not use truffle console
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var BallerTokenContract = web3.eth.contract(
      [
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "teamIndexToOwner",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [],
          "name": "destroy",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "playerIndexToOwner",
          "outputs": [
            {
              "name": "",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_recipient",
              "type": "address"
            }
          ],
          "name": "destroyAndSend",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "BallerCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "name",
              "type": "string"
            },
            {
              "indexed": false,
              "name": "teamID",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "owner",
              "type": "address"
            }
          ],
          "name": "BallerPlayerCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "oldPrice",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "newPrice",
              "type": "uint256"
            },
            {
              "indexed": false,
              "name": "prevOwner",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "newOwner",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "name",
              "type": "string"
            }
          ],
          "name": "TokenSold",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "name": "from",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "to",
              "type": "address"
            },
            {
              "indexed": false,
              "name": "tokenId",
              "type": "uint256"
            }
          ],
          "name": "Transfer",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "name": "previousOwner",
              "type": "address"
            },
            {
              "indexed": true,
              "name": "newOwner",
              "type": "address"
            }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_name",
              "type": "string"
            },
            {
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "createTeam",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_name",
              "type": "string"
            },
            {
              "name": "_owner",
              "type": "address"
            },
            {
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "createPromoTeam",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_name",
              "type": "string"
            },
            {
              "name": "_teamID",
              "type": "uint256"
            },
            {
              "name": "_price",
              "type": "uint256"
            }
          ],
          "name": "createPlayer",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "getTeam",
          "outputs": [
            {
              "name": "teamName",
              "type": "string"
            },
            {
              "name": "currPrice",
              "type": "uint256"
            },
            {
              "name": "owner",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "getPlayer",
          "outputs": [
            {
              "name": "playerName",
              "type": "string"
            },
            {
              "name": "currPrice",
              "type": "uint256"
            },
            {
              "name": "owner",
              "type": "address"
            },
            {
              "name": "owningTeamID",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "name": "_newName",
              "type": "string"
            }
          ],
          "name": "changeTeamName",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "name": "_newName",
              "type": "string"
            }
          ],
          "name": "changePlayerName",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_tokenId",
              "type": "uint256"
            },
            {
              "name": "_newTeamId",
              "type": "uint256"
            }
          ],
          "name": "changePlayerTeam",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_to",
              "type": "address"
            }
          ],
          "name": "payout",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_to",
              "type": "address"
            },
            {
              "name": "_amount",
              "type": "uint256"
            }
          ],
          "name": "withdrawAmount",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_teamId",
              "type": "uint256"
            }
          ],
          "name": "priceOfTeam",
          "outputs": [
            {
              "name": "price",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_playerID",
              "type": "uint256"
            }
          ],
          "name": "priceOfPlayer",
          "outputs": [
            {
              "name": "price",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "getTeamsOfOwner",
          "outputs": [
            {
              "name": "ownedTeams",
              "type": "uint256[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "getPlayersOfOwner",
          "outputs": [
            {
              "name": "ownedPlayers",
              "type": "uint256[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_tokenId",
              "type": "uint256"
            }
          ],
          "name": "ownerOf",
          "outputs": [
            {
              "name": "owner",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_playerId",
              "type": "uint256"
            }
          ],
          "name": "ownerOfPlayer",
          "outputs": [
            {
              "name": "owner",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_playerId",
              "type": "uint256"
            }
          ],
          "name": "teamOwnerOfPlayer",
          "outputs": [
            {
              "name": "teamOwner",
              "type": "address"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "name": "numTeamsOwned",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_owner",
              "type": "address"
            }
          ],
          "name": "balanceOfPlayers",
          "outputs": [
            {
              "name": "numPlayersOwned",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
            {
              "name": "totalNumTeams",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "totalPlayerSupply",
          "outputs": [
            {
              "name": "totalNumPlayers",
              "type": "uint256"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getAllTeams",
          "outputs": [
            {
              "components": [
                {
                  "name": "name",
                  "type": "string"
                }
              ],
              "name": "teams",
              "type": "tuple[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "getAllPlayers",
          "outputs": [
            {
              "components": [
                {
                  "name": "name",
                  "type": "string"
                },
                {
                  "name": "teamID",
                  "type": "uint256"
                }
              ],
              "name": "players",
              "type": "tuple[]"
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_teamId",
              "type": "uint256"
            }
          ],
          "name": "purchase",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        },
        {
          "constant": false,
          "inputs": [
            {
              "name": "_playerId",
              "type": "uint256"
            }
          ],
          "name": "purchasePlayer",
          "outputs": [],
          "payable": true,
          "stateMutability": "payable",
          "type": "function"
        }
      ]
    );

  // our smart contract address
    var BallerToken = BallerTokenContract.at('0xf12b5dd4ead5f743c6baa640b0216200e89b60da');
    BallerToken.getPlayersOfOwner(web3.eth.accounts[0], function(error, results) {
      if (error) {
        alert('Something went wrong, sorry! A ticket has been noted and sent to the development team');
        return;
      }

      // If the user has no teams, we'll display an no teams owned message.
      if (results.length == 0) {
        $('.teamCards').append('<h1 class="text-center">You do not own any teams. Please visit the <a href="marketplace.html" class="blue-text">Marketplace</a> to purchase your very own NBA team!</h1>' +
          '<p>If this is an error, please reach out to our community channels and we will get back to you as soon as possible.</p>');
        $('.teamCards').css('display', 'flex');
        $('.teamCards').css('justify-content', 'center');
        $('.teamCards').css('flex-direction', 'column');
        $('.teamCards').css('align-items', 'center');
        $('.teamCards').css('height', '100%');
      }

    	var count = results.length;
    	var teamCardHTML = ['<div class=\"card-deck\" style=\"padding:10%;margin:0px;\">'];
        // This will genereate all the cards with an id as the index.
      for (var a = 0; a < count; a += 3) {
        var rowHTML = ['<div class=\"row\">'];
        rowHTML = rowHTML.concat([
            '<div class=\"card mb-4 col-4\" id=\"',
            playerNames.indexOf(playerNames[results[a]['c']]),
            '\"><div class=\"view overlay\"><img class=\"img-fluid\" src=\"',
            'img/' + playerNames[results[a]['c']] + '.png',
            '\" alt=\"Card image cap\"></div><div class=\"card-body text-center\"><h4 class=\"card-title\">',
            '</h4><p class=\"card-text\">',
            '',
            '</p><button type=\"button\" class=\"btn btn-elegant btn-md\">',
            '</button></div></div>'
        ]);
        if (a + 1 < count) {
          rowHTML = rowHTML.concat([
              '<div class=\"card mb-4 col-4\" id=\"',
                playerNames.indexOf(playerNames[results[a+1]['c']]),
              '\"><div class=\"view overlay\"><img class=\"img-fluid\" src=\"',
              'img/' + playerNames[results[a+1]['c']] + '.png',
              '\" alt=\"Card image cap\"></div><div class=\"card-body text-center\"><h4 class=\"card-title\">',
              '</h4><p class=\"card-text\">',
              '',
              '</p><button type=\"button\" class=\"btn btn-elegant btn-md\">',
              '</button></div></div>'
          ]);
        }
        if (a + 2 < count) {
          rowHTML = rowHTML.concat([
              '<div class=\"card mb-4 col-4\" id=\"',
              playerNames.indexOf(playerNames[results[a+2]['c']]),
              '\"><div class=\"view overlay\"><img class=\"img-fluid\" src=\"',
              'img/' + playerNames[results[a+2]['c']] + '.png',
              '\" alt=\"Card image cap\"></div><div class=\"card-body text-center\"><h4 class=\"card-title\">',
              '</h4><p class=\"card-text\">',
              '',
              '</p><button type=\"button\" class=\"btn btn-elegant btn-md\">',
              '</button></div></div>'
          ]);
        }
        rowHTML = rowHTML.concat(['</div>']);
        teamCardHTML = teamCardHTML.concat(rowHTML);
      };
  	  teamCardHTML = teamCardHTML.concat(['</div>']);

    	$('.teamCards').append($.makeArray(teamCardHTML).join(''));
    	for (var a = 0; a < count; a++) {
        var index = playerNames.indexOf(playerNames[results[a]['c']])
    		$('.teamCards').find('#' + index).find('h4')[0].innerText = playerNames[results[a]['c']];
    		BallerToken.getTeam(index, function(error, results) {
    			if (!error) {
    				var index = playerNames.indexOf(results[0]);
            $('.teamCards').find('#' + index).find('p')[0].innerText = 'You are the owner.';
            $('.teamCards').find('#' + index).find(':button')[0].innerText = web3._extend.utils.fromWei(results[1].toNumber()) + ' ETH to purchase from you.';
          }
        });
      }
});
  },
};

window.addEventListener('load', function() {
  App.start();
});
