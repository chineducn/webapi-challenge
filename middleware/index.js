


module.exports = {
    logger: logger
}

function logger(req, res, next) {
    console.log(`A ${req.method} request from url ${req.url} was made at ${new Date().toISOString()}`)
    next()
}