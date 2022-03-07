const chai = require("chai");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { solidity } = require("ethereum-waffle");

chai.use(solidity);

describe("CarStore", async function () {
  let carStore, carStoreWallet;
  let _, wallet, accounts;

  function getCarFromTxReceipt(txReceipt) {
    let carAddress, carPrice;
    txReceipt.events.forEach((event) => {
      if (event.event == "CarAdded") {
        carAddress = event.args.car;
        carPrice = event.args.price;
      }
    });
    return { carAddress, carPrice };
  }

  before(async function () {
    accounts = await ethers.getSigners();
    _ = accounts[0].address;
    wallet = accounts[1].address;
  });

  beforeEach(async function () {
    const CarStoreFactory = await ethers.getContractFactory("CarStore");
    carStore = await CarStoreFactory.deploy();
    carStore = await carStore.deployed();
    const CarStoreFactoryWallet = await ethers.getContractFactory(
      "CarStore",
      accounts[1]
    );
    carStoreWallet = CarStoreFactoryWallet.attach(carStore.address);
  });

  it("owner can add car", async function () {
    const txResponse = await carStore.addCar("50000");
    const txReceipt = await txResponse.wait(1);
    const { carAddress, carPrice } = getCarFromTxReceipt(txReceipt);
    expect(carPrice.toNumber()).to.be.equal(50000);

    const car = await ethers.getContractAt("Car", carAddress);
    expect(await car.owner()).to.be.equal(carStore.address);
  });

  it("non-owner cannot add car", async function () {
    await expect(carStoreWallet.addCar("50000")).to.be.reverted;
  });

  it("owner can sell existing car", async function () {
    let txResponse = await carStore.addCar("50000");
    let txReceipt = await txResponse.wait(1);
    const { carAddress } = getCarFromTxReceipt(txReceipt);

    txResponse = await carStore.sellCar(carAddress, wallet);
    await txResponse.wait(1);

    const car = await ethers.getContractAt("Car", carAddress);
    expect(await car.owner()).to.be.equal(wallet);
  });

  it("owner cannot sell non-existing car", async function () {
    let txResponse = await carStore.addCar("50000");
    let txReceipt = await txResponse.wait(1);
    const { carAddress } = getCarFromTxReceipt(txReceipt);

    txResponse = await carStore.sellCar(carAddress, wallet);
    await txResponse.wait(1);

    await expect(carStore.sellCar(carAddress, wallet)).to.be.reverted;
  });

  it("non-owner cannot sell car", async function () {
    await expect(carStoreWallet.sellCar(wallet, wallet)).to.be.reverted;
  });
});
