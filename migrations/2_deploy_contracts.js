const TokenSwap = artifacts.require("TokenSwap");
const DemoToken = artifacts.require("DemoToken");

module.exports = async function(deployer) {
  // Deploy DemoToken smart contract on the blockchain
  await deployer.deploy(DemoToken);
  const token = await DemoToken.deployed();

  // Deploy the TokenSwap smart contract on the blockchain.
  await deployer.deploy(TokenSwap, token.address);
  const tokenSwap = await TokenSwap.deployed();

  // Transfer all the tokens to the exchange address
  await token.transfer(tokenSwap.address, "1000000000000000000000000");
};
