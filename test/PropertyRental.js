const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PropertyRental", function () {
  async function deployFixture() {
    const [landlord, tenant] = await ethers.getSigners();
    const PropertyRental = await ethers.getContractFactory("PropertyRental");
    const contract = await PropertyRental.deploy();
    await contract.waitForDeployment();
    return { contract, landlord, tenant };
  }

  it("lists a property", async function () {
    const { contract, landlord } = await deployFixture();

    await contract
      .connect(landlord)
      .listProperty(
        "City Apartment",
        "Delhi",
        "+91-9876543210",
        ethers.parseEther("1"),
        ethers.parseEther("0.5")
      );

    const property = await contract.properties(1);
    expect(property.landlord).to.equal(landlord.address);
    expect(property.contactNumber).to.equal("+91-9876543210");
    expect(property.isAvailable).to.equal(true);
  });

  it("rents a property with enough payment", async function () {
    const { contract, landlord, tenant } = await deployFixture();

    const rent = ethers.parseEther("1");
    const deposit = ethers.parseEther("0.5");

    await contract
      .connect(landlord)
      .listProperty("Studio", "Mumbai", "+91-9999999999", rent, deposit);

    await contract.connect(tenant).rentProperty(1, { value: rent + deposit });

    const property = await contract.properties(1);
    expect(property.tenant).to.equal(tenant.address);
    expect(property.isRented).to.equal(true);
  });
});
