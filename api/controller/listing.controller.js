import mongoose from "mongoose";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";
export const create = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};
export const deleteList = async (req, res, next) => {
  // Check if req.params.id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ObjectId");
  }
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};
export const updateList = async (req, res, next) => {
  // Check if req.params.id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ObjectId");
  }
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings!"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req,res,next) => {
  // Check if req.params.id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send("Invalid ObjectId");
  }
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings=async(req,res,next)=>{
  try {
    const limit=parseInt(req.query.limit)||9;
    const startIndex=parseInt(req.query.startIndex)||0;
    let offer=req.query.offer;
    if(offer===undefined||offer==='false'){
      offer ={$in:[false,true]}; // basically when we are not selecting offer then we will get feeds for both offered listing and non-offered listing....
    }
    let furnished=req.query.furnished;
    if(furnished===undefined||furnished==='false'){
      furnished={$in:[false,true]}; // same as that of offer part...
    }
    let parking=req.query.parking;
    if(parking===undefined||parking==='false'){
      parking={$in:[false,true]}; // same as that of offer part and furnished part...
    }
    let type=req.query.type;
    if(type===undefined||type==='all'){
      type={$in:['rent','sell']}; 
    }
    const searchTerm=req.query.searchTerm||'';
    const sort=req.query.sort||'createdAt';
    const order=req.query.order||'desc';
    // all the aboves are default behaviour of search...

    // this part is bit similar to how we write sql queries...These are MongoDb queries...
    const listings=await Listing.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { address: { $regex: searchTerm, $options: 'i' } },
      ], // this will get all listings whose name or description contains searchTerm fully or partially with case insensitive...
      offer,
      furnished,
      parking,
      type
      // similarly getting all listing based on above parameters and then we will sort them using sort and order...
    }).sort({ [sort]: order }).limit(limit).skip(startIndex);
    // after sorting the listings we need to put limit on them and skip function b'coz we have to skip all lists of index 0-startIndex-1 that's why skip First startIndex listings...

    return res.status(200).json(listings);

  } catch (error) {
    next(error);
  }
}
