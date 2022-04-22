// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract NobleToken is ERC721Enumerable, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    uint public constant MAX_SUPPLY = 1000000;
    uint public constant PRICE = 0.02 ether;
    uint public constant MAX_PER_MINT = 3;

    string public baseTokenURI;

    constructor(string memory baseURI) ERC721("NobleToken", "NBL") {
        setBaseURI(baseURI);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) internal {
        baseTokenURI = _baseTokenURI;
    }

    function mintNFTs(uint _count) public payable {
        uint totalMinted = _tokenIds.current();

        require(totalMinted.add(_count) <= MAX_SUPPLY, "Cannot mint more than MAX_SUPPLY");
        require(_count >0 && _count <= MAX_PER_MINT, "Cannot mint more than MAX_PER_MINT");
        require(msg.value >= PRICE.mul(_count), "Not enough ether to mint an NFT");
        
        for(uint i = 0; i < _count; i++) {
            _mintSingleNFT();
        }
    }

    function _mintSingleNFT() private {
        uint newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _tokenIds.increment();
    }

    function getMyTokens(address _owner) external view returns (uint[] memory) {
        uint tokenCount = balanceOf(_owner);
        uint[] memory tokenIds = new uint256[](tokenCount);

        for(uint i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function withdraw() public payable onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No ether to withdraw");
        
        (bool success, ) = (msg.sender).call{value: balance}("");
        require(success, "Failed to send ether to owner.");
    }
}



