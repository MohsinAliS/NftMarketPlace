// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ThisisERC20 is ERC20, Ownable {
    constructor(address addr, uint256 _totalSupply) ERC20("my", "MT") {

         _mint(addr,_totalSupply);
    } 
}