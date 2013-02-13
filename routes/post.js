
// Creates post gres
var pg = require('pg')

// Create file system object
var fs = require('fs')

// Creates connection
var client = new pg.Client({user: 'pi', password: 'elendil', database: 'dldb'})

// Open database connection
client.connect()


// Displays posts from database. Ordered by id number.
exports.postings = function (req, res) {
  var query = client.query('SELECT title, body, date FROM posts ORDER BY id desc limit 5;')
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

exports.shows = function (req, res) {
  var query = client.query('select day, city, state, venue, bands from gigs order by date desc')
  var show = []
  query.on("row", function(row, result) {
    result.addRow = (row)
    show.push(row)
  })
  query.on("end", function(result) {
    res.render('shows',
    {title: 'Shows',
     result: show}
    )
  })
}

exports.show_set = function (req, res) {
  var day = req.body.date + "/"
    , city = req.body.city
    , state = req.body.state
    , venue = req.body.venue
    , bands = req.body.bands
    , splitDate = day.split("/")
    , m_names = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")

  var preMonth = splitDate[0] - 1
    , month = m_names[preMonth]

  var fullDate = month + " " + splitDate[1] + ", " + splitDate[2]

  client.query('INSERT INTO gigs (date, day, city, state, venue, bands) values ($1, $2, $3, $4, $5, $6);', [day, fullDate, city, state, venue, bands])
  res.redirect("back")
}

exports.newPhotoUpload = function (req, res){
  console.log(JSON.stringify(req.files))
  console.log(req.files.newPhoto.path)
  var temp_path = req.files.newPhoto.path
    , temp_thumb = req.files.newThumb.path
    , save_path = '/home/pi/www/deadlift/Dead-Lift-Web/public/images/gallery/' + req.files.newPhoto.name
    , save_thumb = '/home/pi/www/deadlift/Dead-Lift-Web/public/images/gallery/' + req.files.newThumb.name
    , dte = new Date()

  console.log(save_path)
  fs.rename(temp_path, save_path, function(error) {
    if(error) throw error

    fs.unlink (temp_path, function(){
      if(error) throw error      
    })
  })
  fs.rename(temp_thumb, save_thumb, function(error) {
    if(error) throw error;
    fs.unlink (temp_thumb, function() {
      if(error) throw error;
    })
  })

  var image_path = save_path.replace('/home/pi/www/deadlift/Dead-Lift-Web/public', '')
    , thumb_path = save_thumb.replace('/home/pi/www/deadlift/Dead-Lift-Web/public', '')
  client.query('INSERT INTO photo (date, thumnail, image) values ($1, $2, $3);', [dte, thumb_path, image_path])
  res.redirect("/gallery")
}

exports.gall = function (req, res) {
  var query = client.query('SELECT thumnail, image FROM photo ORDER BY date;')
  var images = []
  query.on("row", function(row, result) {
    result.addRow = (row)
    images.push(row)
  })
  query.on("end", function(result) {
    //console.log(result)
    //console.log(result.rowCount + ' rows where received')
    //console.log(result.rows[0])
    //console.log(posts.valueOf())
    res.render('gallery',
    { title: 'Gallery',
      result: images}
    )
  })
}

// Close database connection
//client.end()