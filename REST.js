var mysql   = require("mysql");
var request = require('request');
var options = {
    method: 'GET',
    json:true
}

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}
var getDetailsUsingPlaceIds = function(data){

}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/suggestion/:name",function(req,res){
        var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+req.params.name+'&key=AIzaSyALDUZEwvk_dTywAtFh__rOAoCuWCj2AGo&callback=JSON_CALLBACK'
        
        request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
    res.json(JSON.parse(body));
  }
})
    });
    router.get("/local/:lat/:lng/:rd",function(req,res){
        var url = 'https://maps.googleapis.com/maps/api/place/radarsearch/json?location='+req.params.lat+','+req.params.lng+'&radius='+req.params.rd+'&rankby=distance&type=sublocality_level_2&key=AIzaSyALDUZEwvk_dTywAtFh__rOAoCuWCj2AGo'
        
        request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
    res.json(JSON.parse(body));
  }
})
    });
    router.get("/place/:id",function(req,res){
        var url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+req.params.id+'&key=AIzaSyALDUZEwvk_dTywAtFh__rOAoCuWCj2AGo'
        
        request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
    res.json(JSON.parse(body));
  }
})
    });

    router.get('/sublocalities/:lat/:lng',function(req,res){
        var url="https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+req.params.lat+","+req.params.lng+"&radius=8000&type=sublocality_level_2&key=AIzaSyBAH7bzfwKXOzMtduQFFBMQM43zxcViAyQ";
        request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Print the google web page.
    //res.json(body);
  }
})


    })
    router.post("/users/login",function(req,res){
        var query = "select count(id) as ct,id from user where username='"+req.body.username+"' and pwd='"+req.body.password+"'";
        console.log(query);
        var table = "[]"
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query2","Errormsg":err.toString()});
            } else {

                if(rows[0].ct==0){
                    var query = "select count(id) as ct from user where username='"+req.body.username+"'";
        console.log(query);
        var table = "[]"
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query2","Errormsg":err.toString()});
            } else if(rows[0].ct==0) {
                res.json({"Error" : false, "Message" : "Username InValid !","result":"false"});

            }
            else{
                res.json({"Error" : false, "Message" : "password InValid !","result":"false"});
            }
        })
                    
                }
                else{
                    res.json({"Error" : false, "Message" : "User Valid !","result":"true","user_id":rows[0].id});
                }
            }
        });
    });
    router.post("/user/:id/test",function(req,res){
        var query = "insert into test(user_id) values("+req.params.id+");"
        var table = [];
        console.log(query);
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err){
                res.json({"Error" : true, "Message" : "Error executing MySQL query","Errormsg":err.toString()});
            }
            else{
                res.json({"Error" : false, "Message" : "Your test has been started;","test_id":rows.insertId});
            }
        });

    });
    router.post("/user/:id/test/:id2/question/:id3/answer",function(req,res){
        var query = "insert into test_answer(test_id,option_id,question_id) values("+req.params.id2+","+req.body.option_id+","+req.params.id3+");"
        console.log(query);
        connection.query(query,function(err,rows){
            if(err){
                res.json({"Error" : true, "Message" : "Error executing MySQL query","Errormsg":err.toString()});
            }
            else{
                res.json({"Error" : false, "Message" : "Your answer has been recorded;","test_id":rows.insertId});
            }
        });

    });

    router.get("/question",function(req,res){
        var query = "SELECT * FROM question";
        var table = [];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query","Errormsg":err.toString()});
            } else {
                res.json({"Error" : false, "Message" : "Success", "questions" : rows});
            }
        });
    });
    router.get("/question/:id/option",function(req,res){
        var query = "select * from question_option where question_id="+req.params.id;
        var table = [];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "options" : rows});
            }
        });
    });
}

module.exports = REST_ROUTER;
