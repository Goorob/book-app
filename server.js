'use strict';

require('dotenv').config();
const express = require('express');
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;
const app = express();
const pg = require('pg');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.post('/add', addBook);

app.get('/', getBook);


app.get('/searches', (req, res) => {
    res.render('pages/index');
});

app.get('/selectFor', showForm)

app.get('*', (req, res) => res.status(404).send('This route does not exist'));
// const errorHandler = (err, res) => {
//     res.status(500).render('pages/error',{error: 'Uh Oh'});
//   };

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));


function Book(data) {
    this.title = data.volumeInfo.title;
    this.author = data.volumeInfo.authors[0];
    this.image_url = data.volumeInfo.imageLinks.thumbnail;
    this.description = data.volumeInfo.description;
    this.type = data.volumeInfo.industryIdentifiers.type;
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
    
});

function showForm(req, res) {
    let { title, author, image_url, description, type } = req.body;
    res.render('pages/books/details', { book: req.body });
    
}
function addBook(req, res) {
    let {title, author, image_url, description, type} = request.body;
  
    let SQL = 'INSERT INTO booktable (title, author, image_url, description, type) VALUES ($1, $2, $3, $4, $5);';
    let values = [title, author, image_url, description, type];
  
    return client.query(SQL, values)
      .then(res.redirect('/'));
    //   .catch(err => handleError(err, res));
  }

function getBook(req, res) {
    let SQL = 'SELECT * from books;';
  
    return client.query(SQL)
      .then(results => res.render('pages/home', {results: results.rows}))
    //   .catch(handleError);
  }




app.listen(PORT, () => console.log('Up on port', PORT));