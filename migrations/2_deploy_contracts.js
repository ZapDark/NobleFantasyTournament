const NobleToken = artifacts.require("NobleToken");
const baseTokenURI = "https://ipfs.io/ipfs/QmUNLLsPACCz1vLxQVkXqqLX5R1X345qqfHbsf67hvA3Nn/";
module.exports = function(deployer) {
    deployer.deploy(NobleToken, baseTokenURI);
}