pragma solidity >=0.4.22 <0.9.0;

contract Contacts {
  uint public count = 0; // state variable
  
  struct Contact {
    uint id;
    string name;
    string picone;
    string pictwo;
    string picthree;
  }
  

  
  mapping(uint => Contact) public contacts;
  
  function createContact(string memory _name, string memory _picone, string memory _pictwo, string memory _picthree) public {
    count++;
    contacts[count] = Contact(count, _name, _picone, _pictwo, _picthree);
  }
}