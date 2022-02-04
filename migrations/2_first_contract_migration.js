const first_contract_migration = artifacts.require("first_contract");

module.exports = function (deployer) {
  deployer.deploy(first_contract_migration, 10);
};