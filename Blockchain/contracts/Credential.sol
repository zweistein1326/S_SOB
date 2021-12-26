pragma solidity >=0.4.22 <0.9.0;

contract Credentials{
    
    struct Credential{
        uint id;
        uint issuerId;
        string key;
        string value;
        // string[] allowedUsers;
    }

    mapping(uint=>Credential) credentials;

    function addCredential (uint _issuerId) public{
        credentials[0]= Credential(0,_issuerId,'dc','null');
    }

}