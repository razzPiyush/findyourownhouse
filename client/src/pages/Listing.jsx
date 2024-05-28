import React from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
  FaEdit,
} from "react-icons/fa";
import Email from "./Email.jsx";
export default function Listing() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  SwiperCore.use([Navigation]);
  const params = useParams();
  const ListingId = params.listingId;
  const [error, seterror] = useState(false);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contactButton, setcontactButton] = useState(true);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        seterror(false);
        const res = await fetch(`/api/listing/getListing/${ListingId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          seterror(true);
          return;
        }
        seterror(false);
        setLoading(false);
        setListing(data);
      } catch (error) {
        seterror(error.message);
        setLoading(false);
      }
    };
    fetchListing();
  }, [ListingId]);
  return (
    <div>
      {error && (
        <p className="text-center my-7 text-2xl text-green-700">
          Page not found
        </p>
      )}
      {loading && (
        <p className="text-center my-7 text-2xl text-green-700">Loading...</p>
      )}
      {listing && !error && !loading && (
        <>
          {currentUser&&currentUser._id===listing.userRef&&
          <div
            className="fixed top-[25%] left-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
            onClick={() => {
              navigate(`/update-listing/${listing._id}`)
            }}
          >
            
              <FaEdit className="text-slate-500" /> 
          </div>
          }
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="aspect-w-16 aspect-h-9">
                  <div
                    className=" h-[275px] sm:h-[550px]"
                    style={{
                      background: `url(${url}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
                    
          <div
            className="fixed top-[25%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
              <FaShare className="text-slate-500" />
            
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} -{" "}
              {listing.offer
                ? "With discount of  ₹ " +
                  listing.discountPrice.toLocaleString("en-US")
                : " ₹ " + listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  <span>&#8377;</span>{" "}
                  {+listing.regularPrice - +listing.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {currentUser &&
              listing.userRef !== currentUser._id &&
              contactButton && (
                <>
                  <button
                    onClick={() => setcontactButton(false)}
                    className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 uppercase"
                  >
                    Contact the owner
                  </button>
                </>
              )}
            {currentUser &&
              listing.userRef !== currentUser._id &&
              !contactButton && <Email listing={listing} />}
          </div>
        </>
      )}
    </div>
  );
}
