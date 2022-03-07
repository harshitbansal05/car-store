const { ethers } = require("hardhat");

function getCarFromTxResponse(txReceipt) {
  let car;
  txReceipt.events.forEach((event) => {
    if (event.event == "CarAdded") {
      car = event.args.car;
    }
  });
  return car;
}

async function interact() {
  const CarStoreFactory = await ethers.getContractFactory("CarStore");
  let carStore = await CarStoreFactory.deploy();
  carStore = await carStore.deployed();

  let txResponse = await carStore.addCar("50000");
  let txReceipt = await txResponse.wait(1);
  const car1 = getCarFromTxResponse(txReceipt);

  txResponse = await carStore.addCar("10000");
  txReceipt = await txResponse.wait(1);
  const car2 = getCarFromTxResponse(txReceipt);

  const price1 = await carStore.cars(car1);
  const price2 = await carStore.cars(car2);
  console.log(price1);
  console.log(price2);

  await carStore.sellCar(car1, "0x9CB46069EDA930Dc3862FFEeCC6ed0327C9eb777");
}

interact().then(
  () => console.log("Interaction complete"),
  (err) => console.log(err)
);
