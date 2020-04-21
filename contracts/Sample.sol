pragma solidity ^0.6.1;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Sample is ERC20 {
  constructor() ERC20("FaucetSample", "FS") public {
    _setupDecimals(1);
    _mint(msg.sender, 10000000);
  }
}