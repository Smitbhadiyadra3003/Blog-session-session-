const Blog = require('../models/bloglist');

const path = require('path');
const fs = require('fs');



module.exports.blog = function (req, res) {

//    if(!req.cookies.userrecord){
//       return res.redirect('back');
//    }

    res.render('blog');
}

module.exports.login = function (req, res) {

     res.render('login');
}

module.exports.checklogin = function (req, res) {

   res.render('checklogin');
}




module.exports.insertdata = function (req, res) {



    Blog.uploadavatar(req, res, function (err) {

        if (err) {

            console.log(err);
            return false;
        }

        if (req.file) {
            console.log(req.file);


            Blog.create({
                avatar: req.file.dest,
                b_title: req.body.b_title,
                blog: req.body.blog,
                blog_type: req.body.blog_type,
                Date: req.body.Date,
                blogger_name: req.body.blogger_name

            }, function (err, data) {

                if (err) {

                    console.log("data not inserted");
                    return false;
                }

                return res.redirect('/viewdata');

            });
        }
    })



}



module.exports.viewdata = function (req, res) {

    Blog.find({}, function (err, record) {

        if (err) {

            console.log("data not inserted");
            return false;
        }
        return res.render('views', {

            'record': record

        })


    })
}


module.exports.deletedata =  async function (req, res) {

try{
    var id = req.params.id;
    var record = await Blog.findById(id);

    if (record.avatar) {

        fs.unlinkSync(path.join(__dirname, '..', record.avatar))

        try {

            let record = Blog.findByIdAndDelete(id);

            return res.redirect('/viewdata');
        }
        catch (err) {
            console.log("error", error);
            return;
        }
        
    }
    else {
        
        fs.unlinkSync(path.join(__dirname,'..' ,record.avatar))
        
        Blog.findByIdAndDelete(id, function (err, record) {
            
            if (err) {
                
                console.log("data  not delete");
                return false;
            }
            
            return res.redirect('/viewdata');
        })
    }
}
    catch(err) {
    console.log("error", error);
    return;
}


}


module.exports.updatedata =  async function (req, res) {

    var id = req.params.id;

    Blog.findById(id, function (err, data) {
        if (err) {


            console.log("went to wrong");
            return false;
        }

        return res.render('update_blog', {
           
            'single': data


        });

    });

}



module.exports.editdata = function (req, res) {
    console.log(req.body);


    Blog.uploadavatar(req, res, function (err) {

        if (err) {
            console.log(err);
            return false;
        }

        if (req.file) {

            Blog.findById(req.body.blog_id, function (err, record) {

                if (err) {

                    console.log('data not updated ');
                    return false;
                }

                // old image delteted

                if (record.avatar) {
                    fs.unlinkSync(path.join(__dirname, '..', record.avatar))
                }

                //new image  add  
                if (req.file) {


                    Blog.findByIdAndUpdate(req.body.blog_id, {

                        avatar: req.file.dest,
                        b_title: req.body.b_title,
                        blog: req.body.blog,
                        blog_type: req.body.blog_type,
                        Date: req.body.Date,
                        blogger_name: req.body.blogger_name


                    }, function (err, data) {
                        if (err) {
                            console.log(err);
                            return false;
                        }

                        return res.redirect('/');

                    })
                }
            })
        }
    })


}


module.exports.loginpage = function (req, res) {

    Blog.create({
        e_mail: req.body.e_mail,
        password: req.body.password,
        c_password: req.body.c_password

    }, function (err, data) {

        if (err) {

            console.log("data not inserted");
            return false;
        }

        return res.redirect('/checklogin');

    });



}


module.exports.logincheck =  function (req, res) {


     req.flash('success','Login successfully');
    // console.log(req.body.e_mail);    
    // Blog.findOne({ 'e_mail': req.body.e_mail }, function (err, record) {

    //     if (err) {

    //         console.log("record not found");
    //     }

    //     if (record) {

    //         if (record.password == req.body.password) {

    //             res.cookie('userrecord', record);

    //             return res.redirect('/blog');
    //         }

    //         else {
    //             return res.redirect('/');
    //         }
    //     }

    //     else {
    //         return res.redirect('/');


    //     }
    // })
    return res.redirect('/blog');
}



module.exports.logout = function (req, res) {
    
    req.logout(function(err){
        
        if(err){
            
            console.log(err);
            return false;
        }
        req.flash('success','logout successfully');
        
        return res.redirect('/');
    });


}