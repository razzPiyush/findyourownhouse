import React from "react";
import profileimg from "../assets/developer.jpg";
export default function About() {
  return (
    <div className="">
      <div className="mt-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-slate-800">
          About Ghar Dekho
        </h1>
        <p className="mb-4 text-slate-700">
          Ghar Dekho is a leading real estate agency that specializes in helping
          clients buy, sell, and rent properties in the most desirable
          neighborhoods. Our team of experienced agents is dedicated to
          providing exceptional service and making the buying and selling
          process as smooth as possible.
        </p>
        <p className="mb-4 text-slate-700">
          Our mission is to help our clients achieve their real estate goals by
          providing expert advice, personalized service, and a deep
          understanding of the local market. Whether you are looking to buy,
          sell, or rent a property, we are here to help you every step of the
          way.
        </p>
        <p className="mb-4 text-slate-700">
          Our team of agents has a wealth of experience and knowledge in the
          real estate industry, and we are committed to providing the highest
          level of service to our clients. We believe that buying or selling a
          property should be an exciting and rewarding experience, and we are
          dedicated to making that a reality for each and every one of our
          clients.
        </p>
      </div>
        <div className="bg-gray-100 min-h-screen flex items-center justify-center w-full">
        <div className="bg-white shadow-md rounded-md overflow-hidden max-w-4xl w-full mx-4">
          <div className="flex flex-wrap ">
            <div className="md:w-1/2 p-4">
              <img
                src={profileimg}
                alt="Developer"
                className="border border-gray-500 h-full"
              />
            </div>
            <div className="md:w-1/2 p-4">
              <div className="mb-4">
                <h1 className="text-3xl font-bold">Meet the Developer</h1>
              </div>
              <div className="mb-4">
                <h5 className="text-2xl font-bold">Mohammad Nafis Raza</h5>
              </div>
              <p className="text-gray-700">
                Hola Peeps, I'm currently pursuing a Bachelor's degree in
                Mechanical Engineering at IIT(ISM), Dhanbad. I'm proficient in
                Competitive Programming and DSA and active on various coding
                platforms like Codeforces, GFG, LeetCode, and Atcoder. I am
                currently rated as a specialist on Codeforces. Also, I am
                skilled in frontend development and currently learning ReactJS.
                I worked as a frontend developer at SAIRC and currently
                interning at WorkEase as a Frontend Developer. Additionally, I
                work as a volunteer at Kartavya, a student-run NGO of IIT(ISM)
                Dhanbad.
              </p>
              <p className="text-gray-700 mt-4">
                <small>Contact: mohammad.nafis.raza.28@gmail.com</small>
              </p>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
