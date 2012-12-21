exports.band = function (req, res) {
  res.render('band',
  { title: 'Band'}
  )
}

exports.paul = function (req, res) {
  res.render('paul',
  { title: 'Paul'}
  )
}

exports.scott = function (req, res) {
  res.render('scott',
  { title: 'Scott'}
  )
}

exports.brian = function (req, res) {
  res.render('brian',
  { title: 'Brian'}
  )
}

exports.joe = function (req, res) {
  res.render('joe',
  { title: 'Joe'}
  )
}

exports.shows = function (req, res) {
  res.render('shows',
  { title: 'Shows'}
  )
}

exports.video = function (req, res) {
  res.render('video',
  { title: 'Video'}
  )
}

exports.gallery = function (req, res) {
  res.render('gallery',
  { title: 'Gallery'}
  )
}

exports.disc = function (req, res) {
  res.render('discography',
  { title: 'Discography'}
  )
}

exports.poormans = function (req, res) {
  res.render('poormans',
  { title: "Poor Man's Anthem"}
  )
}

exports.struggle = function (req, res) {
  res.render('thestruggle',
  { title: "The Struggle"}
  )
}

exports.lin = function (req, res) {
  res.render('links',
  { title: "Links"}
  )
}

exports.contact = function (req, res) {
  res.render('contact',
  { title: "Contact"}
  )
}

exports.thanks = function (req, res) {
  res.render('thanks',
  { title: "Thanks You"}
  )
}

exports.player = function(req, res) {
  res.render('player',
  {title: "MP3 Player"})
}