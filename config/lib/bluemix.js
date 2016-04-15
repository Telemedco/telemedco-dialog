'use strict';

module.exports.getServiceCreds = (name) => {
    if (process.env.VCAP_SERVICES) {
        var services = JSON.parse(process.env.VCAP_SERVICES);
        for (var serviceName in services) {
            if (serviceName.indexOf(name) === 0) {
                var service = services[serviceName][0];
                return {
                    url: service.credentials.url,
                    username: service.credentials.username,
                    password: service.credentials.password
                };
            }
        }
    }
    return {};
};
