import { Router } from "express";
import passport from "passport";
import UserModel from "../dao/models/user.js";
import { createHash } from "../utils/bycriptPass.js";


const router = Router()

//Github
router.get('/github', passport.authenticate('github', {scope:['user:email']}))

router.get('/githubcallback', passport.authenticate('github', {failureRedirect:"/auth/login"}), async (req, res)=>{
    req.session.user = req.user
    res.redirect('/api/products/view')
})

//Default
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
        if(!err) res.status(200).redirect('/auth/login')
        else res.send({status:'Logout error', message: err})
    })
})

router.get('/faillogin', async (req, res)=>{
    res.status(400).json({error: 'failed login'})
})

router.get('/failregister', async (req, res)=>{
    console.log('failregister')
    res.status(400).json({error: 'failed register'})
})

router.post('/login',passport.authenticate('login', {failureRedirect: '/auth/faillogin'}) , async (req, res)=> {

    req.session.user = {
        name: `${req.user.first_name} ${req.user.last_name}`,
        email: req.user.email
    }

    res.status(200).redirect('/api/products/view')
})


router.post('/register', passport.authenticate('register', {failureRedirect: '/auth/failregister'}) ,async (req, res)=> {
    res.status(200).redirect('login')

})

router.post('/restorepass', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).send({status: 'error', message: 'El usuario no existe'})
  
    user.password = createHash(password)
    await user.save()

    res.status(200).json({status: 'success', message:'Contraseña actualizada correctamente'}).redirect('login');
  })


export default router