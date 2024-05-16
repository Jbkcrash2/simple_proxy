function parseUri(s) {
    if (typeof s === "object") return s;

    const re =
        /<(sips?):(?:([^\s>:@]+)(?::([^\s@>]+))?@)?(?:(|(?:\[.*\])|(?:[0-9A-Za-z\-_]+\.)+[0-9A-Za-z\-_]+)|(?:\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(?::(\d+))?((?:;[^\s=\?>;]+(?:=[^\s?\;]+)?)*)(?:\?(([^\s&=>]+=[^\s&=>]+)(&[^\s&=>]+=[^\s&=>]+)*))?$/gm;
    const r = re.exec(s);

    if (r) {
        return {
            family: /\[.*\]/.test(r[4]) ? "ipv6" : "ipv4",
            scheme: r[1],
            user: r[2],
            password: r[3],
            host: r[4],
            port: +r[5],
            params: (r[6].match(/([^;=]+)(=([^;=]+))?/g) || [])
                .map(function (s) {
                    return s.split("=");
                })
                .reduce(function (params, x) {
                    params[x[0]] = x[1] || null;
                    return params;
                }, {}),
            headers: ((r[7] || "").match(/[^&=]+=[^&=]+/g) || [])
                .map(function (s) {
                    return s.split("=");
                })
                .reduce(function (params, x) {
                    params[x[0]] = x[1];
                    return params;
                }, {}),
        };
    }
}

module.exports = {
    parseUri
}

