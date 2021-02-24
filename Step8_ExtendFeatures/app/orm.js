const db = require( './connection' )('quotes_db','r00tr00t')

function getQuotes( id='' ){
    return db.query( "SELECT * FROM quotes"+( id ? ` WHERE id='${id}'` : '' ) )
}

function insertQuote( author, quote ){
    return db.query( `INSERT INTO quotes (author,quote) VALUES(?,?)`, 
        [author, quote] )
}

function updateQuote( id, author, quote ){
    return db.query( `update quotes SET author=?,quote=? WHERE id=?`, 
        [author, quote, id] )
}

function deleteQuote( id ){
    return db.query( `DELETE FROM quotes WHERE id='${id}'`)

}
module.exports = { getQuotes, insertQuote, updateQuote, deleteQuote }