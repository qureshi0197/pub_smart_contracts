// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface IERC1155 {
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external;
}

contract AirdropNFTs {
    constructor() {}

    function airdropNft(
        IERC1155 _token,
        address[] calldata _to,
        uint256[] calldata _id,
        uint256[] calldata _amount
    ) public {
        require(
            _to.length == _id.length,
            "Receivers and IDs are different length"
        );
        for (uint256 i = 0; i < _to.length; i++) {
            _token.safeTransferFrom(msg.sender, _to[i], _id[i], _amount[i], "");
        }
    }
}
