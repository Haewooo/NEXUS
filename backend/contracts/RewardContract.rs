// backend/contracts/RewardContract.rs
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId, Promise};
use std::collections::HashMap;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct RewardContract {
    pub reward_pool: u128,
    pub rewards: HashMap<AccountId, u128>,
}

impl Default for RewardContract {
    fn default() -> Self {
        Self {
            reward_pool: 0,
            rewards: HashMap::new(),
        }
    }
}

#[near_bindgen]
impl RewardContract {
    pub fn send_reward(&mut self, recipient: AccountId, amount: u128) -> Promise {
        assert!(self.reward_pool >= amount, "Not enough tokens in reward pool.");
        self.reward_pool -= amount;
        Promise::new(recipient).transfer(amount)
    }

    pub fn add_funds(&mut self) {
        let deposit = env::attached_deposit();
        self.reward_pool += deposit;
    }

    pub fn get_pool_balance(&self) -> u128 {
        self.reward_pool
    }

    pub fn get_user_reward_balance(&self, account_id: AccountId) -> u128 {
        *self.rewards.get(&account_id).unwrap_or(&0)
    }
}