const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// will share any static html files with the browser
app.use( express.static('html') )

// accept incoming POST requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// our global data / database
const quotesList = [
    { id: 1, author: "ShakeSpeare", quote: "To Be or Not To Be" },
    { id: 2, author: "Terminator", quote: "I'll be Back!" },
    { id: 3, author: "Benjamin Franklin", quote: "You don't get no time back!" }
]

// Routes (Endpoints) =========================================
app.get( '/api/quotes', function( req, res ){
    res.send(quotesList)
})

app.post( '/api/quotes', function( req, res ){
    const quoteData = req.body
    quoteData.id = quotesList.length
    console.log( `[POST /api/quotes] quoteData:`, quoteData )
    quotesList.push( quoteData )
    // if we are using RESTful javascript call we can send JSON data back
    // res.send( { message: "Quote sent!"} )
    // if we are doing a FORM POST direclty, we need to redirect to the index page.
    res.redirect( '/index.html' )
})
// Listener ==================================================
app.listen(PORT, function() {
    console.log(`Serving content on http://localhost:${PORT}`)
})
