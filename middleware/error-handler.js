const errorHandler = (err,req,res,next) => {
    return res.status(500).json({err:err})
}

module.exports = errorHandler