const express = require('express')
const axios = require('axios');

const app = express()
const PORT = 4000
const key = process.env.key

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('API key: '+key)
})

app.get('/api/store', async (req, res) => {
	let data = await axios.get('https://easydonate.ru/api/v3/shop/products', {
		headers: {
			'Shop-key': key
		}
	}).then((res) => res.data)
	
	let editJson = []
	data.response.forEach((item) => {
		editJson.push({id: item.id, server_id: item.servers[0].id, name: item.name, price: item.price})
	})
	
	console.log(editJson)
  res.json(editJson);
});

// Export the Express API
module.exports = app
