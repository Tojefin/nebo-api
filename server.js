import fetch from 'node-fetch';
import express from 'express'
import cors from 'cors'
import path from 'path';

const app = express()
app.use(cors({
  origin: '*'
}))
const port = 80

const key = process.env['key']

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

app.listen(port, () => {
  console.log('Server start')
})

module.exports = app;
