import { expect, test } from "vitest";
import { FSWorld, e } from "xsuite";

const egldUnit = 10n ** 18n;

test("Issue a NFT token", async () => {
	using world = await FSWorld.start();

	const wallet = await world.createWallet({
		balance: egldUnit,
	});
	const contract = await world.createContract({
		code: "file:output/contract.wasm",
		codeMetadata: [],
	});

	await wallet.callContract({
		callee: contract,
		funcName: "issue_nft",
		funcArgs: [e.Str("TOKEN"), e.Str("TOK")],
		gasLimit: 100_000_000,
		value: (5n * egldUnit) / 100n, // https://docs.multiversx.com/tokens/nft-tokens/#issuance-of-non-fungible-tokens
	});
	await world.generateBlocks(10);

	expect(await contract.getAccountKvs()).toEqual({});
});
