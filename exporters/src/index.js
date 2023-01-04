require('dotenv').config({})
const express = require('express')

const { provider } = require('./utils/contracts')
const { register } = require('./utils/prometheus')

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

app.get('/metrics/all', async (req, res) => {
  const metrics = await register.metrics()
  return res.status(200).send(metrics)
})

app.get('/metrics/:metric', async (req, res) => {
  try {
    const metrics = await register.getSingleMetricAsString(req.params.metric)
    return res.status(200).send(metrics)
  } catch (err) {
    return res.status(404).end()
  }
})

app.listen(port, () => {
  console.log(`Exporter up at http://localhost:${port}`)
})
