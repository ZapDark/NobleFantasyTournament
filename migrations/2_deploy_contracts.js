const NobleToken = artifacts.require("NobleToken");

module.exports = function(deployer) {
    deployer.deploy(NobleToken);
}