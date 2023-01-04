const { ethers, BigNumber } = require('ethers')

const { ALCHEMY_API_KEY } = process.env

const { addresses, tokenDecimals } = require('./const')

const provider = new ethers.providers.AlchemyProvider(
  1,
  ALCHEMY_API_KEY
)

const tokenABI = [
  'function totalSupply() external view returns (uint256)',
  'function balanceOf(address _account) external view returns (uint256)',
]

const vaultABI = [
  'function priceUSDMint(address asset) external view returns (uint256)',
  'function priceUSDRedeem(address asset) external view returns (uint256)',
]

const stratABI = [
  'function checkBalance(address asset) external view returns (uint256)'
]

const contracts = {
  DAI: null,
  USDT: null,
  USDC: null,

  OUSD: null,
  OGV: null,

  COMP: null,

  Vault: null,
  CompoundStrategy: null,
  ConvexStrategy: null,
  AaveStrategy: null,
  MorphoCompoundStrategy: null,
  OUSDMetaStrategy: null,
}

const contractByAddress = {}

// Vault
const vault = new ethers.Contract(
  addresses.Vault,
  vaultABI,
  provider
)
contracts.Vault = vault
contractByAddress[addresses.Vault] = vault

// Token Contracts
for (const token of ["OUSD", "OGV", "USDT", "USDC", "DAI", "COMP"]) {
  const address = addresses[token]

  if (!address) {
    console.warn(`Unknown contract: ${token}`)
    continue
  }

  const contract = new ethers.Contract(
    address,
    tokenABI,
    provider
  )

  contracts[token] = contract
  contractByAddress[address] = contract
}

// Strategies
for (const strat of ["CompoundStrategy", "ConvexStrategy", "AaveStrategy", "MorphoCompoundStrategy", "OUSDMetaStrategy"]) {
  const address = addresses[strat]

  if (!address) {
    console.warn(`Unknown contract: ${strat}`)
    continue
  }

  const contract = new ethers.Contract(
    address,
    stratABI,
    provider
  )

  contracts[strat] = contract
  contractByAddress[address] = contract
}

function getSymbolByAddress(address) {
  // TODO: Memoize this function
  const symbol = Object.keys(addresses).find(symbol => addresses[symbol].toLowerCase() === address.toLowerCase())
  return symbol
}

function convertToNumber(value, tokenAddressOrSymbol) {
  const symbol = tokenAddressOrSymbol.startsWith('0x') ? getSymbolByAddress(tokenAddressOrSymbol) : tokenAddressOrSymbol
  const decimals = tokenDecimals[symbol] || 18

  const scaledValue = BigNumber.from(value).div(
    BigNumber.from('10').pow(decimals)
  )

  return scaledValue.toNumber()
}

module.exports = {
  provider,
  addresses,

  contractByAddress,
  contracts,
  tokenDecimals,

  getSymbolByAddress,
  convertToNumber
}
