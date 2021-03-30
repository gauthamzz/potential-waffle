const { expect } = require("chai");

describe("Token contract", function () {
  let Token;
  let tslaToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("TSLAToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    tslaToken = await Token.deploy(1000);

    Pool = await ethers.getContractFactory("Pool");
    pool = await Pool.deploy("zeta TSLA", "zTSLA", await tslaToken.address)
  });

  describe("Deployment", function () {
    it("Should set the right total supply", async () => {
      expect(await tslaToken.totalSupply()).to.equal(1000);
    });
	it("Should set the right balance for owner", async () => {
		expect(await tslaToken.balanceOf(owner.address)).to.equal(1000)
	})

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await tslaToken.balanceOf(owner.address);
      expect(await tslaToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should deposit token and get ztoken", async function () {
      await tslaToken.approve(pool.address, 100);
      await pool.deposit(tslaToken.address, 100);
	  	expect(await tslaToken.balanceOf(owner.address)).to.equal(900)
      console.log("z token balance is ",(await pool.balanceOf(owner.address)).toNumber())
      expect(await pool.balanceOf(owner.address), 100);
      });

      it("Should withdraw ztoken and get token", async function () {
        await tslaToken.approve(pool.address, 100);
        await pool.deposit(tslaToken.address, 100);
        expect(await tslaToken.balanceOf(owner.address)).to.equal(900)
        expect(await pool.balanceOf(owner.address), 100);

        // await pool.approve(tslaToken.address, 100);
        await pool.withdraw(tslaToken.address, 100);
        expect(await tslaToken.balanceOf(owner.address)).to.equal(1000);
        expect(await pool.balanceOf(owner.address), 0);



        });
  });
});
