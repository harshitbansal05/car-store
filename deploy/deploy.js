const hre = require("hardhat");
const { getChainId } = require("hardhat");

async function deploy({ getNamedAccounts, deployments }) {
  console.log("Running deploy script");
  console.log("Network id: ", await getChainId());

  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  let waitConfirmations = 0;
  if ((await getChainId()) !== "31337") waitConfirmations = 5;
  const carStore = await deploy("CarStore", {
    from: deployer,
    waitConfirmations,
  });

  console.log("CarStore deployed to:", carStore.address);

  if ((await getChainId()) !== "31337") {
    await hre.run("verify:verify", {
      address: carStore.address,
    });
  }
}

module.exports = deploy;
module.exports.tags = ["CarStore"];
