import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

const Background = ({theme}) => {
    const vantaRef = useRef(null);
    const [vantaEffect, setVantaEffect] = useState(null);

    useEffect(() => {
        const bgColor = theme === 'dark' ? 0x1e1e1e : 0xf7f7f7;
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: vantaRef.current,
                THREE,
                color: 0x8888ff,
                backgroundColor: bgColor,
                points: 10.0,
                maxDistance: 20.0,
                spacing: 15.0
            }));
        }

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect, theme]);

    return (
        <div
            ref={vantaRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                width: '100%',
                height: '100%',
            }}
        />
    );
};

export default Background;