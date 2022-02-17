// SPDX-License-Identifier: MIT
pragma soldity ^0.8.11;

import "@oppenzeppelin/contracts/token/ERC721/ERC721.sol";

contract Noble is ERC721 {

    address public owner;
    uint256 tokenId = 1;

    struct NobleInfo {
        uint tokenId;
        string tokenName;
        address owner;
    }

    Noble[] public allTokens;

    mapping(address => Noble[]) public tokenAddress;
    mapping(string => bool) public tokenExists;

    constructor() ERC721("Noble", "CLR") {
        owner = msg.sender;
    }

    function getAllTokens() public view returns (Noble[] memory) {
        return allTokens;
    }

    function getMyTokens() public view returns (Noble[] memory) {
        return tokenAddress[msg.sender];
    }
    function mintToken(string calldata _tokenName) public payable {
        require(!tokenExists[_tokenName], "Token already exists");

        _safeMint(msg.sender, tokenId);

        allTokends.push(NobleInfo(tokenId, _tokenName, msg.sender));

        tokenAddress[msg.sender].push(NobleInfo(tokenId, _tokenName, msg.sender));

        tokenExists[_tokenName] = true;
        
        tokenId++;
    }
}



