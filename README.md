The callback of `issue_and_set_all_roles(...)` seems to never terminate and the caller to keep forever the storages:

```
{
  '43425f434c4f53555245b245ce8e108cbcd455737984c4525b63d72be33fde154c6d8b0c1079a729be9b': '0000001064656661756c745f69737375655f636200000002000000200100000001000000000000000000000000000000000000000000000000000001000000096e66745f746f6b656e',

  '454c524f4e44726f6c6565736474544f4b2d393633373361': '0a1145534454526f6c654e46544372656174650a0f45534454526f6c654e46544275726e0a1b45534454526f6c654e4654557064617465417474726962757465730a1145534454526f6c654e4654416464555249',

  '6e66745f746f6b656e': '70656e64696e67'
}
```

which when decoded from Hex give (the "..." indicates unreadable decoded strings):

```
{
  'CB_CLOSURE...': '...default_issue_cb...nft_token',

  'ELRONDroleesdtTOK-96373a': '...ESDTRoleNFTCreate...ESDTRoleNFTBurn...ESDTRoleNFTUpdateAttributes...ESDTRoleNFTAddURI',

  'nft_token': 'pending'
}
```

# How to reproduce

```bash
npm install

npm run build

npm run test
```
