// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

abstract contract ImmutableOwner {
    address public owner;
    
    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }    
}
