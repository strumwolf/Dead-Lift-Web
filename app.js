/*
 * Module dependencies
 */

var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , post = require('./routes/post')
  , contact = require('./routes/contact')
  , get_handler = require('./routes/get_handler')
  , pass = require('./routes/pass')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy
  , flash = require('connect-flash')

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
app.use(express.compress())
app.use(express.methodOverride())
app.use(express.bodyParser())
app.use(express.cookieParser('secret'))
app.use(express.session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(function(req, res, next){
  res.locals.user = req.user
  next()
})
app.use(app.router)
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/skin'))
app.use(express.favicon(__dirname + '/public/images/favicon.ico'))

// Web gets

app.get('/', post.postings)
 
app.get('/band', get_handler.band)

app.get('/paul', get_handler.paul)

app.get('/scott', get_handler.scott)

app.get('/brian', get_handler.brian)

app.get('/joe', get_handler.joe)
 
app.get('/shows', get_handler.shows)

app.get('/video', get_handler.video)

app.get('/gallery', get_handler.gallery)

app.get('/discography', get_handler.disc)

app.get('/poormans', get_handler.poormans)

app.get('/thestruggle', get_handler.struggle)

app.get('/links', get_handler.lin)

app.get('/contact', get_handler.contact)

app.get('/thanks', get_handler.thanks)

app.get('/player', get_handler.player)

app.get('/new_post', pass.ensureauth, pass.member)

app.get('/login', pass.logauth)

app.get('/logout', pass.logout)

app.get('/public/images/favicon.ico', function (req, res) {
  res.render('favicon.ico',
  { title: "Fav Icon"}
  )
})

// Web Posts
app.post('/new_post', post.post_set)

app.post('/contact', contact.sendMail)

app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), pass.logpost);

// Listens on port 3000
app.listen(3000)