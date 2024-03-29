async function main() {

	const [deployer] = await ethers.getSigners();
  
	console.log(
	  "Deploying contracts with the account:",
	  deployer.address
	);
	
	console.log("Account balance:", (await deployer.getBalance()).toString());
  
	const Token = await ethers.getContractFactory("Token");
	const token = await Token.deploy();
  
	console.log("Token address:", token.address);
	balance  = await token.balanceOf(deployer.address)
	console.log("Balance for owner is ", balance.toNumber())
  }
  
  main()
	.then(() => process.exit(0))
	.catch(error => {
	  console.error(error);
	  process.exit(1);
	});