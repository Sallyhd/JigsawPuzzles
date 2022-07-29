const jwt = require("jsonwebtoken");

const authenticate=function(req,res,next){
    const response = {
        status:process.env.FORBIDDEN_CODE,
        message:process.env.NO_TOKEN_ERR
    };

    const headerExists=req.headers.authorization;
    if(headerExists){
        const token = headerExists.split(" ")[1];
        try {
            if(jwt.verify(token,process.env.TOKEN_SECRET_KEY)){
                next();
            }
            else{
                _fillResponse(response,process.env.FORBIDDEN_CODE,process.env.NOT_AUTHORIZED_ERR);
                _sendResponse(response,res);
            }

        } catch (error) {
            _fillResponse(response,process.env.INTERNAL_ERR,error.message);
            _sendResponse(response,res);

        }
    }
    else{
        _sendResponse(response,res);
    }
}
const _fillResponse = function(response,code,message){
    response.status=code;
    response.message=message;
}
const _sendResponse=function(response,res){
    res.status(response.status).json(response.message);
}
module.exports={
    authenticate
}