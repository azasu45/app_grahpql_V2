import Image from 'next/image';
import Link from 'next/link';
import { Philosopher, Roboto } from 'next/font/google';

const philosopher = Philosopher({
   subsets: ['latin'],
   display: 'swap',
   weight: ['700', '400'],
});

const roboto = Roboto({
   subsets: ['latin'],
   display: 'swap',
   weight: ['700', '400'],
});

export default async function Home() {
   return (
      <section
         className='h-screen relative'
         style={{
            background: "url('/hero-bg.png') center bottom no-repeat",
            backgroundSize: '100%',
         }}
      >
         <div className='absolute inset-0 flex justify-center items-center flex-col text-center -mt-3'>
            <h1
               className={`${philosopher.className} text-3xl leading-9 font-bold mb-3 text-[#055B66] md:text-6xl md:leading-[56px]`}
            >
               Bienvenido a PayMonitor
            </h1>
            <h2
               className={`text-tremor-content text-lg leading-6 mb-8 md:text-xl ${roboto.className}`}
            >
               Notificación de los pagos que recibes<br></br>
               ... todo ordenadito.
            </h2>
            <Image
               src={'/hero-img.png'}
               alt='Hero Imgs'
               className='max-w-[95%] mb-7'
               width={356}
               height={184}
            />
            <Link
               className={`${roboto.className} rounded-[50px] uppercase font-normal text-sm tracking-[1px] inline-block px-9 py-3 mb-8 border-2 border-solid border-[#52D8EA] bg-tremor-background text-[#0CCA]`}
               href={{
                  pathname: 'paymonitor',
               }}
               replace
            >
               COMENZAR
            </Link>
         </div>
      </section>
   );
}
