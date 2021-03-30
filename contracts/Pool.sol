pragma solidity ^0.7.0;
import "hardhat/console.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
// import {Initializable} from "@openzeppelin/contracts/proxy/Initializable.sol";

contract Pool is ERC20 {
    using SafeERC20 for IERC20;

    // TODO: add _zTokenAddress
    address internal _zTokenAddress;

    constructor(
        string memory name,
        string memory symbol,
        address zTokenAddress
    ) public ERC20(name, symbol) {
        uint256 chainId;

        //solium-disable-next-line
        assembly {
            chainId := chainid()
        }
        _zTokenAddress = zTokenAddress;
		console.log("deploy pool of " ,name , "at" , zTokenAddress);
    }

    function deposit(address asset, uint256 amount) external {
		console.log("deposit transferFrom");
        IERC20(asset).transferFrom(msg.sender, _zTokenAddress, amount);
		console.log("deposit mint ztokens");
        _mint(msg.sender, amount);
    }

    function withdraw(address asset, uint256 amount)
        external
        returns (uint256)
    {
		console.log("wtihdraw");
        uint256 userBalance = IERC20(_zTokenAddress).balanceOf(msg.sender);

        uint256 amountToWithdraw = amount;

        if (amount == type(uint256).max) {
            amountToWithdraw = userBalance;
        }
		console.log("burn tokens");
		_burn(msg.sender, amountToWithdraw);
		console.log("tranfer");
		IERC20(asset).transferFrom(_zTokenAddress, msg.sender, amountToWithdraw);
    }
}
