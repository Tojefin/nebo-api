const express = require('express')
const axios = require('axios');

const app = express()
const port = 3000
const key = process.env.key

app.listen(port, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('API Nebo tg.skyedge.xyz')
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

// ?customer=Tojefin&server_id=50111&products={"389102":1}&coupon=1%
app.get('/api/payment', async (req, res) => {
	let {customer, server_id, products, coupon} = req.query
	
	let data = await axios.get(`https://easydonate.ru/api/v3/shop/payment/create?customer=${customer}&server_id=${server_id}&products=${products}&coupon=${coupon}`, {
		headers: {
			'Shop-key': key
		}
	}).then((res) => res.data)

  res.json(data.response.url);
});

// Export the Express API
module.exports = app
