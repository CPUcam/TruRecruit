/**
 * Split into declaration and initialization for better startup performance.
 */
var _ = require('lodash');
var async = require('async');
var querystring = require('querystring');
var fs = require('fs');
var path = require('path');
var uid = require('uid2');
var mime = require('mime');
var busboy = require('connect-busboy');

var TARGET_PATH = path.resolve(__dirname, '../writable/');
var FILE_TYPES = ['file/pdf', 'file/doc', 'file/docx'];

/**
 * GET /upload
 * File upload page
 */
exports.getFileUpload = function(req, res, next) {
  res.render('/upload', {
    title: 'File Upload'
  });
};

/**
 * POST /upload
 *
 */
exports.postFileUpload = function(req, res, next) {
  var is;
  var os;
  var targetPath;
  var targetName;
  var tempPath = req.files.busboy.path;
  //get the mime type of the file
  var type = mime.lookup(req.files.busboy.path);
  //get the extension of the file
  var extension = req.files.busboy.path.split(/[. ]+/).pop();

  //check to see if we support the file type
  if (FILE_TYPES.indexOf(type) == -1) {
    return res.send(415, 'Supported image formats: pdf, doc, docx.');
  }

  //create a new name for the image
  targetName = uid(22) + '.' + extension;

  //determine the new path to save the image
  targetPath = path.join(TARGET_PATH, targetName);

  //create a read stream in order to read the file
  is = fs.createReadStream(tempPath);

  //create a write stream in order to write the a new file
  os = fs.createWriteStream(targetPath);

  is.pipe(os);

  //handle error
  is.on('error', function() {
    if (err) {
      return res.send(500, 'Something went wrong');
    }
  });

  //if we are done moving the file
  is.on('end', function() {

    //delete file from temp folder
    fs.unlink(tempPath, function(err) {
      if (err) {
        return res.send(500, 'Something went wrong');
      }

      //send something nice to user
      res.render('image', {
        name: targetName,
        type: type,
        extension: extension
      });

    });//#end - unlink
  });//#end - on.end
};



/**
 * GET /api/scraping
 * Web scraping example using Cheerio library.
 */
// exports.getScraping = function(req, res, next) {
//   cheerio = require('cheerio');
//   request = require('request');
//
//   request.get('https://news.ycombinator.com/', function(err, request, body) {
//     if (err) {
//       return next(err);
//     }
//     var $ = cheerio.load(body);
//     var links = [];
//     $('.title a[href^="http"], a[href^="https"]').each(function() {
//       links.push($(this));
//     });
//     res.render('api/scraping', {
//       title: 'Web Scraping',
//       links: links
//     });
//   });
// };

/**
 * GET /api/github
 * GitHub API Example.
 */
// exports.getGithub = function(req, res, next) {
//   Github = require('github-api');
//
//   var token = _.find(req.user.tokens, { kind: 'github' });
//   var github = new Github({ token: token.accessToken });
//   var repo = github.getRepo('sahat', 'requirejs-library');
//   repo.show(function(err, repo) {
//     if (err) {
//       return next(err);
//     }
//     res.render('api/github', {
//       title: 'GitHub API',
//       repo: repo
//     });
//   });
//
// };

/**
 * GET /api/twitter
 * Twiter API example.
 */
// exports.getTwitter = function(req, res, next) {
//   Twit = require('twit');
//
//   var token = _.find(req.user.tokens, { kind: 'twitter' });
//   var T = new Twit({
//     consumer_key: process.env.TWITTER_KEY,
//     consumer_secret: process.env.TWITTER_SECRET,
//     access_token: token.accessToken,
//     access_token_secret: token.tokenSecret
//   });
//   T.get('search/tweets', { q: 'nodejs since:2013-01-01', geocode: '40.71448,-74.00598,5mi', count: 10 }, function(err, reply) {
//     if (err) {
//       return next(err);
//     }
//     res.render('api/twitter', {
//       title: 'Twitter API',
//       tweets: reply.statuses
//     });
//   });
// };

/**
 * GET /api/stripe
 * Stripe API example.
 */
// exports.getStripe = function(req, res) {
//   stripe = require('stripe')(process.env.STRIPE_SKEY);
//
//   res.render('api/stripe', {
//     title: 'Stripe API',
//     publishableKey: process.env.STRIPE_PKEY
//   });
// };

/**
 * POST /api/stripe
 * Make a payment.
 */
// exports.postStripe = function(req, res, next) {
//   var stripeToken = req.body.stripeToken;
//   var stripeEmail = req.body.stripeEmail;
//   stripe.charges.create({
//     amount: 395,
//     currency: 'usd',
//     source: stripeToken,
//     description: stripeEmail
//   }, function(err, charge) {
//     if (err && err.type === 'StripeCardError') {
//       req.flash('errors', { msg: 'Your card has been declined.' });
//       res.redirect('/api/stripe');
//     }
//     req.flash('success', { msg: 'Your card has been charged successfully.' });
//     res.redirect('/api/stripe');
//   });
// };
