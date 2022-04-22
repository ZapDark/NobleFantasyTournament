// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NobleToken is ERC721URIStorage {
    uint256 public tokenIds;

    constructor() ERC721("NobleToken", "NBL") {
    }
    
    function mintToken(address player, string memory tokenURI) public returns (uint256) {
        uint256 newItemId = tokenIds;
        _safeMint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        tokenIds = tokenIds + 1;
        return newItemId;
    }
}



