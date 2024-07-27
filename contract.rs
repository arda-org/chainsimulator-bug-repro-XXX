#![no_std]

use multiversx_sc::imports::*;

#[multiversx_sc::contract]
pub trait Contract {
    #[init]
    fn init(&self) {}

    #[payable("EGLD")]
    #[endpoint]
    fn issue_nft(&self, token_display_name: ManagedBuffer, token_ticker: ManagedBuffer) {
        self.nft_token().issue_and_set_all_roles(
            EsdtTokenType::NonFungible,
            self.call_value().egld_value().clone_value(),
            token_display_name,
            token_ticker,
            0,
            None,
        );
    }

    #[storage_mapper("nft_token")]
    fn nft_token(&self) -> NonFungibleTokenMapper;
}
