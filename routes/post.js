
// Creates post gres
var pg = require('pg')


// Creates connection
var client = new pg.Client({user: 'pi', password: 'megadeth13', database: 'dldb'})

// Open database connection
client.connect()


// Displays posts from database. Ordered by id number.
exports.postings = function (req, res) {
  var query = client.query('SELECT title, body, date FROM posts ORDER BY id desc;')
  var posts = []
  query.on("row", function(row, result) {
    result.addRow = (row)
    posts.push(row)
  })
  query.on("end", function(result) {
    //console.log(result)
    //console.log(result.rowCount + ' rows where received')
    //console.log(result.rows[0])
    //console.log(posts.valueOf())
    res.render('index',
    { title: 'Home',
      result: posts}
    )
  })
}

// Enters new posts into the database and assigns date.
exports.post_set = function (req, res) {
  var title = req.body.title
    , body = req.body.body
    , d = new Date()
    , m_names = new Array("January","February","March","April","May","June","July","August","September","October","November","December")
    , currDate = d.getDate()
    , currMonth = d.getMonth()
    , currYear = d.getFullYear()
    , fullDate = ('Posted on ' + m_names[currMonth] + ' ' + currDate + ', ' + currYear)

  //console.log(fullDate)
  //console.log('Title: ' + title + ' body: ' + body)
  client.query('INSERT INTO posts (title, body, date) values ($1, $2, $3);', [title, body, fullDate])
  res.redirect("back")
}

// Close database connection
//client.end()