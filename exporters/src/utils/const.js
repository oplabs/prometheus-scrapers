
const tokenDecimals = {
  OUSD: 18,
  OGV: 18,
  DAI: 18,
  USDT: 6,
  USDC: 6,
  COMP: 18,
}

const addresses = {
  DAI: '0x6b175474e89094c44da98b954eedeac495271d0f',
  USDT: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  USDC: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  OUSD: '0x2a8e1e676ec238d8a992307b495b45b3feaa5e86',
  OGV: '0x9c354503c38481a7a7a51629142963f98ecc12d0',
  COMP: '0xc00e94cb662c3520282e6f5717214004a7f26888',

  Vault: '0xe75d77b1865ae93c7eaa3040b038d7aa7bc02f70',
  CompoundStrategy: '0x9c459eeb3fa179a40329b81c1635525e9a0ef094',
  ConvexStrategy: '0xea2ef2e2e5a749d4a66b41db9ad85a38aa264cb3',
  AaveStrategy: '0x5e3646a1db86993f73e6b74a57d8640b69f7e259',
  MorphoCompoundStrategy: '0x5a4eee58744d1430876d5ca93cab5ccb763c037d',
  OUSDMetaStrategy: '0x89eb88fedc50fc77ae8a18aad1ca0ac27f777a90',
}

module.exports = {
  addresses,
  tokenDecimals
}
