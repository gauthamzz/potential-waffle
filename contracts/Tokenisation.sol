pragma solidity ^0.7.0;
import "hardhat/console.sol";

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract TSLAToken is ERC20 {

    constructor(uint256 initialSupply) public ERC20("Tesla", "TSLA") {
        _mint(msg.sender, initialSupply);
    }


}