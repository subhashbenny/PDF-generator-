const express = require('express');
const pdf = require('html-pdf');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const pdfTemplate = require('./documents/index');
app.post('/create-pdf',(req,res)=>{
    pdf.create(pdfTemplate(req.body),{}).toFile('download.pdf', (err)=>{
        if(err){
            return console.log(err);
        }
        res.send(Promise.resolve())
    })
});
app.get('/fetch-pdf',(req,res) =>{
    res.sendFile(`${__dirname}/download.pdf`)
});
app.listen(port, () => console.log(`Listening on port ${port}`));