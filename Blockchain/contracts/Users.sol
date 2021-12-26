// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Users {

    uint public userCount = 0;

    struct User{
        uint globalId;
        string username;
        string password;
    }

    event UserAdded(
        uint id
    );

    constructor() public {
        addUser(1,'zweistein1326','abc');
    }

    function getUser(string memory _username, string memory _password) public view returns (bool) {
        uint i = 1;
        bool found = false;
        while(i<userCount || found!=false){
            if(keccak256(bytes(users[i].username)) == keccak256(bytes(_username)) && keccak256(bytes(users[i].password)) == keccak256(bytes(_password)) ){
                found = true;
            }
            i++;
        }
        return found;
    }

    mapping(uint => User) public users;

    function addUser( uint _id,string memory _username, string memory _password) public {
        userCount++;
        users[userCount] = User(_id,_username,_password);
        emit UserAdded(_id);
    }
}