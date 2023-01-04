const { BigNumber } = require('ethers')
const { contracts, addresses } = require('../utils/contracts')

function vaultUSDPriceMetric({
  client,
  register,
  assets, // ["USDC", "USDT", "DAI"]
}) {
  const mintPriceGuage = _createGuage({
    client,
    register,
    assets: assets || ["USDC", "USDT", "DAI"],
    mintPrice: true
  })

  const redeemPriceGuage = _createGuage({
    client,
    register,
    assets: assets || ["USDC", "USDT", "DAI"],
    mintPrice: false
  })

  return [mintPriceGuage, redeemPriceGuage]
}

const _createGuage = ({ client, register, assets, mintPrice }) => {
  const metricName = `ousd_usd_price_${mintPrice ? 'mint' : 'redeem'}`
  const vault = contracts.Vault

  return new client.Gauge({
    name: metricName,
    help: metricName,
    registers: [register],
    labelNames: ['asset'],
    async collect() {
      for (const asset of assets) {
        try {
          const assetAddress = addresses[asset]
          const price = mintPrice
                        ? await vault.priceUSDMint(assetAddress) 
                        : await vault.priceUSDRedeem(assetAddress)
          const priceScaled = price.div(
            BigNumber.from('10').pow(16)
          ).toNumber()
          this.set({ asset }, priceScaled / 100 )
        } catch (err) {
          console.error(`[${metricName}] Failed to fetch USD price from vault:`, err)
        }
      }
    },
  })
}

module.exports = { 
  vaultUSDPriceMetric 
}
