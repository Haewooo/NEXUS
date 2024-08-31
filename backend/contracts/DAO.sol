// contracts/DAO.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DAO {
    struct Proposal {
        uint id;
        string title;
        string description;
        address creator;
        uint votesFor;
        uint votesAgainst;
        bool approved;
    }
    
    mapping(uint => Proposal) public proposals;
    uint public proposalCount;
    
    function createProposal(string memory _title, string memory _description) public {
        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, _title, _description, msg.sender, 0, 0, false);
    }
    
    function vote(uint _id, bool _voteFor) public {
        Proposal storage proposal = proposals[_id];
        require(!proposal.approved, "Proposal already approved");
        
        if (_voteFor) {
            proposal.votesFor++;
        } else {
            proposal.votesAgainst++;
        }
        
        if (proposal.votesFor > 10) {
            proposal.approved = true;
        }
    }
}