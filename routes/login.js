var accounts = [
  {username: 'brian', password: 'megadeth13'}
  , {username: 'dead-lift', password: '1moreday518'}
  ]

exports.loggedin = function (req, res) {
	console.log("Current Username:" + req.session.username)
  if (!req.session.username){
	res.render('login',
	{title: "Login",
	 err: req.query['err']})
  } else {
	res.redirect('/new_post')
  }
}

exports.valid = function(req, res) {
	console.log("Current Username:" + req.session.username)
  console.log('Starting Validation...')
  console.log(req.body.username)
  //console.log(accounts.valueOf())
  //console.log(accounts.indexOf(req.body.username))
  //console.log(accounts.length)
  var vali = false
  console.log('Checking Usernames...')
  for (var i = 0, len = accounts.length; i < len; i++) {
  	var user = accounts[i]
		console.log(i)
		if (user.username == req.body.username && user.password == req.body.pass) {
			console.log('Enter the conditional')
			req.session.username = req.body.username
			console.log("Current Username:" + req.session.username)
			console.log(req.body.pass)
			vali = true
			res.redirect('/new_post')
	  }
	  if (i == len-1 && !req.session.username) {
	  	res.redirect('back')
	  } 
  }
 }

exports.member = function(req, res) {
  if (!req.session.username){
		res.redirect('/login')
  } else {
			res.render('new_post',
			{title: "New Post",
			username: req.session.username})
  }
}

exports.logout = function(req, res) {
	console.log(req.session.username)
	if (req.session.username != null) {
		req.session.username = null
		req.session = null
		req.body.username = null
		req.body.pass = null
		req.body = null
		res.render('logout',
		{title: "Logout"})
	} else {
		res.render('logout',
		{title: "Logout"})
	}
}

