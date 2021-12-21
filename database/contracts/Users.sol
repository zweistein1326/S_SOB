// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Users {

    uint public userCount = 0;

    struct Credential{
        uint id;
        uint issuerId;
        string key;
        string value;
    }

    struct User{
        uint id;
        string username;
        string email;
        string password;
    }

    event UserAdded(
        uint id,
        string username
    );

    constructor() public {
        addUser(1, 'zweistein1326','abc@abc.com', 'abc');
    }

    mapping(uint => User) public users;

    function addUser(uint _id,string memory _email,string memory _password,string memory _username) public {
        userCount++;
        users[userCount] = User(_id,_username, _email, _password);
        emit UserAdded(_id, _username);
    }
}