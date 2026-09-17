import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense, useRef, useState } from "react";
import { DraggableLight } from "./components/DraggableLight";
import { ScrollControls, Scroll } from "@react-three/drei";
import { ExhibitMap } from "./components/ExhibitMap";
import { ClosingSection } from "./components/ClosingSection";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const textRef1 = useRef<HTMLElement>(null!);
  const textRef2 = useRef<HTMLElement>(null!);
  const textRef3 = useRef<HTMLElement>(null!);

const [activeCharacter, setActiveCharacter] = useState<"sarka" | "ctirad">("sarka");

const characterContent = {
  ctirad: {
    label: "Ctirad",
    text: "A warrior undone by mercy. Ctirad freed the maiden who begged for his help, shared in the drink she offered as thanks never knowing the mead was drugged, or that her horn call would summon the blades waiting in the trees.",
  },
  sarka: {
    label: "Šárka",
    text: "A trap dressed as distress Šárka let herself be found bound to a tree, a horn and mead placed just out of reach as bait. Ctirad believed her story and set her free. It was the last trusting act of his life.",
  },
  
};

  return (
    <>
      <div className="w-vw h-dvh">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          style={{ touchAction: "none" }}
        >
          <color attach="background" args={["#000"]} />
          <Suspense fallback={null}>
            <DraggableLight />

            <ScrollControls pages={5} damping={0.1}>
              <Experience textRef1={textRef1} textRef2={textRef2} textRef3={textRef3} activeCharacter={activeCharacter} />
              <Scroll html>
                {/* navigation */}

                <nav className=" text-white relative">
                  <div className="m-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                      <a
                        href="#"
                        className="text-xl font-bold tracking-wide text-white"
                      >
                        Logo
                      </a>

                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex flex-col justify-center space-y-1.5 w-8 h-8 p-1 focus:outline-none z-20"
                      >
                        <span
                          className={` block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isOpen ? "translate-y-2 rotate-45 " : ""}`}
                        ></span>
                        <span
                          className={` block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isOpen ? "opacity-0" : ""}`}
                        ></span>
                        <span
                          className={` block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
                        ></span>
                      </button>

                      <ul
                        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 py-6 md:py-0 transition-all duration-300 ease-in-out md:flex shadow-lg md:shadow-none z-10 ${isOpen ? "flex" : "hidden md:flex"}`}
                      >
                        <li>
                          <a
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="nav-link text-gray-300 hover:text-white transition-colors duration-200"
                          >
                            Home
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="nav-link text-gray-300 hover:text-white transition-colors duration-200"
                          >
                            About
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="nav-link text-gray-300 hover:text-white transition-colors duration-200"
                          >
                            Services
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => setIsOpen(false)}
                            className="nav-link text-gray-300 hover:text-white transition-colors duration-200"
                          >
                            Contact
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>

                <section
                  ref={textRef1}
                  className=" relative flex flex-col items-center justify-end text-center gap-4 min-h-dvh w-dvw text-white px-6 pb-20 md:pb-32"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]">
                    Bound, <br className="hidden sm:block" /> Not Broken
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-[90%] sm:max-w-md md:max-w-xl leading-relaxed font-light">
                    Figures, one chain carved from the weight of a
                    history that tried to own them. This monument stands where
                    struggle became memory, and memory became freedom.
                  </p>
                </section>

                
                <section ref={textRef2} className="  flex flex-col  gap-6 min-h-dvh w-dvw text-white px-6 justify-center">
  {/* <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ctirad and Šárka</h2> */}

  <div className="flex gap-6">
    {(Object.keys(characterContent) as Array<"sarka" | "ctirad">).map((key) => (
      <button
        key={key}
        onClick={() => setActiveCharacter(key)}
        className={`text-lg md:text-2xl font-semibold uppercase tracking-wide transition-colors ${
          activeCharacter === key ? "text-white" : "text-gray-500 hover:text-gray-300"
        }`}
      >
        {characterContent[key].label}
      </button>
    ))}
  </div>

  <p className="text-sm md:text-base text-gray-300 max-w-md leading-relaxed font-light">
    {characterContent[activeCharacter].text}
  </p>
</section>

                <section
                  ref={textRef3}
                  className=" relative flex flex-col justify-center  gap-4 min-h-dvh w-dvw text-white px-6 pb-20 md:pb-32"
                >
                  <h1 className="text-2xl sm:text-3xl md:text-7xl lg:text-4xl font-bold tracking-tight leading-[0.95]">
                    Beethoven
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-[90%] sm:max-w-md md:max-w-xl leading-relaxed font-light">
                    Beethoven composed some of music's most enduring works while going progressively deaf a condition that isolated him from the very art he lived for. Rather than surrender to silence, he composed some of his most towering pieces, including his Ninth Symphony, after losing his hearing almost entirely. His life became a testament to creation in defiance of loss, resolve outlasting the body's betrayal.
                  </p>
                </section>

                 <section
                  
                  className="relative min-h-dvh w-dvw"
>
                  <ExhibitMap/>
                  
                </section>

                <section
                  
                  className="relative min-h-dvh w-dvw"
>
                  <ClosingSection/>
                  
                </section>

                 
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
