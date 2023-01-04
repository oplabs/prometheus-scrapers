const client = require('prom-client')
const register = new client.Registry()
const { collectDefaultMetrics } = client

const { addresses } = require('./contracts')
const { strategyHoldingMetric, totalSupplyMetric, vaultUSDPriceMetric } = require('../collectors')

const ENABLED_METRICS = (process.env.ENABLED_METRICS || '').split(',')

function isMetricEnabled(key) {
  if (!ENABLED_METRICS?.length) return true
  return ENABLED_METRICS.includes(key)
}

if (isMetricEnabled('total_supply')) {
  totalSupplyMetric({
    contractAddress: addresses.OUSD,
    metricName: 'ousd_total_supply',
    client,
    register
  })
  
  totalSupplyMetric({
    contractAddress: addresses.OGV,
    metricName: 'ogv_total_supply',
    client,
    register
  })
}

if (isMetricEnabled('vault')) {
  vaultUSDPriceMetric({
    client,
    register
  })
  strategyHoldingMetric({
    contractAddress: addresses.Vault,
    metricName: 'ousd_holdings_vault',
    client,
    register,
    assets: ['USDC', 'USDT', 'DAI', 'COMP', 'OUSD']
  })
}

if (isMetricEnabled('strategies')) {
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
}

if (isMetricEnabled('morpho')) {
  strategyHoldingMetric({
    contractAddress: addresses.MorphoCompoundStrategy,
    metricName: 'ousd_holdings_morpho_strat',
    client,
    register,
    assets: ['USDC', 'USDT', 'DAI'],
    rewards: ['COMP'],
  })
}

if (isMetricEnabled('metastrategies')) {
  strategyHoldingMetric({
    contractAddress: addresses.OUSDMetaStrategy,
    metricName: 'ousd_holdings_ousd_meta_strat',
    client,
    register,
    assets: ['USDC', 'USDT', 'DAI'], // 'OUSD'
  })
}

module.exports = {
  client,
  register,
  collectDefaultMetrics
}
