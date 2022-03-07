# car-store

The contract for the car store is contracts/CarStore.sol. It creates new "Car" contracts for each car added to the store's inventory by the store owner. The store owner can also sell the cars to others, which updates the owner of the sold "Car" contract. The interactions with the car store are added in scripts/interact.js. These include some basic interactions like creating a store, adding cars to the inventory, and selling cars from the store. The interaction script can be run by using: `npx hardhat run scripts/interact.js`.

### Deploy the store

The package hardhat-deploy is used to deploy contracts. To deploy the CarStore contract, run `npx hardhat deploy --network <network_name>`. The configurations for the network also need to be specified in hardhat.config.js. 

### Running the tests

Tests basic assertions: 1) only store owner can add a car to the store inventory. 2) only store owner can sell a car from the store. 3) store owner cannot sell a car not owned by the store. To run the tests, use `npm test` or `npx hardhat test`.
