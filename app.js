const Srf = require('drachtio-srf');
const srf = new Srf();
const regParser = require('drachtio-mw-registration-parser');
var debug = require('debug')('drachtio-srf');


srf.use(regParser);
srf.use(srf.dialog());

srf.register((req, res) => {
    console.log(req.registration);
    res.send(200);
});

srf.invite(function (req, res) {
    srf.proxyRequest(req, "sip:1001@192.168.2.206:5061;transport=udp", {
        recordRoute: true,
        followRedirects: true,
        provisionalTimeout: '2s'
    }).then((results) => {
        console.log(JSON.stringify(results));
    });

});

srf.connect({
    host: '127.0.0.1',
    port: 9022,
    secret: 'cymru'
});

function destroy() {
    debug('dialog ended');
}