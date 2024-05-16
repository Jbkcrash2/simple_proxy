const Srf = require('drachtio-srf');
const srf = new Srf();
const regParser = require('drachtio-mw-registration-parser');
//var drachtio = require('drachtio');
//var app = new drachtio() ;
//var Srf = require('drachtio-srf') ;
//var srf = new Srf(app) ;
//var debug = require('debug')('drachtio-srf') ;
//var drachtio = require('drachtio-srf');
//var app = new drachtio() ;
//var Srf = require('..') ;
//var srf = new Srf(app) ;
var debug = require('debug')('drachtio-srf');


srf.use(regParser);
srf.use(srf.dialog());

srf.register((req, res) => {
    console.log(req.registration);
    res.send(200);
});

srf.invite(function (req, res) {

    //var opts = {
    //    localSdp: req.msg.body.replace(/^c=IN IP4 .*$/m, 'c=IN IP4 0.0.0.0'),
    //    headers: {
    //        'User-Agent': 'simple-uas'
    //    }
    //};
    console.log(req.msg.getParsedHeader('to').uri);
    headers = req.msg.headers;
    headers['to'] = '<sip:1001@192.168.2.206>'
    req.msg.headers = headers;
//    console.log(headers);
 //   req.set('to', 'sip:1001@192.168.2.206')
    console.log(req.msg.getParsedHeader('to').uri);

    srf.proxyRequest(req, 'sip:1001@192.168.2.206:5061', {
        recordRoute: true,
        followRedirects: true,
        provisionalTimeout: '2s',
        //proxy: 'sip:1001@192.168.2.206:5061;transport=UDP'
    }).then((results) => {
        console.log(JSON.stringify(results));
        // {finalStatus: 200, finalResponse:{..}, responses: [..]}
    });

    /*srf.createUAS(req, res, opts, function (err, dialog) {
        if (err) { throw err; }

        debug('dialog: ', JSON.stringify(dialog));


        setTimeout(function () {
            dialog.modify('hold', function (err) {
                if (err) { throw err; }
                debug('successfully put dialog on hold');

                setTimeout(function () {
                    dialog.modify('unhold', function (err) {
                        if (err) { throw err; }
                        debug('successfully took dialog off hold');
                    });
                }, 2000);
            });
        }, 2000);


        dialog.on('destroy', destroy.bind(dialog));
    });*/
});

srf.connect({
    host: '127.0.0.1',
    port: 9022,
    secret: 'cymru'
});

function destroy() {
    debug('dialog ended');
}