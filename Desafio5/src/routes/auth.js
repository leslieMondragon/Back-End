import { Router } from "express";
import UserModel from "../dao/models/user.js";

const router = Router()

router.get('/login', (req, res)=>{
        res.render('login', {
            style: 'login.css'
        })
})

router.get('/register', (req, res)=>{
    res.render('register', {
        style: 'login.css'
    })
})


router.get('/logout', (req, res)=>{
    req.session.destroy(err => {
        if(!err) res.status(200).redirect('/login')
        else res.send({status:'Logout error', message: err})
    })
})

router.post('/login', async (req, res)=> {
    const {email, password} = req.body

    const user = await UserModel.findOne({email, password})
    
    if (!user) return res.status(401).send({status: 'error', message: 'Email o contraseña invalidos'})
    
    else {
        if (user.email==='adminCoder@coder.com' && user.password === 'adminCod3r123') {
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
        }
        req.session.admin = true
    }

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
    }
    }

    res.status(200).redirect('/api/products/view')
})

router.post('/register', async (req, res)=> {
    const { first_name, last_name, email, password, age } = req.body
    const exists = await UserModel.findOne({email})
    if (exists) return res.status(401).send({status: 'error', message: 'El usuario ya existe'})
    const user = {
        first_name,
        last_name,
        email,
        age,
        password
    }
    let result = await UserModel.create(user)
    res.status(200).redirect('login')

})

export default router