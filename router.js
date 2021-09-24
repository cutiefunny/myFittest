const CRUD= require("./CRUD");
const fs = require('fs');

exports.main = function(req,res) {

    fs.readdir(__dirname+'/images/', function(err,folderlist){
        var name = getPerson(folderlist);
        var folder = __dirname+'/images/'+name;
        fs.readdir(folder,function(err,filelist){
            CRUD.searchData("getTags","userInfo",name).then(tags=>{
                console.log(tags.tag);
                console.log(Object.keys(tags.tag).length);
                res.render('main', { title: 'my Fittest'
                    , filelist : filelist
                    , number : Math.floor(Math.random()*filelist.length)
                    , name : name
                    , tags : Object.keys(tags.tag).length>0 ? tags.tag : "no tags"
                });
            })
        })
    });
}

function getPerson(folderlist){
    var index = Math.floor(Math.random()*folderlist.length);
    return folderlist[index];
}