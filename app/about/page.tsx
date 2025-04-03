'use client'

import Navbar from "../components/Navbar";
import Activity from "../components/Activity";
import Footer from "../components/Footer";
import { ParallaxProvider } from "react-scroll-parallax";

export default function About() {
  return (
    <ParallaxProvider>
      {/* HERO & NAVBAR SECTION */}
      <section className="relative bg-slate-950">
        <Navbar />    
        {/* <Hero/> */}
        {/* Wave Divider as a background effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full mt-40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#0a0a0a" fillOpacity="1" d="M0,192L24,197.3C48,203,96,213,144,192C192,171,240,117,288,112C336,107,384,149,432,154.7C480,160,528,128,576,133.3C624,139,672,181,720,202.7C768,224,816,224,864,197.3C912,171,960,117,1008,96C1056,75,1104,85,1152,106.7C1200,128,1248,160,1296,154.7C1344,149,1392,107,1416,85.3L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* ACTIVITY SECTION */}
        <section className="bg-[#0a0a0a] pt-10 pb-20">
            <Activity/>     
        </section>

      <section className="bg-[#030619]">
        <Footer/>
      </section>
    </ParallaxProvider>
  );
}