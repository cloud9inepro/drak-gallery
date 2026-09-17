import { useRef } from "react";
import { OrbitControls,  useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// import { DraggableLight } from "./DraggableLight"
import { Freedom } from "./models/Freedom.jsx"
import { CtiradSarka } from "./models/CtiradSarka.jsx"
import { Beethoven } from "./models/Beethoven.jsx"
import type { Group, Mesh } from "three";
import type { RefObject } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint.ts";

type ExperienceProps = {
  textRef1: RefObject<HTMLElement>;
  textRef2: RefObject<HTMLElement>;
  textRef3: RefObject<HTMLElement>;
  activeCharacter: "sarka" | "ctirad";
};


export function Experience({ textRef1, textRef2, activeCharacter }: ExperienceProps) {
    const scroll = useScroll();
    const tl = useRef<gsap.core.Timeline | null>(null)
    const freedomRef = useRef<Mesh>(null);
    const model2Ref = useRef<Mesh>(null);
    const model3Ref = useRef<Mesh>(null);

    const statueRef = useRef<Group>(null);
  const rotationMap = { sarka: 0, ctirad: -0.6 };

 
 


    const { isMobile, isTablet } = useBreakpoint();
     const device = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
 const modelConfig = {
    // freedom: {
    //   mobile:  { scale: 0.035, position: [0, -0.3, 0.8] as const },
    //   tablet:  { scale: 0.05,  position: [-0.2, -0.1, 0.8] as const },
    //   desktop: { scale: 0.06,  position: [-0.4, 0, 0.8] as const },
    // },
    CtiradSarka: {
      mobile:  { scale: 1, position: [3.2, -0.1, -0.7] as const },
      tablet:  { scale: 1, position: [3.5, 0, -0.7] as const },
      desktop: { scale: 1,   position: [4, 0, -0.8] as const },
    },
    Beethoven: {
      mobile:  { scale: 0.6, position: [0, 0.3, 1] as const },
      tablet:  { scale: 0.8, position: [0, 0.3, 1] as const },
      desktop: { scale: 1,   position: [1.2, 0.3, 1] as const },
    },
  };
   

    useGSAP(()=>{
        if(!freedomRef.current || !model2Ref.current || !model3Ref.current) return;
        tl.current = gsap.timeline({paused: true})
        gsap.set([model2Ref.current.scale, model3Ref.current.scale], {x: 0, y: 0, z: 0})
        gsap.set([textRef1.current, textRef2.current], {opacity: 1, })

        tl.current
                    // section 1 - 2
            // .to(freedomRef.current.scale,{x: 0, y: 0, z: 0, duration: 1})
            .to(model2Ref.current.scale,{x: 1, y: 1, z: 1, duration:0.5}, '<')
            .to(freedomRef.current.position,{y: 5, opacity: 0 }, '<')
            .to(textRef1.current, {y: 60, opacity: 0, duration: 0.3}, '<')

              // section 2 - 3
            .to(model2Ref.current.scale,{x: 0, y: 0, z: 0, duration:0.5})
            .to(model3Ref.current.scale,{x: 1, y: 1, z: 1}, '<')
            .to(model2Ref.current.position,{y: 5, duration: 0.2 }, '<')
            .to(textRef2.current,{opacity: 1, color: "red"}, "<") 

            // section 3 - 4
            .to(model3Ref.current.scale, {x: 0, y:0, z:0,})
            // .to(model3Ref.current.position, { y:6,})

    });

    useGSAP(() => {
    if (!statueRef.current) return;
    gsap.to(statueRef.current.rotation, {
        y: rotationMap[activeCharacter],
        duration: 1,
        ease: "power2.inOut",
    });
}, [activeCharacter]);

    useFrame(()=>{
        if (tl.current) {
            tl.current.progress(scroll.offset)
        }
    })


  return (
    <>
    <ambientLight intensity={0.1}/>
    {/* <OrbitControls/> */}

  

    <Freedom 
     ref={freedomRef}
     scale={0.06}
     position={[-0.4, 0, 0.8]}
     rotation={[0, 0.3, 0]}
    />

<group
ref={statueRef}
>
<CtiradSarka
      ref={model2Ref}
      scale={1}
      position={modelConfig.CtiradSarka[device].position}
    />
</group>
    

    <Beethoven
      ref={model3Ref}
      // scale={5}
      position={modelConfig.Beethoven[device].position}
    />
     

      {/* <mesh ref={model3Ref} position={[0, 0, 0]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh> */}

    
    </>
  );
}
