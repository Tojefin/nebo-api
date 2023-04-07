const express = require('express')
const fetch require('node-fetch');

const app = express()
const PORT = 4000

const key = process.env.key

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `)
})

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.get('/api/store', async (req, res) => {
	let data = await fetch('https://easydonate.ru/api/v3/shop/products', {
		headers: {
			'Shop-key': key
		}
	})
	let json = await data.json()
	let editJson = []
	json.response.forEach((item) => {
		editJson.push({id: item.id, server_id: item.servers[0].id, name: item.name, price: item.price})
	})
	
	console.log(editJson)
  res.json(editJson);
});

// ?customer=Tojefin&server_id=50111&products={"389102":1}
app.get('/api/payment', async (req, res) => {
	let {customer, server_id, products} = req.query
	let data = await fetch(`https://easydonate.ru/api/v3/shop/payment/create?customer=${customer}&server_id=${server_id}&products=${products}`, {
		headers: {
			'Shop-key': key
		}
	})
	console.log(data)
	let json = await data.json()
  res.json(json.response.url);
});



module.exports = app
