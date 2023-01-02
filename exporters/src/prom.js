const { BigNumber } = require('ethers')
const client = require('prom-client')
const register = new client.Registry()
const { collectDefaultMetrics } = client

const { contracts, addresses } = require('./utils')
const { strategyHoldingMetric } = require('./collectors/strategyHoldingMetric')

new client.Gauge({
  name: 'ousd_total_supply',
  help: 'ousd_total_supply',
  registers: [register],
  async collect() {
    const totalSupply = await contracts.OUSD.totalSupply()
    const totalSupplyScaled = totalSupply.div(BigNumber.from('10').pow(18))
    this.set(Number(totalSupplyScaled.toString()))
  }
})

strategyHoldingMetric({
  contractAddress: addresses.Vault,
  metricName: 'ousd_holdings_vault',
  client,
  register,
  assets: ['USDC', 'USDT', 'DAI', 'COMP', 'OUSD']
})

strategyHoldingMetric({
  contractAddress: addresses.CompoundStrategy,
  metricName: 'ousd_holdings_comp_strat',
  client,
  register,
  assets: ['USDC', 'USDT', 'DAI'],
  rewards: ['COMP'],
})

strategyHoldingMetric({
  contractAddress: addresses.AaveStrategy,
  metricName: 'ousd_holdings_aave_strat',
  client,
  register,
  assets: ['USDC', 'USDT', 'DAI']
})

strategyHoldingMetric({
  contractAddress: addresses.ConvexStrategy,
  metricName: 'ousd_holdings_convex_strat',
  client,
  register,
  assets: ['USDC', 'USDT', 'DAI']
})

strategyHoldingMetric({
  contractAddress: addresses.MorphoCompoundStrategy,
  metricName: 'ousd_holdings_morpho_strat',
  client,
  register,
  assets: ['USDC', 'USDT', 'DAI'],
  rewards: ['COMP'],
})

strategyHoldingMetric({
  contractAddress: addresses.OUSDMetaStrategy,
  metricName: 'ousd_holdings_ousd_meta_strat',
  client,
  register,
  assets: ['USDC', 'USDT', 'DAI'], // 'OUSD'
})

module.exports = {
  client,
  register,
  collectDefaultMetrics
}
