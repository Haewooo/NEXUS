// contracts/Voting.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./DAO.sol";

contract Voting {
    DAO public daoContract;

    struct Voter {
        bool hasVoted;
        bool vote;
    }

    mapping(uint => mapping(address => Voter)) public votes; // proposalId -> voterAddress -> Voter

    event Voted(uint proposalId, address voter, bool voteFor);

    constructor(address _daoAddress) {
        daoContract = DAO(_daoAddress);
    }

    // 투표 함수
    function voteOnProposal(uint _proposalId, bool _voteFor) public {
        require(!votes[_proposalId][msg.sender].hasVoted, "You have already voted on this proposal.");

        daoContract.vote(_proposalId, _voteFor);

        // 투표 기록 저장
        votes[_proposalId][msg.sender] = Voter({
            hasVoted: true,
            vote: _voteFor
        });

        emit Voted(_proposalId, msg.sender, _voteFor);
    }

    function getVoterStatus(uint _proposalId, address _voter) public view returns (bool hasVoted, bool vote) {
        Voter memory voter = votes[_proposalId][_voter];
        return (voter.hasVoted, voter.vote);
    }
}