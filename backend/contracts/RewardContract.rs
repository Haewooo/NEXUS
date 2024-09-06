// backend/contracts/RewardContract.rs
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, AccountId, Promise};
use std::collections::HashMap;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct RewardContract {
    pub reward_pool: u128, // 전체 보상 풀
    pub rewards: HashMap<AccountId, u128>, // 사용자별 보상 기록
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
    // NEAR를 보상으로 지급
    pub fn send_reward(&mut self, recipient: AccountId, amount: u128) -> Promise {
        assert!(self.reward_pool >= amount, "Not enough tokens in reward pool.");
        self.reward_pool -= amount;
        Promise::new(recipient).transfer(amount)
    }

        // 보상 풀에서 차감
        self.reward_pool -= amount;

        // 사용자별 보상 기록 업데이트
        let reward_balance = self.rewards.entry(recipient.clone()).or_insert(0);
        *reward_balance += amount;

        // NEAR 전송
        Promise::new(recipient).transfer(amount)
    }

    // 보상 풀에 자금 추가
    #[payable]
    pub fn add_funds(&mut self) {
        let deposit = env::attached_deposit();
        self.reward_pool += deposit;
    }

    // 현재 보상 풀 잔액 확인
    pub fn get_pool_balance(&self) -> u128 {
        self.reward_pool
    }

    // 특정 사용자의 보상 잔액을 확인
    pub fn get_user_reward_balance(&self, account_id: AccountId) -> u128 {
        *self.rewards.get(&account_id).unwrap_or(&0)
    }
