import { test } from "vitest";
import { FSWorld, e } from "xsuite";

const egldUnit = 10n ** 18n;
const tokenName = "TOKEN";
const tokenTicker = "TOK";

test("Test: Issue a NFT token and get its token identifier", async () => {
	using world = await FSWorld.start();

	const wallet = await world.createWallet({
		balance: 5n * egldUnit,
	});
	const contract = await world.createContract({
		code: "file:output/contract.wasm",
		codeMetadata: [],
	});

	await wallet.callContract({
		callee: contract,
		funcName: "issue_nft",
		funcArgs: [e.Str(tokenName), e.Str(tokenTicker)],
		gasLimit: 100_000_000,
		value: (5n * egldUnit) / 100n, // https://docs.multiversx.com/tokens/nft-tokens/#issuance-of-non-fungible-tokens
	});

	await world.generateBlocks(10);

	await wallet
		.callContract({
			callee: contract,
			funcName: "get_token_id",
			gasLimit: 10_000_000,
		})
		.assertFail({ code: "signalError", message: "Invalid token ID" });

	console.log(await contract.getAccountKvs());
});
