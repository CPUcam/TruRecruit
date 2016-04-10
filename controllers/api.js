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
 * POST /upload
 *
 */
exports.postFileUpload = function(req, res, next) {
  console.log(req.body);
  console.log(req.files);
  res.status(204).end();
  if (req.files) {
    console.log('success');
  }
  else console.log('failure');
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
