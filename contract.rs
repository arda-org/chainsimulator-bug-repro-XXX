#![no_std]

use multiversx_sc::imports::*;

#[multiversx_sc::contract]
pub trait Contract {
    #[init]
    fn init(&self) {}

    #[payable("EGLD")]
    #[endpoint]
    fn issue_nft(&self, token_display_name: ManagedBuffer, token_ticker: ManagedBuffer) {
        let issue_cost = self.call_value().egld_value();
        self.nft_token().issue_and_set_all_roles(
            EsdtTokenType::NonFungible,
            issue_cost.clone_value(),
            token_display_name,
            token_ticker,
            0,
            None,
        );
    }

    #[view]
    fn get_token_id(&self) -> TokenIdentifier {
        self.nft_token().get_token_id()
    }

    #[storage_mapper("nft_token")]
    fn nft_token(&self) -> NonFungibleTokenMapper;
}
