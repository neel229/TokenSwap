pragma solidity >=0.5.0 <0.8.0;

import "./Token.sol";

contract TokenSwap {
  string public name = "TokenSwap Token Exchange";
  DemoToken public token;
  uint public rate = 100;
  
  constructor(DemoToken _token) public {
    token = _token; 
  }

  function buyTokens() public payable {
    // Calculate the number of tokens to be transferred.
    uint tokenAmount = msg.value * rate;  
    token.transfer(msg.sender, tokenAmount);
    // Trigger an event that says token were purchased.

  }
}
