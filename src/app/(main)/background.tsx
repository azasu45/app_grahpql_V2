'use client';
import React from 'react';
import './styles.css';
import anime from 'animejs';

function Background() {
   const [windowSize, setWindowSize] = React.useState([
      window.innerWidth,
      window.innerHeight,
   ]);

   const [num] = React.useState<number>(60);

   const starryNight = () => {
      anime({
         targets: ['#sky .star'],
         opacity: [
            {
               duration: 700,
               value: '0',
            },
            {
               duration: 700,
               value: '1',
            },
         ],
         easing: 'linear',
         loop: true,
         delay: (el, i: number) => 50 * i,
      });
   };
   const shootingStars = () => {
      anime({
         targets: ['#shootingstars .wish'],
         easing: 'linear',
         loop: true,
         delay: (el, i: number) => 1000 * i,
         opacity: [
            {
               duration: 700,
               value: '1',
            },
         ],
         width: [
            {
               value: '150px',
            },
            {
               value: '0px',
            },
         ],
         translateX: 350,
      });
   };

   const randomRadius = () => {
      return Math.random() * 0.7 + 0.6;
   };
   const getRandomX = () => {
      return Math.floor(Math.random() * Math.floor(windowSize[0])).toString();
   };
   const getRandomY = () => {
      return Math.floor(Math.random() * Math.floor(windowSize[1])).toString();
   };

   React.useEffect(() => {
      starryNight();
      shootingStars();

      const handleWindowResize = () => {
         setWindowSize([window.innerWidth, window.innerHeight]);
      };

      window.addEventListener('resize', handleWindowResize);

      return () => {
         window.removeEventListener('resize', handleWindowResize);
      };
   }, []);

   return (
      <>
         <svg id='sky'>
            {[...Array(num)].map((x, y) => (
               <circle
                  cx={getRandomX()}
                  cy={getRandomY()}
                  r={randomRadius()}
                  stroke='none'
                  strokeWidth='0'
                  fill='white'
                  key={y}
                  className='star'
               />
            ))}
         </svg>
         <div id='shootingstars'>
            {[...Array(60)].map((x, y) => (
               <div
                  key={y}
                  className={'wish'}
                  style={{
                     left: `${getRandomY()}px`,
                     top: `${getRandomX()}px`,
                  }}
               />
            ))}
         </div>
      </>
   );
}

export default Background;
