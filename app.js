/*
 * Module dependencies
 */

var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , post = require('./routes/post')
  , contact = require('./routes/contact')
  , auth = require('./routes/login')

// Config

var app = express()
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.set('view options', {
  layout: false})
app.locals.pretty=true
app.use(express.logger('dev'))
app.use(express.cookieParser('secret'))
app.use(express.cookieSession())
//app.use(express.session({secret: "My Secret"}))
app.use(express.methodOverride())
app.use(express.bodyParser())
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))
app.use(express.favicon(__dirname + '/public/images/favicon.ico'))

// Web gets

app.get('/', post.postings)

app.get('/new_post', auth.member)
   
app.get('/band', function (req, res) {
  res.render('band',
  { title: 'Band'}
  )
})

app.get('/paul', function (req, res) {
  res.render('paul',
  { title: 'Paul'}
  )
})

app.get('/scott', function (req, res) {
  res.render('scott',
  { title: 'Scott'}
  )
})

app.get('/brian', function (req, res) {
  res.render('brian',
  { title: 'Brian'}
  )
})

app.get('/joe', function (req, res) {
  res.render('joe',
  { title: 'Joe'}
  )
})
 
app.get('/shows', function (req, res) {
  res.render('shows',
  { title: 'Shows'}
  )
})

app.get('/video', function (req, res) {
  res.render('video',
  { title: 'Video'}
  )
})

app.get('/gallery', function (req, res) {
  res.render('gallery',
  { title: 'Gallery'}
  )
})

app.get('/discography', function (req, res) {
  res.render('discography',
  { title: 'Discography'}
  )
})

app.get('/poormans', function (req, res) {
  res.render('poormans',
  { title: "Poor Man's Anthem"}
  )
})

app.get('/thestruggle', function (req, res) {
  res.render('thestruggle',
  { title: "The Struggle"}
  )
})

app.get('/links', function (req, res) {
  res.render('links',
  { title: "Links"}
  )
})

app.get('/contact', function (req, res) {
  res.render('contact',
  { title: "Contact"}
  )
})

app.get('/thanks', function (req, res) {
  res.render('thanks',
  { title: "Thanks You"}
  )
})

app.get('/nomess', function (req, res) {
  res.render('nomess',
  { title: "No Message"}
  )
})

app.get('/invalidemail', function (req, res) {
  res.render('invalidemail',
  { title: "Invalid Email"}
  )
})

app.get('/public/images/favicon.ico', function (req, res) {
  res.render('favicon.ico',
  { title: "Fav Icon"}
  )
})

app.get('/login', auth.loggedin)

app.get('/logout', auth.logout)

// Web Posts
app.post('/new_post', post.post_set)

app.post('/contact', contact.sendMail)

app.post('/login', auth.valid)


// Listens on port 3000
app.listen(3000)
