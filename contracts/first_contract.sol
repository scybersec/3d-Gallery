// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract first_contract {

    struct User{
        string name;
        string[5] urls;
        uint256 counter;
        bool creater;
    }

    mapping(address => User) public accounts;
    address public owner;

    function addString(string memory url_name) public{
        require(accounts[msg.sender].creater);
        uint256 count = accounts[msg.sender].counter;    
        if(count==5){
            count = 0;
        }
        accounts[msg.sender].urls[count] = url_name;
        count++;
        accounts[msg.sender].counter = count;
    }

    function getString(uint256 n) public view returns (string memory){
       require(accounts[msg.sender].creater);
       return accounts[msg.sender].urls[n];
    }
    function createAcount(string memory name) public {
        require(!accounts[msg.sender].creater);
        accounts[msg.sender].name = name;
        accounts[msg.sender].counter =0;
        accounts[msg.sender].creater = true;
    }
}