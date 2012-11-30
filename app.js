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
app.use(express.favicon(__dirname + '/public/images/favicon.ico'))

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
  if (req.body.message == '' || req.body.subject == '' || req.body.email == '') {
    res.redirect('/nomess')
    return false
  }
  else {
    console.log('Post Started')
    var uEmail = req.body.email
      , uSubject = req.body.subject
      , uMessage = req.body.message
      , atpos = uEmail.indexOf("@")
      , dotpos = uEmail.lastIndexOf(".")
      console.log(uEmail)
      console.log(uSubject)
      console.log(uMessage)
      if (atpos < 1 || dotpos < atpos+2 || dotpos+2 >= uEmail.length) {
        res.redirect('invalidemail')
        return false
      }
      else {
        var MandrillAPI = require('mailchimp').MandrillAPI;
        var apiKey = '5e086c89-06dd-4e55-b89f-47ddc9a0209f';
        try { 
          var mandrill = new MandrillAPI(apiKey, { version : '1.0', secure: false });
        } catch (error) {
          console.log(error.message);
        }
        mandrill.messages_send({message: { text: uMessage, subject: uSubject, from_email: uEmail, to: [{email: "general@dead-lift.com"}]}}, function (error, data) {
          if (error)
            console.log(error.message);
          else
            console.log(JSON.stringify(data)); // Do something with your data!
        });        
        console.log('Finishing Send')
        res.redirect('/thanks')
      }
}})

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

app.listen(3000)
