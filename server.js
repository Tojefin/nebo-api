// import axios from 'axios';
import express from 'express'
import cors from 'cors'
import path from 'path';

const app = express()
app.use(cors({
  origin: '*'
}))
const port = 80

const key = process.env.key

app.get('/api/store', async (req, res) => {
// 	let data = await axios.get('https://easydonate.ru/api/v3/shop/products', {
// 		headers: {
// 			'Shop-key': key
// 		}
// 	}).then((res) => res.data)
	
// 	let editJson = []
// 	data.response.forEach((item) => {
// 		editJson.push({id: item.id, server_id: item.servers[0].id, name: item.name, price: item.price})
// 	})
	
// 	console.log(editJson)
//   res.json(editJson);
	res.json([]);
});

// ?customer=Tojefin&server_id=50111&products={"389102":1}
app.get('/api/payment', async (req, res) => {
// 	let {customer, server_id, products} = req.query
	
// 	let data = await axios.get(`https://easydonate.ru/api/v3/shop/payment/create?customer=${customer}&server_id=${server_id}&products=${products}`, {
// 		headers: {
// 			'Shop-key': key
// 		}
// 	}).then((res) => res.data)

//   res.json(data.response.url);
	res.json([]);
});

app.listen(port, () => {
  console.log('Server start')
})

export default app
