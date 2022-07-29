const mongoose = require("mongoose");
require("../data/db");
require("dotenv").config();

const Puzzle=mongoose.model(process.env.PUZZLE_SCHEMA_NAME);

const _validatePaginingQuery=function(req,res,response){
    let offset = 0;
    let count =parseInt(process.env.PAGE_RECORDS_DEFAULTS,process.env.BASE_10);
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count=parseInt(req.query.count);
    }

    if(isNaN(offset) || isNaN(count)){
        _fillResponse(response,process.env.USER_ERR_CODE,process.env.NOT_VALID_OFFSET_COUNT);
        _sendResponse(res,response);
        return;
    }
    return {offset,count};
}
const _checkReturnedPuzzles = function(response,puzzles,updatePuzzleCallback,req,res){
    if(!puzzles){
        _fillResponse(response,process.env.NOT_FOUND_CODE,process.env.NOT_EXISTS_ERR);
    }
    else{
        if(updatePuzzleCallback){
            updatePuzzleCallback(req,res,puzzles,response);
            return;
        }
        _fillResponse(response,response.status,puzzles);
    }
}

const getAll=function(req,res){
    const response ={
        status:process.env.OK_STATUS,
        message:""
    };
    if (req.query && req.query.search) {
        _runSearchQuery(req, res);
        return;
    }
    let result = _validatePaginingQuery(req,res,response);
    if(!result){
        return;
    }
    
    Puzzle.find().skip(result.offset).limit(result.count)
            .exec()
            .then((puzzles)=>_checkReturnedPuzzles(response,puzzles))
            .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
            .finally(()=>_sendResponse(res,response));
}

const _runSearchQuery= function(req,res){
    const response = {
        status: process.env.OK_STATUS,
        message: ""
    };
    const name = req.query.search;
    const query = {
        "name": {$regex:new RegExp("^" + name.toLowerCase(), "i")}
    };
    Puzzle.find(query).exec()
        .then((puzzles)=> _fillResponse(response,response.status,puzzles))
        .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
        .finally(()=>_sendResponse(res,response));
}

const getOne = function(req,res){
    const response ={
        status:process.env.OK_STATUS,
        message:""
    };
    const puzzleId =req.params.puzzleId;
    if(mongoose.isValidObjectId(puzzleId)){
    Puzzle.findById(puzzleId).exec()
            .then((puzzle)=>_checkReturnedPuzzles(response,puzzle))
            .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
            .finally(()=>_sendResponse(res,response));
    }
    else{
        _fillResponse(response,process.env.USER_ERR_CODE,process.env.NOT_FOUND_ERR);
        _sendResponse(res,response);
    }
}

const deleteOne=function(req,res){
    const response ={
        status:process.env.OK_STATUS,
        message:""
    };
    const puzzleId =req.params.puzzleId;
    if(mongoose.isValidObjectId(puzzleId)){
        Puzzle.findByIdAndDelete(puzzleId).exec()
                .then((deletedPuzzle)=> _checkReturnedPuzzles(response,deletedPuzzle))
                .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
                .finally(()=>_sendResponse(res,response));
    }
    else{
        _fillResponse(response,process.env.USER_ERR_CODE,process.env.NOT_FOUND_ERR);
        _sendResponse(res,response);
    }
}

const addOne=function(req,res){
    const response={status:process.env.OK_STATUS,message:""};
    const newPuzzle={
        name:req.body.name,
        numPieces:req.body.numPieces,
        Stores:req.body.Stores
    }
    Puzzle.create(newPuzzle)
            .then((puzzle)=>_checkReturnedPuzzles(response,puzzle))
            .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
            .finally(()=>_sendResponse(res,response));
}

const fullUpdatePuzzle=function(req,res){
    _updatePuzzle(req,res,_fullUpdatePuzzle);
}
const _fullUpdatePuzzle = function(req,res,puzzle,response){
    puzzle.name = req.body.name;
    puzzle.numPieces = req.body.numPieces;
    puzzle.Stores = req.body.Stores;
    puzzle.save()
        .then((updatedPuzzle)=>_checkReturnedPuzzles(response,updatedPuzzle))
        .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err));
}

const _partialUpdatepuzzle=function(req,res,puzzle,response){
    if(req.body && req.body.name){
        puzzle.name = req.body.name;
    }

    if(req.body && req.body.numPieces){
        puzzle.numPieces = req.body.numPieces;
    }
    
    if(req.body && req.body.Stores){
        puzzle.Stores = req.body.Stores;
    }

    puzzle.save()
            .then((updatedPuzzle)=>_checkReturnedPuzzles(response,updatedPuzzle))
            .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err));
}

const partialUpdatePuzzle=function(req,res){
    _updatePuzzle(req,res,_partialUpdatepuzzle);
}

const _updatePuzzle=function(req,res,updatePuzzleCallback){
    const response={status:process.env.UPDATE_STATUS,message:""};
    const puzzleId =req.params.puzzleId;
    if(mongoose.isValidObjectId(puzzleId)){
        Puzzle.findById(puzzleId).exec()
            .then((puzzle)=>_checkReturnedPuzzles(response,puzzle,updatePuzzleCallback,req,res))
            .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
            .finally(()=>_sendResponse(res,response));
    }
    else{
        _fillResponse(response,process.env.USER_ERR_CODE,process.env.NOT_FOUND_ERR);
    }
    if(response.status != process.env.UPDATE_STATUS){
        _sendResponse(res,response);
    }
}
const _fillResponse = function(response,status,message){
   response.status=status;
   response.message=message;
}

const _sendResponse = function(res,response){
    res.status(response.status).json(response.message);
}

module.exports={
    getAll,
    getOne,
    deleteOne,
    addOne,
    fullUpdatePuzzle,
    partialUpdatePuzzle
}