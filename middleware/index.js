


module.exports = {
    logger: logger,
    errorHandler: errorHandler
}

function errorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            method: req.method,
            url: req.url,
            success: false,
            message: err.message || "There was an error in the execution of the task"
        })
}

function logger(req, res, next) {
    console.log(`A ${req.method} request from url ${req.url} was made at ${new Date().toISOString()}`)
    next()
}