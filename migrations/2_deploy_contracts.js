var BallerToken = artifacts.require("./BallerToken.sol");

module.exports = function(deployer) {
  deployer.deploy(BallerToken);
};
