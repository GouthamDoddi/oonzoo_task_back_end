import express from 'express';
import db from '../config/db.js';
import { OPERATION_FAILED, OPERATION_SUCCESS } from './response.js';

import { ObjectId } from 'mongodb';

var productsRouter = express.Router();



/* GET home page. */
// productsRouter.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });



productsRouter.get('/', async(req, res) => {

  try {
          const products = db.collection('products');


          const result = await products.find().toArray()
          // logger.info(records)
  

          console.log('searching');

          console.log(`result = ${JSON.stringify(result)}`);

          return res.status(200).json(result);
      

  } catch (error) {
      console.log(`Error in getMessages: ${error}`);

      return res.status(500).json(OPERATION_FAILED('Internal server error', error));
  }

})




productsRouter.post('/update', async(req, res) => {

  try {
          const { _id, name, price} = req.body;

          console.log({ _id, name, price})
          const products = db.collection('products');

          
          const result = updateProduct(_id, name, price )

          console.log(`result = ${JSON.stringify(result)}`);

          return res.status(200).json(OPERATION_SUCCESS(`found ${result.length} results`, result));
      

  } catch (error) {
      console.log(`Error in getMessages: ${error}`);

      return res.status(500).json(OPERATION_FAILED('Internal server error', error));
  }

})



export const updateProduct = async (_id, name, price) => {
  const products = db.collection('products');
  const data = {
    name,
    price
  }

  const result = await products.updateOne({ '_id': new ObjectId(_id) }, { $set: data }, { upsert: true });

  return result;
};

productsRouter.post('/add', async(req, res) => {

  try {
          const {name, price, image} = req.body;
          const productData = {name, price, image};
          console.log(productData)
          const products = db.collection('products');


          const result = await products.insertOne(productData);

          console.log(`result = ${JSON.stringify(result)}`);

          return res.status(200).json(OPERATION_SUCCESS(`found ${result.length} results`, result));
      

  } catch (error) {
      console.log(`Error in getMessages: ${error}`);

      return res.status(500).json(OPERATION_FAILED('Internal server error', error));
  }

})


export default productsRouter;
