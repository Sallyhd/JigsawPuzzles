const mongoose = require("mongoose");
require("../data/db");
require("dotenv").config();


const Puzzle = mongoose.model(process.env.PUZZLE_SCHEMA_NAME);

const _addStore=function(req,res,puzzle){
    const response ={status:process.env.OK_STATUS,message:""};

    puzzle.Stores.push({url:req.body.url, puzzlePrice:req.body.puzzlePrice});
    puzzle.save()
            .then((updatedPuzzle)=>_checkReturnedStores(response,updatedPuzzle))
            .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err));
}
const _fillResponse = function(response,status,message){
    response.status=status;
    response.message=message;
 }
 
 const _sendResponse = function(res,response){
     res.status(response.status).json(response.message);
 }
 
const getAll=function(req,res){
    const response ={
        status:process.env.OK_STATUS,
        message:""
    };
    const puzzleId = req.params.puzzleId;
    
    Puzzle.findById(puzzleId).select(process.env.STORE_SELECT).exec()
            .then((puzzle)=>_checkReturnedStores(response,puzzle.Stores))
            .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
            .finally(()=>_sendResponse(res,response));
}
const _checkReturnedStores = function(response,stores){
    if(!stores){
        _fillResponse(response,process.env.NOT_FOUND_CODE,process.env.NOT_EXISTS_ERR);
    }
    else{
        _fillResponse(response,response.status,stores);
    }
}
const _checkReturnedPuzzles = function(response,puzzles,req,res){
    if(!puzzles){
        _fillResponse(response,process.env.NOT_FOUND_CODE,process.env.NOT_EXISTS_ERR);
    }
    else{
        _fillResponse(response,response.status,puzzles);
        _addStore(req,res,puzzles);
    }
}

const addStore=function(req,res){
    const response = {status : process.env.OK_STATUS,message:""};
    const puzzleId = req.params.puzzleId;
    Puzzle.findById(puzzleId).exec()
            .then((puzzle)=>_checkReturnedPuzzles(response,puzzle,req,res))
            .catch((err)=> _fillResponse(response,process.env.INTERNAL_ERR,err))
            .finally(()=>_sendResponse(res,response));
}
const _checkedReturnedStore = function(puzzle,response,storeId){
    if(puzzle){
        if(mongoose.isValidObjectId(storeId)){
        if(!puzzle.Stores.id(storeId)){
            _fillResponse(response,process.env.NOT_FOUND_CODE,process.env.NOT_FOUND_STORE);
        }
        else{
        _fillResponse(response,process.env.OK_STATUS,puzzle.Stores.id(storeId));
        }
    }
    else{
        _fillResponse(response,process.env.NOT_FOUND_CODE,process.env.NOT_VALID_STORE_ID);
    }
    }
    else{
        _fillResponse(response,process.env.NOT_FOUND_CODE,process.env.NOT_EXISTS_ERR);
    }
}
const getOne=function(req,res){
    const response={
        status:process.env.OK_STATUS,
        message:""
    };
    const puzzleId =req.params.puzzleId;
    const storeId = req.params.storeId;
    if(mongoose.isValidObjectId(puzzleId)){
        
    Puzzle.findById(puzzleId).select(process.env.STORE_SELECT)
            .exec()
            .then((puzzle)=>_checkedReturnedStore(puzzle,response,storeId))
            .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
            .finally(()=>_sendResponse(res,response));
    }
    else{
        _fillResponse(response,process.env.NOT_FOUND_CODE,process.env.NOT_FOUND_ERR);
        _sendResponse(res,response);
    }
}
const _deleteStore=function(puzzle,storeId,response,res){
    puzzle.Stores.pull(storeId);
    puzzle.save()
        .then((puzzle)=>{
            if(!puzzle){
                _fillResponse(response,process.env.NOT_FOUND_CODE,process.env.NOT_EXISTS_ERR);
            }
            else
            {
                _fillResponse(response,process.env.OK_STATUS,process.env.DELETE_STORE_MSG);
            }
        })
        .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err));
}
const deleteStore = function(req,res){
    const response = {status : process.env.OK_STATUS,message:""};
    const puzzleId =req.params.puzzleId;
    const storeId = req.params.storeId;
    if(mongoose.isValidObjectId(puzzleId) && mongoose.isValidObjectId(storeId)){
        Puzzle.findById(puzzleId).select(process.env.STORE_SELECT).exec()
            .then((puzzle)=>_deleteStore(puzzle,storeId,response,res))
            .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
            .finally(()=>_sendResponse(res,response));
}
else{
    _fillResponse(response,process.env.NOT_FOUND_CODE,process.env.NOT_FOUND_ERR);
    _sendResponse(res,response);
}
}

const _updateStore=function(req,res,updateStoreCallback){
    const response = {status : process.env.UPDATE_STATUS,message:""};
    const puzzleId =req.params.puzzleId;
    const storeId = req.params.storeId;
    if(mongoose.isValidObjectId(puzzleId) && mongoose.isValidObjectId(storeId)){
        Puzzle.findById(puzzleId).select(process.env.STORE_SELECT)
            .exec()
            .then((puzzle)=> updateStoreCallback(puzzle,response,storeId,req,res))
            .then((updatedPuzzle)=>_fillResponse(response,process.env.UPDATE_STATUS,updatedPuzzle))
            .catch((err)=>_fillResponse(response,process.env.INTERNAL_ERR,err))
            .finally(()=> _sendResponse(res,response));
    }
    else{
        _fillResponse(response,process.env.NOT_FOUND_CODE,process.env.NOT_FOUND_ERR);
        _sendResponse(res,response);
    }
}
const _fullUpdateStore= function(puzzle,response,storeId,req,res){
    return new Promise((resolve,reject)=>{
        puzzle.Stores.some(function(store){
            if(store._id == storeId){
            store.url=req.body.url;
            store.puzzlePrice=req.body.puzzlePrice;
            }
        });
        puzzle.save()
            .then((updatedPuzzle)=>{resolve(updatedPuzzle);})
            .catch((err)=>{reject(err);});
    });
}
const _partialUpdateStore=function(puzzle,response,storeId,req,res){
    return new Promise((resolve,reject)=>{
    puzzle.Stores.some(function(store){
        if(store._id == storeId){
            if(req.body.url){
                store.url=req.body.url;
            }

            if(req.body.puzzlePrice){
                store.puzzlePrice=req.body.puzzlePrice;
            }
        }
    });
    puzzle.save()
        .then((updatedPuzzle)=>resolve(updatedPuzzle))
        .catch((err)=>reject(err));
    });
}
const fullUpdateStore=function(req,res){
    _updateStore(req,res,_fullUpdateStore);
}
const partialUpdateStore=function(req,res){
    _updateStore(req,res,_partialUpdateStore);
}

module.exports={
    getAll,
    getOne,
    addStore,
    deleteStore,
    fullUpdateStore,
    partialUpdateStore
}