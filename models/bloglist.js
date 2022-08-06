

const mongoose = require('mongoose');


const multer = require('multer');

const path =require('path');

const avatar_path =path.join('/avatars/img');



 const blogSchema= mongoose.Schema({

    b_title:{
        type:String,
        require:true
    },

    blog:{
        type:String,
        require:true
    },

    blogger_name:{

        type:String,
        require:true
    },

    blog_type:{

        type:String,
        require:true

    },

    Date:{

        type:String,
        require:true
    },

    e_mail:{
        type:String,
        require:true

    },

    password:{


        type:String,
        require:true
    },

    c_password:{


        type:String,
        require:true
    },

    avatar:{
    
        type:String
    }



 });

 var storage =multer.diskStorage({

    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'..',avatar_path))
    },
    filename:function(req,file,cb){
        var filename = file.fieldname +'-'+Date.now()

        file.dest = avatar_path + '/' +filename
        cb(null,filename);      
    }

 })

 blogSchema.statics.uploadavatar= multer({storage:storage}).single('avatar');
 blogSchema.statics.avatarpath= avatar_path;

 const Blog= mongoose.model('Blog',blogSchema);

 module.exports=Blog;


