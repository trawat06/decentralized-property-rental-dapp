const fs = require("fs");
const path = require("path");
const hre = require("hardhat");

async function main() {
  const PropertyRental = await hre.ethers.getContractFactory("PropertyRental");
  const propertyRental = await PropertyRental.deploy();
  await propertyRental.waitForDeployment();

  const contractAddress = await propertyRental.getAddress();
  console.log(`PropertyRental deployed to: ${contractAddress}`);

  const artifact = await hre.artifacts.readArtifact("PropertyRental");
  const frontendConfigPath = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "blockchain",
    "contractConfig.js"
  );

  const configContent = `export const CONTRACT_ADDRESS = "${contractAddress}";

export const CONTRACT_ABI = ${JSON.stringify(artifact.abi, null, 2)};
`;

  fs.writeFileSync(frontendConfigPath, configContent);
  console.log("Frontend contract config updated successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
