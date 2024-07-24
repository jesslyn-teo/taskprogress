module.exports = {
    
    // for token pre-generation
    preTokenGenerate : (req, res, next) => {
        res.locals.user_id = req.body.user_id;
        next();
    },

    // before sending token
    beforeSendToken : (req, res, next) => {
        res.locals.message = `Token successfully generated.`;
        next();
    },

    // token verification
    showTokenVerified : (req, res, next) => {
        res.status(200).json({
            user_id : res.locals.user_id,
            message : `Token successfully verified.`
        });
    },

    // bcrypt compare
    showCompareSuccess : (req, res, next) => {
        res.status(200).json({
            message : `Compare is successful.`
        });
    },

    // bcrypt pre-compare 
    preCompare : (req, res, next) => {
        res.locals.hash = req.body.hash;
        next();
    },

    // bcrypt hashing
    showHashing : (req, res, next) => {
        res.status(200).json({
            hash : res.locals.hash,
            message : `Hashing is successful.`
        });
    }
}