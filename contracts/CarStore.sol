// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "./Car.sol";
import "./ImmutableOwner.sol";

contract CarStore is ImmutableOwner {
    mapping(address => uint256) public cars;

    constructor() ImmutableOwner(msg.sender) {}

    event CarAdded(address car, uint256 price);
    event CarSold(address indexed car, address indexed newOwner);

    function addCar(uint256 price) external onlyOwner {
        require(price > 0);
        Car newCar = new Car(price);
        cars[address(newCar)] = price;
        emit CarAdded(address(newCar), price);
    }

    function sellCar(address car, address newOwner) external onlyOwner {
        require(cars[car] > 0);
        (bool success, bytes memory returnData) = car.staticcall(abi.encodePacked(this.owner.selector));
        require(success);
        address carOwner = abi.decode(returnData, (address));
        require(address(this) == carOwner);
        (success, ) = car.call(abi.encodeWithSelector(Car.sell.selector, (newOwner)));  
        require(success);      
        emit CarSold(car, newOwner);
    }
}
