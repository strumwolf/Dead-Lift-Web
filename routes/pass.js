var passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy
  , flash = require('connect-flash')

var users = [
    {id: 1, username: 'brian', password: 'megadeth13'}
  , {id: 2, username: 'dead-lift', password: '1moreday518'}
  ]

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));

exports.ensureauth = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

exports.member = function(req, res){
  res.render('new_post', { title: "New Post", user: req.user })
}

exports.memberShow = function(req, res) {
  res.render('add_show', {title: "New Show", user: req.user})
}

exports.logauth = function(req, res){
  res.render('login', { title: "Login", user: req.user, message: req.flash('error') });
}

exports.logout = function(req, res){
  req.logout();
  res.redirect('/')
}

exports.logpost = function(req, res) {
    res.redirect('/new_post')}
