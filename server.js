var express = require('express');
var app = express();
var uploadDir ='public/cache';
var { IncomingForm } = require('formidable');

app.use(express.static(__dirname+"/public"))
app.post('/app/file-upload', async (req,res)=>{
    var responseBody = {};
    var postContent;
    var fileList = [];
    var formData = new IncomingForm({uploadDir: uploadDir})
    await new Promise((resolve, reject)=>{
        formData.parse(req, (err, fields, files)=>{
            console.log(fields,files)
            if(err){
                console.log(err);
                reject();
            }
        });
        formData.on('field',(field, value)=>{
            console.log(value);
            postContent = value
        })
        formData.on('file',(field, file)=>{
            console.log(file);
            fileList.push({type: file.type.replace(/\/.*/,""), url: file.path.replace('public','')})
        })
        formData.once('end',()=>{
            resolve();
        })
    })
    responseBody = {postContent: postContent, files: fileList};
    res.status(200).send(responseBody);
})

app.listen(3000,()=>{console.log("app listening at port 3000...")})
