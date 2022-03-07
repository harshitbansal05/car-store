// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./ImmutableOwner.sol";

contract Car is ImmutableOwner {
    uint256 public price;

    constructor(uint256 _price) ImmutableOwner(msg.sender) {
        price = _price;
    }

    function sell(address newOwner) external onlyOwner {
        owner = newOwner;
    }
}
