'use strict';

require('dotenv').config();
const express = require('express');
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({extended:true}));

app.set('view engine', 'ejs')

app.get('/hello', (req,res) => {
    res.render('pages/index');
  });


app.listen(PORT, () => console.log('Up on port', PORT));