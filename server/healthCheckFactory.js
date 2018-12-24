
function createHealthCheck(name) {
    return new Promise(function(resolve, reject){
        setTimeout(function () {
            if (!getRandomBool()) {
                reject({
                    name,
                    message: HealthCheckTypes[name]
                })
            }
            resolve({
                name,
                message: 'Success'
            })
        }, getRandomInt(0, 5) * 1000);
     })
}

var HealthCheckTypes = {
    sql: 'Could not connect to the database with the specificed user and password.',
    ftp: 'The FTP server appears to be offline',
    smtp: 'The SMTP server failed to send the email to the specified recipient',
    permissions: 'The app does not have write permissions',
    service: 'A third-party service did not respond in time'
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
  
function getRandomBool() {
    return Math.random() >= 0.1;
}

module.exports.createHealthCheck = createHealthCheck;
