use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U64;
use near_sdk::{env, near_bindgen, AccountId};
use std::collections::HashMap;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct VotingContract {
    votes: HashMap<AccountId, bool>,
    result: Option<U64>,  
}

impl Default for VotingContract {
    fn default() -> Self {
        VotingContract {
            votes: HashMap::new(),
            result: None,
        }
    }
}

#[near_bindgen]
impl VotingContract {
    #[init]
    pub fn new() -> Self {
        Self::default()
    }

    pub fn vote(&mut self, vote_value: bool) {
        let account_id = env::predecessor_account_id();
        self.votes.insert(account_id, vote_value);

        self.result = Some(U64::from(env::block_timestamp()));
    }

    pub fn get_result(&self) -> Option<U64> {
        self.result
    }
}