const { assert } = require("chai");

const Token = artifacts.require("DemoToken");
const TokenSwap = artifacts.require("TokenSwap");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("TokenSwap", accounts => {
  describe("Token deployment", async () => {
    it("contract has a name", async () => {
      let token = await Token.new();
      const name = await token.name();
      assert.equal(name, "DemoToken");
    });
  });

  describe("TokenSwap deployment", async () => {
    it("contract has a name", async () => {
      let tokenSwap = await TokenSwap.new();
      const name = await tokenSwap.name();
      assert.equal(name, "TokenSwap Token Exchange");
    });
  });

  it("contract has tokens", async () => {
    let token = await Token.new();
    let tokenSwap = await TokenSwap.new();
    await token.transfer(tokenSwap.address, "1000000000000000000000000");
    let balance = await token.balanceOf(tokenSwap.address);
    assert.equal(balance.toString(), "1000000000000000000000000");
  });
});
