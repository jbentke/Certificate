pragma solidity ^0.5.0;

contract Certificate {
    ///@notice Owner of the contract
    address public owner;
    ///@notice Storage of the hashes mapped to an address
    mapping(address => bytes32[]) public documentHash;

    ///@notice Checks if the person calling is the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    ///@notice Simple constructor to set the initial owner
    constructor() public {
        owner = msg.sender;
    }

    ///@notice Change the owner of the contract
    ///@param _newOwner The address of the new owner
    function changeOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    ///@notice Adds the hash value to the array stored under the receivers address
    ///@param _receiver The address of the certificate holder
    ///@param _documentHash The hash of the document that is supposed to be stored
    function setHash(address _receiver, bytes32 _documentHash) public onlyOwner {
        documentHash[_receiver].push(_documentHash);
    }

    ///@notice Deletes a hash from the array and moves the last element to the position of the deleted element
    ///@param _receiver The holder of the document hash
    ///@param _documentHash The hash that is to be deleted
    function deleteHash(address _receiver, bytes32 _documentHash) public onlyOwner {
        for(uint i = 0; i < documentHash[_receiver].length; i++) {
            if(documentHash[_receiver][i] == _documentHash) {
                documentHash[_receiver][i] = documentHash[_receiver][documentHash[_receiver].length-1];
                delete documentHash[_receiver][documentHash[_receiver].length-1];
            }
        }
    }

    ///@notice Gets the hash of the given receiver
    ///@param _receiver The address of the certificate holder
    ///@return Returns a array of hashes that is stored under the receiver address
    function getHash(address _receiver) public view returns(bytes32[] memory) {
        return documentHash[_receiver];
    }

    ///@notice Checks if a given hash is in the array stored under the given address
    ///@param _receiver The address of the certificate holder
    ///@param _documentHash The hash of the document that is to be checked
    ///@return True if found else false
    function pruefen(address _receiver, bytes32 _documentHash) public view returns(bool) {
        for(uint i = 0; i < documentHash[_receiver].length; i++) {
            if(documentHash[_receiver][i] == _documentHash) {
                return true;
            }
        }
        return false;
    }
}