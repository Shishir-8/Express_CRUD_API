import express from 'express'
const router = express.Router();
import {userModel} from '../models/user.model.js';
import {body, validationResult} from 'express-validator'
import bcrypt from 'bcryptjs';



// Crud operations using thunderclient


//get method

router.get('/register', async (req, res)=>{
    const userRegister = await userModel.find();
    if(!userRegister){
        return res.json({
            message:"No contacts found",
            userRegister
        })
    }
    res.json({
        message:"Contact found",
        userRegister
    })

})

//get specific contact using dynamic value or id

router.get("/register/:id", async (req, res)=>{
    const id = req.params.id;

    const userContact = await userModel.findById(id);

     if(!userContact){
        return res.json({
            message:"No contacts found",
            userContact
        })
    }
    res.json({
        message:"Contact found",
        userContact
    })

    console.log(userContact)

})

// post method to register user in mongodb

router.post('/register', 

    // express validator to validate 

    body('fullName').trim().isLength({min:3}).withMessage("Username should be 3 characters long"),
    body("email").isEmail().trim().withMessage("Must be a valid email"),
    body("password").trim().isLength({min:4}).withMessage("Password must be 4 characters long"),
 
    async (req, res)=>{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        // extract fullname email passwrod from req body

    const{fullName, email, password, confirmPassword} = req.body


    // to check password match to confirm password or not 
    // if not match then program return with error msg and never go to next line
    if(password !== confirmPassword){
        return res.status(400).json({
            error:"Password doesn't match"
        })
    }

    // to check whether user already exists or not by using his email because email is unique 

    const existingUser = await userModel.findOne({email});
    if(existingUser){
        return res.status(400).json({
            errors:[
                {
                    msg:"Email already exists"
                }
            ]
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

   

    const createUser = await userModel.create({
        fullName,
        email,
        password:hashedPassword
       
    })
    console.log(createUser)
    res.json({message:"User registed succesfully", createUser})

})


// put or update method by using id of user 

router.put('/register/:id', async (req, res)=>{
    const id = req.params.id;

    const {fullName, email, password} = req.body;

    const updateContact = await userModel.findByIdAndUpdate(id, {
        fullName,
        email,
        password
    }, {new:true})

    if(!updateContact) {
        return res.status(400).json({
            errors:"No contact found"
        })
    }
    res.json({message:"Contact updated succesfully", updateContact})

})

// delete user 

router.delete('/register/:id', async (req, res)=>{
    const id = req.params.id;

    const deleteContact = await userModel.findByIdAndDelete(id);

    // if contact not exists then what to delete so we write this code 
    // if there is no contact it show contact not exits  if there is contact then it delete it 
    if(!deleteContact){
        return res.json({message:"Contact not exists"})
    }
    res.json("Contact deleted succesfully")
})



export default router




