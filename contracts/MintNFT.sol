// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MintNFT is Ownable, ERC1155 {
    // Base URI
    string private baseURI;
    string public name;

    constructor()
        ERC1155(
            "ipfs://Qmbq3VX6hJUwzGS5rXTTKKCXePoAEFpm4kypA7PZDyYmnF/{id}.json"
        )
    {
        setName("COOL NFT");
    }

    function setURI(string memory _newuri) public onlyOwner {
        _setURI(_newuri);
    }

    function setName(string memory _name) public onlyOwner {
        name = _name;
    }

    function mintBatch(uint256[] memory ids, uint256[] memory amounts)
        public
        onlyOwner
    {
        _mintBatch(msg.sender, ids, amounts, "");
    }

    function mint(uint256 id, uint256 amount) public onlyOwner {
        _mint(msg.sender, id, amount, "");
    }

}