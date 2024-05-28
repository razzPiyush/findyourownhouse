import express from "express"
import { create, deleteList,getListing,getListings,updateList } from "../controller/listing.controller.js";
import {verifyUser} from '../utils/verifyUser.js'
const router= express.Router();
router.post('/create',verifyUser,create)
router.delete('/delete/:id',verifyUser,deleteList)
router.put('/update/:id',verifyUser,updateList)
router.get('/getListing/:id',getListing)
router.get('/get',getListings)
export default router;