require('dotenv').config({})
const express = require('express')

const { provider } = require('./utils')
const { register } = require('./prom')

const app = express()

const port = process.env.PORT || 4000

app.get('/network', async (req, res) => {
  const network = await provider.getNetwork()

  return res.status(200).send({
    network: {
      name: network.name,
      chainId: network.chainId
    }
  })
})

app.get('/metrics/ousd_total_supply', async (req, res) => {
  const metrics = await register.getSingleMetricAsString('ousd_total_supply')
  return res.status(200).send(metrics)

//   return res.status(200).send(`# HELP ousd_total_supply ousd_total_supply
// # TYPE ousd_total_supply gauge
// ousd_total_supply 59063902
// ousd_total_supply 29063902 ${Date.now() - (60 * 60 * 1000)}`)
})

app.get('/metrics/:metric', async (req, res) => {
  const metrics = await register.getSingleMetricAsString(req.params.metric)
  return res.status(200).send(metrics)
})

app.listen(port, () => {
  console.log(`Exporter up at http://localhost:${port}`)
})
