const mongoose = require("mongoose");
require("../data/db");
require("dotenv").config();

const Puzzle = mongoose.model(process.env.PUZZLE_SCHEMA_NAME);

const _addStore=function(req,res,puzzle){
    puzzle.Stores=req.body.Stores;
    puzzle.save(function(err,updatedPuzzle){
        const response ={status:process.env.OK_STATUS,message:""};
        if(err){
            response.status=process.env.INTERNAL_ERR;
            response.message=err;
        }
        else{
            response.message=puzzle;
        }
        res.status(response.status).json(response.message);
        return;
    });
}

const getAll=function(req,res){
    console.log("url",req.url);
    const puzzleId = req.params.puzzleId;
    Puzzle.findById(puzzleId).select("Stores").exec(function(err,puzzle){
        res.status(process.env.OK_STATUS).json(puzzle.Stores);
    }); 
}

const addStore=function(req,res){
    const puzzleId = req.params.puzzleId;
    Puzzle.findById(puzzleId).exec(function(err,puzzle){
        const response = {status : process.env.OK_STATUS,message:""};
        if(err){
            response.status=process.env.INTERNAL_ERR;
            response.message=err;
            return;
        }
        else{
            if(!puzzle){
                response.status=process.env.NOT_FOUND_CODE;
                response.message=process.env.NOT_EXISTS_ERR;
                return;
            }
            else{
                if(puzzle){
                    console.log("puzzle",puzzle);
                    console.log("add store");
                    _addStore(req,res,puzzle);
                }
            }
        }

    });
}

const getOne=function(req,res){
    const puzzleId =req.params.puzzleId;
    const storeId = req.params.storeId;
    if(mongoose.isValidObjectId(puzzleId)){
    Puzzle.findById(puzzleId).select(process.env.STORE_SELECT).exec(function(err,puzzle){
        if(err){
            console.log(process.env.ERR_MSG,err);
            res.status(process.env.INTERNAL_ERR).json({message:err});
            return;
        }
        else{
            if(puzzle){
                if(!puzzle.Stores.id(storeId)){
                    res.status(process.env.NOT_FOUND_CODE).json({message:process.env.NOT_FOUND_STORE});
                    return;
                }
            res.status(process.env.OK_STATUS).json(puzzle.Stores.id(storeId));
            return;
            }
            else{
                res.status(process.env.NOT_FOUND_CODE).json({message:process.env.NOT_EXISTS_ERR});
                return;
            }
        }
    });
    }
    else{
        res.status(process.env.NOT_FOUND_CODE).json({message:process.env.NOT_FOUND_ERR});
        return;
    }
}

const deleteStore = function(req,res){
    const puzzleId =req.params.puzzleId;
    const storeId = req.params.storeId;
    if(mongoose.isValidObjectId(puzzleId)){
        Puzzle.findById(puzzleId).select("Stores").exec(function(err,puzzle){
        puzzle.Stores.pull(storeId);
        puzzle.save(function(err,puzzle){
            const response = {status : process.env.OK_STATUS,message:""};
            if(err){
                response.status=process.env.INTERNAL_ERR;
                response.message=err;
            }
            else{
                if(!puzzle){
                    response.status=process.env.NOT_FOUND_CODE;
                    response.message=process.env.NOT_EXISTS_ERR;
                }
                else
                {
                    response.message=process.env.DELETE_STORE_MSG;
                }
            }
            res.status(response.status).json({message:response.message});
        });
    });
}
}

const updateStore=function(req,res){
    const puzzleId =req.params.puzzleId;
    const storeId = req.params.storeId;
    if(mongoose.isValidObjectId(puzzleId)){
        const storeURL = req.body.url;
        const puzzlePrice = req.body.puzzlePrice;
        Puzzle.findById(puzzleId).select(process.env.STORE_SELECT).exec(function(err,puzzle){
            if(!err){
            puzzle.Stores.some(function(store){
                if(store._id == storeId){
                store.url=storeURL;
                store.puzzlePrice=puzzlePrice;
                }
            });
            puzzle.save(function(err,updatedPuzzle){
                res.status(process.env.OK_STATUS).json(updatedPuzzle);
            });
        }
        else
        {
            res.status(process.env.INTERNAL_ERR).json({message:err});
        }
        });
    }
}
const partialUpdate=function(req,res){
    const puzzleId =req.params.puzzleId;
    const storeId = req.params.storeId;
    if(mongoose.isValidObjectId(puzzleId)){
        Puzzle.findById(puzzleId).select(process.env.STORE_SELECT).exec(function(err,puzzle){
            if(!err){
            puzzle.Stores.some(function(store){
                if(store._id == storeId){
                    if(req.body.url)
                        store.url=req.body.url;

                    if(req.body.puzzlePrice)
                        store.puzzlePrice=req.body.puzzlePrice;
                }
            });
            puzzle.save(function(err,updatedPuzzle){
                res.status(process.env.OK_STATUS).json(updatedPuzzle);
            });
        }
        else
        {
            res.status(process.env.INTERNAL_ERR).json({message:err});
        }
        });
    }
}

module.exports={
    getAll,
    getOne,
    addStore,
    deleteStore,
    updateStore,
    partialUpdate
}