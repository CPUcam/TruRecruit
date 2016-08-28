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
