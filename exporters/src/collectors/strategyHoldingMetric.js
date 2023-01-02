const { BigNumber } = require('ethers')
const { addresses, contracts, contractByAddress, tokenDecimals } = require('../utils')

function strategyHoldingMetric({
  contractAddress,
  metricName,
  client,
  register,
  assets, // ["USDC", "USDT", "DAI"]
  rewards,
}) {
  const stratContract = contractByAddress[contractAddress]

  const isVault = contractAddress === addresses.Vault

  if (!stratContract) {
    throw new Error(`[${metricName}] Unknown contract address: ${contractAddress}`)
  }

  const guage = new client.Gauge({
    name: metricName,
    help: metricName,
    registers: [register],
    labelNames: ['asset'],
    async collect() {
      for (const asset of [...assets, ...(rewards || [])]) {
        try {
          const decimals = tokenDecimals[asset] || 18
  
          let balance
          if (isVault || rewards?.includes(asset)) {
            // In case of vault/reward tokens, check token balance
            const assetContract = contracts[asset]
            balance = await assetContract.balanceOf(contractAddress)
          } else {
            // Backing tokens
            const assetAddress = addresses[asset]
            balance = await stratContract.checkBalance(assetAddress)
          }
  
          const balanceScaled = balance.div(BigNumber.from('10').pow(decimals))
  
          this.set({
            asset
          }, Number(balanceScaled.toString()))
        } catch (err) {
          console.error(`[${metricName}] Failed to fetch ${asset} balance:`, err)
        }
      }
    },
  })

  return guage
}

module.exports = { 
  strategyHoldingMetric 
}
