const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const SENDGRID_API_KEY = functions.config().sendgrid.key
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
exports.firestoreEmail = functions.firestore
    .document('userProfiles/{userProfileId}/sightings/{sightingsId}')
    .onCreate(event => {
        const userId = event.params.userId;
        const db = admin.firestore()
        return db.collection('userProfiles').doc(userId)
                 .get()
                 .then(doc => {
                    const user = doc.data()
                    const msg = {
                        to: user.email,
                        from: 'hello@angularfirebase.com',
                        subject:  'New Follower',
                        // text: `Hey ${toName}. You have a new follower!!! `,
                        // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
            
                        // custom templates
                        templateId: '515da676-6d03-467a-a397-db31896fe90d',
                        substitutionWrappers: ['{{', '}}'],
                        substitutions: {
                          name: user.displayName
                          // and other custom properties here
                        }
                    };
                    return sgMail.send(msg)
                })
                .then(() => console.log('email sent!') )
                .catch(err => console.log(err) )
                     
});









/*
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.database.ref('/userProfile/{uid}').onWrite(event => {
  const snapshot = event.data;
  const val = snapshot.val();

  if (!snapshot.changed('role')) {
    return;
  }

  const mailOptions = {
    from: '"Terry Collinson." <terry_collinson@debono.net>',
    to: val.email
  };

  // The user just subscribed to our newsletter.
  if (val.subscribedToMailingList) {
    mailOptions.subject = 'Thanks and Welcome!';
    mailOptions.text = 'Thanks you for subscribing to our newsletter. You will receive our next weekly newsletter.';
    return mailTransport.sendMail(mailOptions).then(() => {
      console.log('New subscription confirmation email sent to:', val.email);
    }).catch(error => {
      console.error('There was an error while sending the email:', error);  
    });
  }

  // The user unsubscribed to the newsletter.
  mailOptions.subject = 'Sad to see you go :`(';
  mailOptions.text = 'I hereby confirm that I will stop sending you the newsletter.';
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New unsubscription confirmation email sent to:', val.email);
  }).catch(error => {
    console.error('There was an error while sending the email:', error);  
  });
});
*/