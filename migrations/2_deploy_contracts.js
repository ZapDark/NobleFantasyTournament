const NobleToken = artifacts.require("NobleToken");
const baseTokenURI = "https://ipfs.io/ipfs/QmdqiMKdyDTG4Cj7v7gPwJZ1fSX3qk3JGEMNzLcgXTWzGV";
module.exports = function(deployer) {
    deployer.deploy(NobleToken, baseTokenURI);
}