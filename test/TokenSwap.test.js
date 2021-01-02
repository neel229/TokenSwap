const { assert } = require("chai");

const Token = artifacts.require("DemoToken");
const TokenSwap = artifacts.require("TokenSwap");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("TokenSwap", ([deployer, investor]) => {
  let token, tokenSwap;
  before(async () => {
    token = await Token.new();
    tokenSwap = await TokenSwap.new(token.address);
    await token.transfer(tokenSwap.address, tokens("1000000"));
  });

  describe("Token deployment", async () => {
    it("contract has a name", async () => {
      const name = await token.name();
      assert.equal(name, "DemoToken");
    });
  });

  describe("TokenSwap deployment", async () => {
    it("contract has a name", async () => {
      const name = await tokenSwap.name();
      assert.equal(name, "TokenSwap Token Exchange");
    });
  });

  it("contract has tokens", async () => {
    let balance = await token.balanceOf(tokenSwap.address);
    assert.equal(balance.toString(), tokens("1000000"));
  });

  describe("buy tokens", async () => {
    let result;
    before(async () => {
      result = await tokenSwap.buyTokens({
        from: investor,
        value: tokens("1")
      });
    });
    it("allows users to purchase token for a fixed price", async () => {
      let investorBalance = await token.balanceOf(investor);
      assert.equal(investorBalance.toString(), tokens("100"));

      let tokenSwapBalance = await token.balanceOf(tokenSwap.address);
      assert.equal(tokenSwapBalance.toString(), tokens("999900"));
      tokenSwapBalance = await web3.eth.getBalance(tokenSwap.address);
      assert.equal(tokenSwapBalance.toString(), tokens("1"));
    });
  });
});
