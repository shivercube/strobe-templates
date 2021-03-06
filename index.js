/**
 * Node Templates
 *
 * Notes: 
 * 1.  Exceptions defined in the errors module:  
 *     _TemplateError_ and _TemplateSyntaxError_ 
 *     with their respective shorthands _TE_ and _TSE_ 
 *
 * 2. Template class is separated from its prototype 
 *    to avoid circular requires.
 * 
 * Dependencies: 
 * String.prototype.fmt which uses ext's sprintf() function 
 * Object.merge from ext 
 * Object.getPath from strobex
 *
 * How it Works ?
 *  
 * TODO: Document here
 */

require( "./extensions" );
var T        = require('./template')
  , C        = require('./context')
  , TP       = require('./templateproto')
  , TO       = require('./tokens');


exports.version = "0.1";

exports.Context  = C.Context;
exports.Template = T.Template;
exports.setTemplatesDir = TP.setTemplatesDir;
exports.setDebug = function( bool ){
  TP.setCache( bool );
  TO.setVarMissingWarning( bool );
};
exports.render = function(res, templateName, context, ext) {
  (new T.Template(templateName + (ext ? ext : '.html')))
    .load(function(err, template) {
      if (err) return console.log(err);
      template.render(context, function(err, output) {
        if (err) return console.log(err);
        res.send(output.join(''));
      });
    });
};