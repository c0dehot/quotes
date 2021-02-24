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

app.get( '/api/quotes/:id', async function( req, res ){
    const id = req.params.id
    const quotesData = await orm.getQuotes( id )
    if( quotesData.length===1 ){
        console.log( `[GET /api/quotes/${id}] quotesData`, quotesData )
        res.send( quotesData[0] )
    } else {
        // no quote by that id, error!
        res.status(404).end()
    }
})

app.post( '/api/quotes', async function( req, res ){
    const quoteData = req.body
    const result = await orm.insertQuote( quoteData.author, quoteData.quote )
    console.log( `[POST /api/quotes] quoteData.result`, quoteData )
    
    res.send( { message: "Quote Saved!"} )
})

app.put( '/api/quotes/:id', async function( req, res ){
    const quoteData = req.body
    const id = req.params.id

    const result = await orm.updateQuote( id, quoteData.author, quoteData.quote )
    console.log( `[PUT /api/quotes] quoteData.result`, quoteData )
    
    res.send( { message: "Quote Updated!"} )
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
