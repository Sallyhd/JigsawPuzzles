const express = require("express");
const router=express.Router();
const puzzleController = require("../controller/puzzleController");
const storesController = require("../controller/storesController");
require("dotenv").config();

router.route("")
.get(puzzleController.getAll)
.post(puzzleController.addOne);

router.route(process.env.PUZZLE_GET_ONE)
.get(puzzleController.getOne)
.delete(puzzleController.deleteOne)
.put(puzzleController.fullUpdatePuzzle)
.patch(puzzleController.partialUpdatePuzzle);

router.route(process.env.STORE_ROUTE)
.get(storesController.getAll)
.post(storesController.addStore);

router.route(process.env.STORE_ID_ROUTE)
.get(storesController.getOne)
.delete(storesController.deleteStore)
.put(storesController.updateStore)
.patch(storesController.partialUpdate);


module.exports=router;