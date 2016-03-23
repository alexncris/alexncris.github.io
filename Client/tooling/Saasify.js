var fs = require('fs');
var path = require('path');
var CleanCSS = require('clean-css');
var sass = require('node-sass');
var chokidar = require('chokidar');

var dev = process.argv.indexOf('-p') === -1;
function Saasify() {}


function inlineBase64(){
	var out =[];
	var re = /url\(\'\.\.(.*)\'\)/;
	var lines = fs.readFileSync(__dirname+'/../styles/vars.txt').toString().split('\n');
	lines.map(function(i){
		if (i.indexOf('url(') === -1){
			return out.push(i);
		}
		var vn = i.split(':')[0];
		var fn = i.match(re)[1];
		var img = path.resolve(__dirname+'/../'+fn);		
		var b64 = fs.readFileSync(img).toString('base64');
		out.push(vn+': url("data:image/' + fn.split('.')[1]+';base64,'+b64+'");')
	});
	fs.writeFileSync(__dirname+'/../styles/variables.scss', out.join('\n'));
}
var sassify = function(){
	inlineBase64();
	sass.render({
	  file: __dirname+'/../styles/fv.scss'
	}, function(err, result) { 
		if (err){
			return console.log(err);
		}
		css= result.css.toString();
		css = new CleanCSS().minify(css).styles;
		if (!dev){
			try{
				fs.mkdirSync(`${__dirname}/../../css`);
			}
			catch(e){}
			
		}
		fs.writeFileSync(dev ? `${__dirname}/../css/fv.css` : `${__dirname}/../../css/fv.css`, css);
	});
};

Saasify.prototype.apply = function(compiler) {
  compiler.plugin('emit', function onEmit (compilation, done) {
  	sassify();
  	done()
  });
};
if (dev){
	var watcher = chokidar.watch(__dirname+'/../styles', {ignored: /^\./, persistent: true});
	watcher.on('change', sassify);
}
module.exports = Saasify;