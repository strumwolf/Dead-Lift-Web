/*
 * Module dependencies
 */

var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')

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
app.use(express.bodyParser())
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

/*
app.get('/offline.appcache', function (req, res) {
  res.header('Content-Type', 'text/cache-manifest'),
  res.end('CACHE MANIFEST')
})
*/

app.get('/', function (req, res) {
  res.render('index',
  { title: 'Home'}
  )
})

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

app.post('/contact', function (req, res) {
  console.log('Post Started')
  var uEmail = req.body.email
    , uSubject = req.body.subject
    , uMessage = req.body.message
  
    console.log(uEmail)
    console.log(uSubject)
    console.log(uMessage)
    var mailer   = require("mailer")
      , username = process.env.MANDRILL_USERNAME
      , password = process.env.MANDRILL_PASSWORD;
    console.log('Starting Send')
    mailer.send(
      { host:           "smtp.mandrillapp.com"
      , port:           587
      , to:             "general@dead-lift.com"
      , from:           uEmail
      , subject:        uSubject
      , body:           uMessage
      , authentication: "login"
      , username:       "deadliftmusic@hotmail.com"
      , password:       "5e086c89-06dd-4e55-b89f-47ddc9a0209f"
    }, function(err, result){
      if(err){
        console.log(err);
      }
    }
    );
  console.log('Finishing Send')
  res.redirect('/thanks')
})

app.get('/thanks', function (req, res) {
  res.render('thanks',
  { title: "Thanks You"}
  )
})
  

app.listen(3000)
