/**
 * Created by Cem on 15.11.2014.
 */
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

var mongoose = require("mongoose");

var Product = mongoose.model('Product',{name:String});

app.get("/",function(req,res){
    Product.find(function(err,products){
        res.send(products);
    })
})

app.post("/save",function(req,res){
    var model = req.body.model;

    if(model._id){
        var _id = model._id;
        delete model._id;
        Product.update({_id:_id},model,function(err){
            res.send();
        })
    }
    else{
        var product = new Product({name:model.name});
        product.save(function(err){
            res.send();
        })
    }

});




app.listen(3000);