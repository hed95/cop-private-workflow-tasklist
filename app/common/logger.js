import winston from 'winston';

winston.emitErrs = true;

const logger = new winston.Logger({exitOnError: false});

logger.addConsole = function(config) {
    logger.add (winston.transports.Console, config);
};

logger.addFile = function(config) {
    logger.add (winston.transports.File, config);
};

module.exports = logger;

module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};