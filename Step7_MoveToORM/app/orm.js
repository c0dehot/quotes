const db = require( './connection' )('quotes_db','r00tr00t')

function getQuotes(){
    return db.query( "SELECT * FROM quotes" )
}

function insertQuote( author, quote ){
    return db.query( `INSERT INTO quotes (author,quote) VALUES(?,?)`, 
        [author, quote] )
}

function deleteQuote( id ){
    return db.query( `DELETE FROM quotes WHERE id='${id}'`)

}
module.exports = { getQuotes, insertQuote, deleteQuote }