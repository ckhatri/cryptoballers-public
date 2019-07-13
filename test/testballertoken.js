var BallerToken = artifacts.require("./BallerToken.sol")

contract('BallerToken', (accounts) => {
  let instance
  console.log(accounts)
  let owner = accounts[0]
  let account = accounts[1]
  const name = "hello world"
  const player_name = "dirk"
  const player_team_id = 1
  const default_price = web3._extend.utils.toWei(0.01, 'ether')

  beforeEach(async () => {
    instance = await BallerToken.deployed()
  })

  describe("tests for onlyOwner modifier", async() => {
    it("should test non-owner call to ownerOnly method and give error", async () => {
      try {
        const tx = await instance.createTeam("hello world", default_price, {from: account})
        assert.fail(true, true, "account is considered owner but he isn't")
      }
      catch (e) {
        return true;
      }
    })

    it("should create team no error since owner is creating", async () => {
      try {
        await instance.createTeam("hello world", default_price, {from: owner})
        let res = await instance.priceOfTeam.call(0)
      }
      catch (e) {
        assert.fail(true, true, "creation of team is failing")
      }
    })

    it("should fail to create player since not owner is creating", async() => {
        try {
            await instance.createPlayer(name_player, player_team_id, default_price, {from:account})
            assert.fail(true, true, "account is considered owner but isn't")
        }
        catch (e) {
            return true;
        }
    })

    it("should create player no error since owner is creating", async() => {
        try {
            await instance.createPlayer(player_name, player_team_id, default_price, {from: owner})
            let res = await instance.priceOfPlayer.call(0);
        }
        catch (e) {
            assert.fail(true, true, "creation of player is failing")
        }
    })

    it("should fail payout", async () => {
      try {
        const tx = await instance.payout.call(account, {from: account})
        assert.fail(true, true, "account is considered owner but he isn't")
      }
      catch (e) {
        return true;
      }
    })

    it("should fail withdraw", async () => {
      try {
        const tx = await instance.withdrawAmount.call(account, 0, {from: account})
        assert.fail(true, true, "account is considered owner but he isn't")
      }
      catch (e) {
        return true;
      }
    })

  })

  describe("tests checking team related functions" , async() => {
    it("should find added team to have correct default values", async() => {
      const result = await instance.getTeam.call(0)
      assert.equal(result[0], name, ("name should be: " + name + " but is: " + result[0]))
      const resultPrice = web3._extend.utils.fromWei(result[1].toNumber(), 'ether')
      const predictedPrice = web3._extend.utils.fromWei(default_price, 'ether')
      assert.equal(resultPrice, predictedPrice, ("price should be: " + predictedPrice + " but is: " + resultPrice))
      const owner = result[2]
      assert.equal(owner, instance.address, ("owner should be: " + instance.address + " but is: " + owner))
    })

    it("should return price of team", async() => {
      let resultPrice = await instance.priceOfTeam.call(0)
      resultPrice = web3._extend.utils.fromWei(resultPrice.toNumber(), 'ether')
      assert.equal(resultPrice, 0.01, "default starting price is 0.01 but we got: " + resultPrice)
    })

    it("should return owner as smart contract", async() => {
      const resultOwner = await instance.ownerOf.call(0)
      assert.equal(resultOwner, instance.address, "owner of newly created teams should be smart contract address")
    })

    it("should return smart contract as owning one team", async() => {
      const resultNumOwned = await instance.balanceOf.call(instance.address)
      assert.equal(resultNumOwned, 1, "smart contract should own one team")
    })

    it("should return the total amount of teams being one", async() => {
      const resultTotalTeams = await instance.totalSupply.call()
      assert.equal(resultTotalTeams, 1, "should have total of one team")
    })

    it("should change the team name", async() => {
      const newName = "Kobe"
      await instance.changeTeamName(0, newName, {from: owner})
      const result = await instance.getTeam.call(0)
      const resultName = result[0]
      assert.equal(resultName, newName, ("name should be: " + newName + " but is: " + resultName))
    })

    it("should get team added owned by smart contract", async() => {
      const result = await instance.getTeamsOfOwner(instance.address)
      const resultSize = result.length
      assert.equal(resultSize, 1, "size should be 1 but is: " + resultSize)
      const resultIndex = result[0].toNumber()
      assert.equal(resultIndex, 0, "index should be 0 but is: " + resultIndex)
    })
  })

  describe("tests related to purchasing teams", async() => {
    it("should fail purchase due to owner being purchaser", async() => {
      const purchaseAmount = web3._extend.utils.toWei(0.1, 'ether')
      try {
        await instance.purchase(0, {from: instance.address, value: purchaseAmount})
        assert.fail(true, true, "purchase is succeeding but owner is trying to buy own property")
      }
      catch (e) {
        return true;
      }
    })
    it("should fail purchase due bad address", async() => {
      const purchaseAmount = web3._extend.utils.toWei(0.1, 'ether')
      try {
        await instance.purchase(0, {from: address(0), value: purchaseAmount})
        assert.fail(true, true, "purchase is succeeding but we sent null address")
      }
      catch (e) {
        return true;
      }
    })
    it("should fail purchase due to not enough funds", async() => {
      const purchaseAmount = web3._extend.utils.toWei(0, 'ether')
      try {
        await instance.purchase(0, {from: account, value: purchaseAmount})
        assert.fail(true, true, "purchase is succeeding but we didnt have enough money")
      }
      catch (e) {
        return true;
      }
    })
    it("should succeed purchase due to enough funds, update price", async() => {
      const purchaseAmount = web3._extend.utils.toWei(0.1, 'ether')
      try {
        await instance.purchase(0, {from: account, value: purchaseAmount})
        const result = await instance.getTeam.call(0);
        const actualNewPrice = web3._extend.utils.fromWei(result[1].toNumber(), 'ether')
        const newPredictedPrice = 0.02
        assert.equal(actualNewPrice, newPredictedPrice, ("price should be: " + newPredictedPrice + " but is: " + actualNewPrice))
        const newOwner = result[2]
        assert.equal(newOwner, account, ("owner should be: " + account + " but is: " + newOwner))
      }
      catch (e) {
        assert.fail(true, true, "purchase failed but all requirements were true")
      }
    })
    it("should increase price by 1.35x and allow purchase", async() => {
      try {
        const firstLimitPrice = web3._extend.utils.toWei(1.00, 'ether')
        await instance.createTeam("1.35xer", firstLimitPrice, {from: owner})
      }
      catch (e) {
        assert.fail(true, true, "creation of team is failing, shouldnt")
      }
      const purchaseAmount = web3._extend.utils.toWei(1.1, 'ether')
      await instance.purchase(1, {from: account, value: purchaseAmount})
      let resultPrice = await instance.priceOfTeam.call(1)
      resultPrice = web3._extend.utils.fromWei(resultPrice.toNumber(), 'ether')
      const newPredictedPrice = 1.35
      assert.equal(resultPrice, newPredictedPrice, ("price should be: " + newPredictedPrice + " but is: " + resultPrice))
    })
    it("should increase price by 1.25x and allow purchase", async() => {
      try {
        const firstLimitPrice = web3._extend.utils.toWei(2.00, 'ether')
        await instance.createTeam("1.25xer", firstLimitPrice, {from: owner})
      }
      catch (e) {
        assert.fail(true, true, "creation of team is failing, shouldnt")
      }
      const purchaseAmount = web3._extend.utils.toWei(2.1, 'ether')
      await instance.purchase(2, {from: account, value: purchaseAmount})
      let resultPrice = await instance.priceOfTeam.call(2)
      resultPrice = web3._extend.utils.fromWei(resultPrice.toNumber(), 'ether')
      const newPredictedPrice = 2.5
      assert.equal(resultPrice, newPredictedPrice, ("price should be: " + newPredictedPrice + " but is: " + resultPrice))
    })
    it("should increase price by 1.1x and allow purchase", async() => {
      try {
        const firstLimitPrice = web3._extend.utils.toWei(5.00, 'ether')
        await instance.createTeam("1.1xer", firstLimitPrice, {from: owner})
      }
      catch (e) {
        assert.fail(true, true, "creation of team is failing, shouldnt")
      }
      const purchaseAmount = web3._extend.utils.toWei(5.1, 'ether')
      await instance.purchase(3, {from: account, value: purchaseAmount})
      let resultPrice = await instance.priceOfTeam.call(3)
      resultPrice = web3._extend.utils.fromWei(resultPrice.toNumber(), 'ether')
      const newPredictedPrice = 5.75
      assert.equal(resultPrice, newPredictedPrice, ("price should be: " + newPredictedPrice + " but is: " + resultPrice))
    })
  })

  describe("tests checking player related functions" , async() => {
    it("should find added player to have correct default values", async() => {
      const result = await instance.getPlayer.call(0)
      assert.equal(result[0], player_name, ("name should be: " + player_name + " but is: " + result[0]))
      assert.equal(result[3], player_team_id, ("team id should be: " + player_team_id + " but is: " + result[3]))
      const resultPrice = web3._extend.utils.fromWei(result[1].toNumber(), 'ether')
      const predictedPrice = web3._extend.utils.fromWei(default_price, 'ether')
      assert.equal(resultPrice, predictedPrice, ("price should be: " + predictedPrice + " but is: " + resultPrice))
      const owner = result[2]
      assert.equal(owner, instance.address, ("owner should be: " + instance.address + " but is: " + owner))
    })

    it("should return price of team", async() => {
      let resultPrice = await instance.priceOfPlayer.call(0)
      resultPrice = web3._extend.utils.fromWei(resultPrice.toNumber(), 'ether')
      assert.equal(resultPrice, 0.01, "default starting price is 0.01 but we got: " + resultPrice)
    })

    it("should return owner as smart contract", async() => {
      const resultOwner = await instance.ownerOfPlayer.call(0)
      assert.equal(resultOwner, instance.address, "owner of newly created teams should be smart contract address")
    })

    it("should return smart contract as owning one team", async() => {
      const resultNumOwned = await instance.balanceOfPlayers.call(instance.address)
      assert.equal(resultNumOwned, 1, "smart contract should own one player")
    })

    it("should return the total amount of players being one", async() => {
      const resultTotalPlayers = await instance.totalPlayerSupply.call()
      assert.equal(resultTotalPlayers, 1, "should have total of one player")
    })

    it("should change the player name", async() => {
      const newName = "Kobe"
      await instance.changePlayerName(0, newName, {from: owner})
      const result = await instance.getTeam.call(0)
      const resultName = result[0]
      assert.equal(resultName, newName, ("name should be: " + newName + " but is: " + resultName))
    })

    it("should get player added owned by smart contract", async() => {
      const result = await instance.getPlayersOfOwner(instance.address)
      const resultSize = result.length
      assert.equal(resultSize, 1, "size should be 1 but is: " + resultSize)
      const resultIndex = result[0].toNumber()
      assert.equal(resultIndex, 0, "index should be 0 but is: " + resultIndex)
    })
  })

  describe("tests related to purchasing players", async() => {
    it("should fail purchase due to owner being purchaser", async() => {
      const purchaseAmount = web3._extend.utils.toWei(0.1, 'ether')
      try {
        await instance.purchasePlayer(0, {from: instance.address, value: purchaseAmount})
        assert.fail(true, true, "purchase is succeeding but owner is trying to buy own property")
      }
      catch (e) {
        return true;
      }
    })
    it("should fail purchase due bad address", async() => {
      const purchaseAmount = web3._extend.utils.toWei(0.1, 'ether')
      try {
        await instance.purchasePlayer(0, {from: address(0), value: purchaseAmount})
        assert.fail(true, true, "purchase is succeeding but we sent null address")
      }
      catch (e) {
        return true;
      }
    })
    it("should fail purchase due to not enough funds", async() => {
      const purchaseAmount = web3._extend.utils.toWei(0, 'ether')
      try {
        await instance.purchasePlayer(0, {from: account, value: purchaseAmount})
        assert.fail(true, true, "purchase is succeeding but we didnt have enough money")
      }
      catch (e) {
        return true;
      }
    })
    it("should succeed purchase due to enough funds, update price", async() => {
      const purchaseAmount = web3._extend.utils.toWei(0.1, 'ether')
      try {
        await instance.purchasePlayer(0, {from: account, value: purchaseAmount})
        const result = await instance.getPlayer.call(0);
        const actualNewPrice = web3._extend.utils.fromWei(result[1].toNumber(), 'ether')
        const newPredictedPrice = 0.02
        assert.equal(actualNewPrice, newPredictedPrice, ("price should be: " + newPredictedPrice + " but is: " + actualNewPrice))
        const newOwner = result[2]
        assert.equal(newOwner, account, ("owner should be: " + account + " but is: " + newOwner))
      }
      catch (e) {
        assert.fail(true, true, "purchase failed but all requirements were true")
      }
    })
    it("should increase price by 1.35x and allow purchase", async() => {
      try {
        const firstLimitPrice = web3._extend.utils.toWei(1.00, 'ether')
        await instance.createPlayer("1.35xer", 1, firstLimitPrice, {from: owner})
      }
      catch (e) {
        assert.fail(true, true, "creation of team is failing, shouldnt")
      }
      const purchaseAmount = web3._extend.utils.toWei(1.1, 'ether')
      await instance.purchasePlayer(1, {from: account, value: purchaseAmount})
      let resultPrice = await instance.priceOfPlayer.call(1)
      resultPrice = web3._extend.utils.fromWei(resultPrice.toNumber(), 'ether')
      const newPredictedPrice = 1.35
      assert.equal(resultPrice, newPredictedPrice, ("price should be: " + newPredictedPrice + " but is: " + resultPrice))
    })
    it("should increase price by 1.25x and allow purchase", async() => {
      try {
        const firstLimitPrice = web3._extend.utils.toWei(2.00, 'ether')
        await instance.createPlayer("1.25xer", 1, firstLimitPrice, {from: owner})
      }
      catch (e) {
        assert.fail(true, true, "creation of team is failing, shouldnt")
      }
      const purchaseAmount = web3._extend.utils.toWei(2.1, 'ether')
      await instance.purchasePlayer(2, {from: account, value: purchaseAmount})
      let resultPrice = await instance.priceOfPlayer.call(2)
      resultPrice = web3._extend.utils.fromWei(resultPrice.toNumber(), 'ether')
      const newPredictedPrice = 2.5
      assert.equal(resultPrice, newPredictedPrice, ("price should be: " + newPredictedPrice + " but is: " + resultPrice))
    })
    it("should increase price by 1.1x and allow purchase", async() => {
      try {
        const firstLimitPrice = web3._extend.utils.toWei(5.00, 'ether')
        await instance.createPlayer("1.1xer", 1, firstLimitPrice, {from: owner})
      }
      catch (e) {
        assert.fail(true, true, "creation of player is failing, shouldnt")
      }
      const purchaseAmount = web3._extend.utils.toWei(5.1, 'ether')
      await instance.purchasePlayer(3, {from: account, value: purchaseAmount})
      let resultPrice = await instance.priceOfPlayer.call(3)
      resultPrice = web3._extend.utils.fromWei(resultPrice.toNumber(), 'ether')
      const newPredictedPrice = 5.75
      assert.equal(resultPrice, newPredictedPrice, ("price should be: " + newPredictedPrice + " but is: " + resultPrice))
    })
  })

  describe("tests withdraw and payout functions", async() => {
    it("tests withdraw function", async() => {
      const amtWithdraw = web3._extend.utils.toWei(2.0, 'ether')
      await instance.withdrawAmount(account, amtWithdraw, {from: owner})
      console.log("have to manually check for 2 ether increase")
    })

    it("tests withdraw function", async() => {
      await instance.payout(account, {from: owner})
      console.log("manually check that balance of account goes back to original")
    })
  })

})
