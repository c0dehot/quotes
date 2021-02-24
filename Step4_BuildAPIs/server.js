const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// will share any static html files with the browser
app.use( express.static('html') )

// // accept incoming POST requests
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
const quotesList = [
    { author: "ShakeSpeare", quote: "To Be or Not To Be" },
    { author: "Terminator", quote: "I'll be Back!" }
]

// Routes (Endpoints) =========================================
app.get( '/api/quotes', function( req, res ){
    res.send(quotesList)
})

// Listener ==================================================
app.listen(PORT, function() {
    console.log(`Serving content on http://localhost:${PORT}`)
})
