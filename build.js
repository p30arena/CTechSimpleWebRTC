var bundle = require('browserify')({standalone: 'SimpleWebRTC'}),
    fs = require('fs'),
    request = require('request'),
    uglify = require('uglify-js');

bundle.add('./simplewebrtc');
bundle.bundle(function (err, source) {
    if (err) console.error(err);
    fs.writeFileSync('simplewebrtc.bundle.js', source);
    request.get('http://localhost:3000/socket.io/socket.io.js', function (err, res, body) {
        if (!err && body && body.length) {
            fs.writeFile('latest.js', uglify.minify(source + body, {fromString: true}).code, function (err) {
                if (err) throw err;
            });
        }
    });
});
