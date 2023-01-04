const { contractByAddress, convertToNumber, getSymbolByAddress } = require('../utils/contracts')

function totalSupplyMetric({
  contractAddress,
  metricName,
  client,
  register,
}) {
  const tokenContract = contractByAddress[contractAddress]
  const tokenSymbol = getSymbolByAddress(contractAddress)

  if (!tokenContract) {
    throw new Error(`[${metricName}] Unknown contract address: ${contractAddress}`)
  }

  const guage = new client.Gauge({
    name: metricName,
    help: metricName,
    registers: [register],
    async collect() {
      try {
        const totalSupply = await tokenContract.totalSupply()

        this.set(convertToNumber(totalSupply, tokenSymbol))
      } catch (err) {
        console.error(`[${metricName}] Failed to fetch ${tokenSymbol || contractAddress} total supply:`, err)
      }
    },
  })

  return guage
}

module.exports = { 
  totalSupplyMetric 
}
