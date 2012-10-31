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

app.listen(3000)
