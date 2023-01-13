import express from 'express';
import db from '../config/db.js';
import { OPERATION_FAILED, OPERATION_SUCCESS } from './response.js';

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/logIn', async(req, res) => {
  try {
    const {email} = req.body;
    const {pass} = req.body;
    // console.log(userData)

    // const userData = {email, pass}

    console.log({email, pass})
    const users = db.collection('users');


    let result = await users.findOne({ email, pass });

    console.log(`result = ${JSON.stringify(result)}`);

    console.log(result['admin']);

    if (result){
      if (result.admin == "true"){
        return res.status(202).json(OPERATION_SUCCESS(`User exists`, result));

      } else {
        return res.status(200).json(OPERATION_SUCCESS(`User exists`, result));

      }

    }
    return res.status(400).json(OPERATION_FAILED("user doesn't exist", result ))



  } catch (error) {
  console.log(`Error in getMessages: ${error}`);

  return res.status(500).json(OPERATION_FAILED('Internal server error', error));
  }
})

router.post('/add', async(req, res) => {

  try {
          const userData = req.body;

          console.log(userData)

          if (!userData.email || !userData.pass) {
            return res.status(400).json(OPERATION_FAILED("no user data exist", result ))

          }
          const products = db.collection('users');




          const result = await products.insertOne(userData);

          console.log(`result = ${JSON.stringify(result)}`);

          return res.status(200).json(OPERATION_SUCCESS(`found ${result.length} results`, result));
      

  } catch (error) {
      console.log(`Error in getMessages: ${error}`);

      return res.status(500).json(OPERATION_FAILED('Internal server error', error));
  }

})

export default router;
