    const first_contract = artifacts.require("first_contract");

contract("first_contract", accounts => {
    it("constuctor should set the message correctly", async () => {
        let instance = await first_contract.deployed();
        let number = await instance.getnumber();
        assert.equal(number, 10);
    })

    it("owner should be account[0]", async () =>{
        let instance = await first_contract.deployed();
        let owner = await instance.owner();
        assert.equal(owner, accounts[0]);
    })
})


