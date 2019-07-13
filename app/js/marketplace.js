window.App = {
  start: function() {
    var self = this;

    // our smart contract ABI - do not use truffle console
    web3.eth.defaultAccount = web3.eth.accounts[0];
    var BallerTokenContract = web3.eth.contract(
      [
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
    var BallerToken = BallerTokenContract.at('0x5ccf1cb83d01312a98f5e85bfea0c8ba450f371e');

    BallerToken.payout('0xc1ad79ab00b3f63577ca653cdfda344e9847d4d0', function(error, results) {
      console.log('we done')
    });
    BallerToken.totalSupply(function(error, results) {
    	var count = results['c'][0];
    	var teamCardHTML = ['<div class=\"card-deck\" style=\"padding:10%;margin:0px;\">'];
        // This will genereate all the cards with an id as the index.
        for (var a = 0; a < count; a += 3) {
            var rowHTML = ['<div class=\"row\">'];
            rowHTML = rowHTML.concat([
                '<div class=\"card mb-4\" id=\"',
                a,
                '\"><div class=\"view overlay\"><img class=\"img-fluid\" src=\"',
                'img/' + teamNames[a] + '.png',
                '\" alt=\"Card image cap\"></div><div class=\"card-body text-center\"><h4 class=\"card-title\">',
                '</h4><p class=\"card-text\">',
                '',
                '</p><button type=\"button\" class=\"btn btn-elegant btn-md\">',
                '</button></div></div>'
            ]);
            if (a + 1 < count) {
                rowHTML = rowHTML.concat([
                    '<div class=\"card mb-4\" id=\"',
                    a + 1,
                    '\"><div class=\"view overlay\"><img class=\"img-fluid\" src=\"',
                    'img/' + teamNames[a + 1] + '.png',
                    '\" alt=\"Card image cap\"></div><div class=\"card-body text-center\"><h4 class=\"card-title\">',
                    '</h4><p class=\"card-text\">',
                    '',
                    '</p><button type=\"button\" class=\"btn btn-elegant btn-md\">',
                    '</button></div></div>'
                ]);
            };
            if (a + 2 < count) {
                rowHTML = rowHTML.concat([
                    '<div class=\"card mb-4\" id=\"',
                    a + 2,
                    '\"><div class=\"view overlay\"><img class=\"img-fluid\" src=\"',
                    'img/' + teamNames[a + 2] + '.png',
                    '\" alt=\"Card image cap\"></div><div class=\"card-body text-center\"><h4 class=\"card-title\">',
                    '</h4><p class=\"card-text\">',
                    '',
                    '</p><button type=\"button\" class=\"btn btn-elegant btn-md\">',
                    '</button></div></div>'
                ]);
            };
            rowHTML = rowHTML.concat(['</div>']);
            teamCardHTML = teamCardHTML.concat(rowHTML);
        };
    	teamCardHTML = teamCardHTML.concat(['</div>']);
    	$('.teamCards').append($.makeArray(teamCardHTML).join(''));
    	for (var a = 0; a < count; a++) {
    		$('.teamCards').find('#' + a).find('h4')[0].innerText = teamNames[a];
    		BallerToken.getTeam(a, function(error, results) {
    			if (!error) {
    				var index = teamNames.indexOf(results[0]);
            var price = results[1].toNumber();
            price = web3._extend.utils.fromWei(price)
            var owner = results[2];
            $('.teamCards').find('#' + index).find(':button')[0].innerText = price + ' ETH - Buy';
            $('.teamCards').find('#' + index).find(':button').click(function() {
              BallerToken.purchase.sendTransaction(index, {from: web3.eth.accounts[0], value: results[1].toNumber()}, function(error, resultOfPurchase) {
      					if (error) {
      						alert('Error Received. Please try again later. We apologize for the inconvenience. A ticket has been submitted regarding this issue.');
      					}
      					else {
      						// Successful transaction!
      						alert('You have sent a transaction to purchase an NBA team to the Ethereum network! Once the transaction is confirmed you will become the owner of this team!')
      					};
      				});
            })
    				if (owner == web3.eth.accounts[0]) {
    					$('.teamCards').find('#' + index).find('p')[0].innerText = 'You are the owner.';
		    			$('.teamCards').find('#' + index).find(':button')[0].disabled = true;
    				}
    				else {
    					$('.teamCards').find('#' + index).find('p')[0].innerText = 'Owner: ' + owner.substr(results[2].length - 6);
    				}
    			};
    		});


    	};

    });
  },
};

window.addEventListener('load', function() {
  App.start();
});
