const express=require('express');
const router= express.Router();
const {createUser}=require('../controller/user');


//Documentation for signup
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: create new user
 *     tags: [Auth]
 *     description: Sign up a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username for the new user
 *               password:
 *                 type: string
 *                 description: The password for the new user
 *               dateOfBirth:
 *                 type: string
 *                 description: Birthdate for user
 *               phoneNumber:
 *                 type: string
 *                 description: Phone Number of the user
 *               gender:
 *                  type: string
 *                  description: Gender sex for the user
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: The created user
 *                 token:
 *                   type: string
 *                   description: The JWT assigned to the user
 *       400:
 *         description: Bad request
 */



router.post('/',createUser);
router.get('/',(req,res)=>{
    res.send("This is signup page");
})
module.exports=router;