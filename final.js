var app = require('express');
var express = require('express')  
var app = express()
app.use(express.static('public'));
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');
var serviceAccount = require("./key.json");
initializeApp({
  credential: cert(serviceAccount)
});
const db = getFirestore();
app.set('view engine', 'ejs');
app.get('/signup', function (req, res) {
res.render('signup')
})
app.get("/signupsubmit", function (req, res) {  
   const her=req.query.branch;
  const sec=req.query.section;
  const xyz ={
    fullname:req.query.name
  }
    db.collection("data")
    .add({
       fullname:req.query.name,
       RegisteredNumber:req.query.regno,
       PhoneNumber:req.query.phn,
       Branch_And_Section: her+" "+sec,
       email:req.query.mail,
    })
    .then(( ) => {
       res.render("regsucces",{xyz});
    });
  });
  app.get('/signin', function (req, res) {
    res.render('signin')   
    });
    app.get("/signinsubmit", function (req, res) {       
      const mail = req.query.mail;
      const regno = req.query.regno;     
      db.collection('data')
      .where("email","==",mail)
      .where("RegisteredNumber","==",regno)
      .get()
      .then((docs) =>{
          if(docs.size >0){
              res.render('succes')
          }
          else{
              res.send('Error')
          }
      })
  
   });
  
app.listen(3000, function () {

console.log('Example app listening on port 3000!')

})