'use strict';

require('dotenv').config();
const express = require('express');
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/searches', (req, res) => {
    res.render('pages/index');
});
app.get('*', (req, res) => res.status(404).send('This route does not exist'));
// const errorHandler = (err, res) => {
//     res.status(500).render('pages/error',{error: 'Uh Oh'});
//   };

function Book(data) {
    this.title = data.volumeInfo.title;
    this.author = data.volumeInfo.authors[0]  ;
    this.image_url = data.volumeInfo.imageLinks.thumbnail ;
    this.description = data.volumeInfo.description  ;
    this.type= data.volumeInfo.industryIdentifiers.type;
}

app.post('/searches', (req, res) => {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=';

    if (req.body.search === 'title') {
        url = url + req.body.text
    }
    else if (req.body.search === 'author') {
        url = url + req.body.text;
        // console.log(url)
    }
    superagent.get(url)
        .then(data => {
            
            let books = data.body.items;
            res.render('pages/show', { books: books })
            
        })
        // .catch(err => errorHandler(err, res));
    });




app.listen(PORT, () => console.log('Up on port', PORT));