// sends email to general@dead-lift.com from contacts page.
exports.sendMail = function (req, res) {
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
        mandrill.messages_send({message: { text: uMessage, subject: uSubject, from_email: uEmail, to: [{email: "general@dead-lift.com"}], track_opens: "true"}}, function (error, data) {
          if (error)
            console.log(error.message);
          else
            console.log(JSON.stringify(data)); // Do something with your data!
        });
        mandrill.messages_send({message: { text: "Dead-Lift thanks you for your message. If you are looking to book a show are have a concern you will receive a response shortly", subject: "Thank You", from_email: "general@dead-lift.com", to: [{email: uEmail}], track_opens: "true"}}, function (error, data) {
          if (error)
            console.log(error.message);
          else
            console.log(JSON.stringify(data)); // Do something with your data!
        });          
        console.log('Finishing Send')
        res.redirect('/thanks')
      }
}}