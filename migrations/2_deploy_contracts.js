const NobleToken = artifacts.require("NobleToken");
const baseTokenURI = "https://ipfs.io/ipfs/QmeTDuCte7S9Gka9AHSyphwajte2qfePbZpgjWgNkweiPa/";
module.exports = function(deployer) {
    deployer.deploy(NobleToken, baseTokenURI);
}