const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

const orm = require( './app/orm' )

// will share any static html files with the browser
app.use( express.static('html') )

// accept incoming POST requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// Routes (Endpoints) =========================================
app.get( '/api/quotes', async function( req, res ){
    const quotesList = await orm.getQuotes()
    console.log( `[GET /api/quote] quotesList` )
    res.send(quotesList)
})

app.post( '/api/quotes', async function( req, res ){
    const quoteData = req.body
    const result = await orm.insertQuote( quoteData.author, quoteData.quote )
    console.log( `[POST /api/quotes] quoteData.result`, quoteData, result )
    
    // if we are using RESTful javascript call we can send JSON data back
    // res.send( { message: "Quote sent!"} )
    // if we are doing a FORM POST direclty, we need to redirect to the index page.
    res.redirect( '/index.html' )
})

app.delete( '/api/quotes/:id', async function( req, res ){
    const id = req.params.id

    const result = await orm.deleteQuote( id )

    res.send( { message: `Deleted ${id}` } )
})
// Listener ==================================================
app.listen(PORT, function() {
    console.log(`Serving content on http://localhost:${PORT}`)
})
