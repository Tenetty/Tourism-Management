// import React from "react";

// const Hero3 = () => {
//   return (
//     <>
//       <div className="lg:px-36 md:py-5 px-5">
//         <div className="container mx-auto">
//           <div className="-mx-4 flex flex-wrap items-center justify-between">
//             <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
//               <div className="mt-10 lg:mt-0">
//                 <span className="text-[#41A4FF] mb-2 block text-lg font-semibold">
//                   Trvel with us
//                 </span>
//                 <h2 className="text-dark mb-8 text-3xl font-bold sm:text-4xl">
//                   TAKE ONLY MEMORIES, LEAVE ONLY FOOTPRINTS
//                 </h2>
//                 <p className="text-body-color mb-8 text-base">
//                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
//                   nulla enim aperiam culpa cupiditate quas animi ducimus
//                   blanditiis! Dolorum, perspiciatis.
//                 </p>
//                 <p className="text-body-color mb-12 text-base">
//                   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
//                   nulla enim aperiam culpa cupiditate quas animi ducimus
//                   blanditiis! Dolorum, perspiciatis.
//                 </p>
//               </div>
//             </div>
//             <div className="w-full lg:w-6/12">
//               <div className="-mx-3 flex items-center sm:-mx-4">
//                 <div className="w-full px-3 sm:px-4 xl:w-1/2">
//                   <div className="py-3 sm:py-4">
//                     <img
//                       src="https://images.unsplash.com/photo-1627895457805-c7bf42cb9873?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
//                       alt=""
//                       className="w-full rounded-2xl"
//                     />
//                   </div>
//                   <div className="py-3 sm:py-4">
//                     <img
//                       src="https://images.unsplash.com/photo-1544750040-4ea9b8a27d38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
//                       alt=""
//                       className="w-full rounded-2xl"
//                     />
//                   </div>
//                 </div>
//                 <div className="w-full px-3 sm:px-4 xl:w-1/2">
//                   <div className="relative z-10 my-4">
//                     <img
//                       src="https://images.unsplash.com/photo-1594993877167-a08f13013dc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
//                       alt=""
//                       className="w-full rounded-2xl"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Hero3;

import React, { useEffect, useRef, useState } from "react";

const Hero3 = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        setIsVisible(false); // Reset animation when leaving the viewport
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={heroRef} className="lg:px-36 md:py-5 px-5">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap items-center justify-between">
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div
              className={`mt-10 lg:mt-0 transition-opacity duration-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-[#41A4FF] mb-2 block text-lg font-semibold">
                Travel with us
              </span>
              <h2
                className={`text-dark mb-8 text-3xl font-bold sm:text-4xl transition-transform duration-700 ${
                  isVisible ? "translate-y-0" : "translate-y-10"
                }`}
              >
                TAKE ONLY MEMORIES, LEAVE ONLY FOOTPRINTS
              </h2>
              <p
                className={`text-body-color mb-8 text-base transition-opacity duration-700 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
                nulla enim aperiam culpa cupiditate quas animi ducimus
                blanditiis! Dolorum, perspiciatis.
              </p>
              <p
                className={`text-body-color mb-12 text-base transition-opacity duration-700 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
                nulla enim aperiam culpa cupiditate quas animi ducimus
                blanditiis! Dolorum, perspiciatis.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-6/12">
            <div className="-mx-3 flex items-center sm:-mx-4">
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="py-3 sm:py-4">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAxfHxpbmRpYSUyMHRvdXJpc218ZW58MHx8MHx8fDA%3D"
                    alt="Travel Image 1"
                    className={`w-full rounded-2xl transition-opacity duration-700 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
                <div className="py-3 sm:py-4">
                  <img
                    src="https://images.unsplash.com/photo-1686575192618-9bbf73aba0d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGluZGlhJTIwdG91cmlzbXxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Travel Image 2"
                    className={`w-full rounded-2xl transition-opacity duration-700 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="relative z-10 my-4">
                  <img
                    src="https://images.unsplash.com/photo-1702151741096-f6a5ddae891a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8ODV8fHxlbnwwfHx8fHw%3D"
                    alt="Travel Image 3"
                    className={`w-full rounded-2xl transition-opacity duration-700 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3;
