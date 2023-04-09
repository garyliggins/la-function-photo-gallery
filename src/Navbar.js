import React from "react";

export default function Navbar() {

  return (
    <div className="sticky top-0 z-50 h-32 md:h-40 p-7 pt-10  md:px-20 bg-black fixed w-screen">
     <a href="https://lafunction.com/" className="">
         <img className="float-left invert w-16 md:w-20 " src="LA_Function_Final corrected.png" alt="LA Function Logo" ></img>
     </a>
     <div>
         <h3 className=" float-right text-2xl md:text-3xl font-bold leading-normal mt-0 mb-2 text-white italic">PHOTO GALLERY</h3>
     </div>
    </div>
  );
}
