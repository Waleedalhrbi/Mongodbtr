import express from 'express'
import mongoose from 'mongoose';
import Atricle from './models/blog.js';
import dotenv from 'dotenv';

const app = express()
app.use(express.json()) 
dotenv.config();




// getting-started.js

const port = 9000
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('connect success')

  // use await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test'); if your database has auth enabled
}

app.get('/article', (req,res)=>{
    Atricle.find()
    .then(result => {
        res.send(result)
    })
})


app.get('/article', (req,res)=>{
    const article = new  Atricle({
        title: 'how to be good',
        body: 'this is my bloog',
        editor: 'John Doe',    
        isEmployee: true
    })
    article.save()
    .then((result)=>{
        res.send(result)
    })

})

app.post('/article', (req,res) =>{

    const dataAr = new  Atricle({
        title: req.body.title,
        body: req.body.body,
        editor: req.body.editor,
        isEmployee: req.body.isEmployee
    })
    dataAr.save()
    .then((result)=>{
        res.send(result)
    })
})

app.patch('/update/:id', (req,res)=>{
    const {id} = req.params
    Atricle.findByIdAndUpdate(id ,req.body,{new:true, runValidators:true})
    .then((result)=>{
        res.send(result)
    })
})

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    Atricle.deleteOne({ _id: id }) 
        .then((result) => {
            if (result.deletedCount === 0) {
                return res.status(404).send('Article not found'); 
            }
            res.send('deleted successfully');
        })
});

  app.get('/article/:id', (req, res) => {
     
    Atricle.findOne()
      .then(result => {
              res.send(result);  
      })

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})