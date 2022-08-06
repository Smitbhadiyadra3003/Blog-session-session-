const express =require('express');

const passport =require('passport');

const routes= express.Router();

const blogcontroller =require('../controllers/blog_controller');


routes.get('/',blogcontroller.login);

routes.get('/blog', passport.checkAuthentication, blogcontroller.blog);

routes.post('/insertdata',blogcontroller.insertdata);


routes.get('/viewdata',blogcontroller.viewdata);

routes.get('/deletedata/:id',blogcontroller.deletedata);

routes.get('/updatedata/:id',blogcontroller.updatedata);

routes.post('/loginpage',blogcontroller.loginpage);


routes.get('/checklogin',blogcontroller.checklogin);

routes.post('/logincheck', passport.authenticate('local',{failureRedirect:'/' ,failureFlash:true}),  blogcontroller.logincheck);


routes.get('/logout', passport.checkAuthentication, blogcontroller.logout);


routes.post('/editdata',blogcontroller.editdata);


module.exports=routes;      
