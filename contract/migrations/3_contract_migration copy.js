const first_contract = artifacts.require("./first_contract.sol");

module.exports = function(deployer) {
  deployer.deploy(first_contract);
};
