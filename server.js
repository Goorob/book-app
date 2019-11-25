'use strict';

require('dotenv').config();
const express = require('express');
const superagent = require('superagent');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('pages/index');
});







app.get('/books', booksHandler);

function booksHandler(req, res) {
    getBooks(req.query.data)
        .then(booksData => res.status(200).json(booksData));
};

function getBooks(data) {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=dan';

    return superagent.get(url)
        .then(data => {
            // res.json(data.body)
            // console.log(data);
            let books = data.body;
            return books.items.map(book => {
                return new Book(book);
            })
        })}


function Book(data) {
    this.id= data.id;
    this.image_url = data.volumeInfo.imageLinks.thumbnail;
    this.title = data.volumeInfo.title;
    this.author = data.volumeInfo.authors;
    this.description = data.volumeInfo.description
}

// app.get('/books', (req, res) => {
//     let url = 'https://www.googleapis.com/books/v1/volumes?q=dan';

//     superagent.get(url)
//         .then(data => {
//             // res.json(data.body)
//             // console.log(data);
//             let books=data.body ;
//             return books.items.map(book=>{
//                 return new Book(book);
//             })
//         //   , { books: data.body.items });

//         });
//         res.render('pages/books')
// });


//   app.get('/show', (req,res) => {
//     let url = 'https://www.googleapis.com/books/v1/volumes?q=';
//     superagent.get(url)
//       .then( data => {
//         //   res.json(data.body)
//         //   console.log(data);
//         res.render('pages/show', {show:data.body.items});
// return new Book (books);
//       });
//   });

app.listen(PORT, () => console.log('Up on port', PORT));