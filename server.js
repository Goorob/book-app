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


// app.get('/show', (req, res) => {
//     res.render('pages/searches/show' ,{books:req.books});
// });




// app.get('/books', booksHandler);

// function booksHandler(req, res) {
//     getBooks(req.query.data)
//         .then(booksData => res.status(200).json(booksData));
// };

// function getBooks(data) {
//     let url = 'https://www.googleapis.com/books/v1/volumes?q=dan';

//     return superagent.get(url)
//         .then(data => {
//             // res.json(data.body)
//             // console.log(data);
//             let books = data.body;
//             return books.items.map(book => {
//                 return new Book(book);
//             })
            
//         })}


// function Book(data) {
//     this.title = data.volumeInfo.title;
//     this.author = data.volumeInfo.authors[0]  ;
//     this.image_url = data.volumeInfo.imageLinks.thumbnail ;
//     this.description = data.volumeInfo.description  ;
//     this.type= data.volumeInfo.industryIdentifiers.type;
// }

app.post('/searches', (req, res) => {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=Dan Brown';

    superagent.get(url)
        .then(data => {
            // res.json(data.body)
            // console.log(data);
            let books=data.body.items ;
            res.render('pages/show', {books:books})
            // return books.items.map(book=>{
            //     // return new Book(book);
            //     res.render('/show' , {books:book})
            // })
            
        });
});


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