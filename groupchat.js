const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'git_starter')));
app.use(express.static('C:\Users\Nikhil\Desktop\sharpener\git_starter'));


app.get('/login', (req, res) => {
    //res.sendFile('C:\Users\Nikhil\Desktop\sharpener\git_starter\login.html');
    res.sendFile(__dirname+'/login.html');  
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    res.cookie('username', username, { maxAge: 900000, httpOnly: true });
    res.redirect('/');
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');  

  });

  app.use('/message', (req, res) => {
    const { message } = req.body;
    //const username = req.cookies.username;
    
      fs.appendFileSync('messages.txt', ` ${message}\n`);
      res.send(message);

      res.redirect('/');
     
  });

  app.get('/message', (req, res) => {
    const messages = fs.readFileSync('messages.txt', 'utf8');
    res.send(messages);
  });
  // Express routes
app.get('/contactus', (req, res) => {
    res.sendFile(__dirname + '/contactus.html');
});

app.post('/contactus', (req, res) => {
    // Process form submission (save name and email)
    // Redirect to success page
    res.redirect('/success');
});

app.get('/success', (req, res) => {
    res.send('Form successfully filled');
});
app.use((req, res) => {
    res.status(404).render('404');
  });




  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });