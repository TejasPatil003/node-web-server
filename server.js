const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.SET || 1841;
var app = express();
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) => {
  return text.toUpperCase();
})
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));

//app.use((req,res,next) => {
//   res.render('maintenance.hbs')
// });

app.use((req,res,next) => {
  var time = new Date().toString();
  var log=`${time} ${req.method} ${req.originalUrl}`;
  fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log('Unable to append File server.log');
    }
  })
  console.log(``);
  next();
});

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMsg:'Welcome to my Website!',
    //currentYear:new Date().getFullYear()
  })
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle:'About Page',
    welcomeMsg:'This is About Page!',
    currentYear:new Date().getFullYear()
  });

});

app.get('/bad',(req,res) => {
  res.send('Bad request recieved!')
});



app.listen(port,() => {
  console.log(`Server is up on ${port} !`);
});
