// backend/contracts/MarketplaceContract.rs
use near_sdk::{env, near_bindgen, AccountId, Balance, Promise};

#[near_bindgen]
#[derive(Default)]
pub struct Marketplace {
    pub items: Vec<ModelItem>,
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct ModelItem {
    pub id: String,
    pub name: String,
    pub description: String,
    pub price: Balance,
    pub seller: AccountId,
}

#[near_bindgen]
impl Marketplace {
    // Add model to the marketplace
    pub fn add_model(&mut self, id: String, name: String, description: String, price: Balance) {
        let seller = env::predecessor_account_id();
        let new_item = ModelItem {
            id,
            name,
            description,
            price,
            seller,
        };
        self.items.push(new_item);
    }

    // Purchase model from the marketplace
    #[payable]
    pub fn purchase_model(&mut self, id: String) {
        let buyer = env::predecessor_account_id();
        let deposit = env::attached_deposit();

        // Find the model
        let item_index = self.items.iter().position(|x| x.id == id).unwrap();
        let item = &self.items[item_index];

        assert!(deposit >= item.price, "Not enough NEAR attached to purchase");

        // Transfer the NEAR tokens to the seller
        Promise::new(item.seller.clone()).transfer(item.price);

        // Remove the item from the marketplace
        self.items.remove(item_index);

        env::log_str(&format!("{} bought {} for {} NEAR", buyer, item.name, item.price));
    }
}