// import { Rouge_Script } from 'next/font/google'
// import { Tangerine } from 'next/font/google'
import { Mrs_Saint_Delafield } from 'next/font/google'
 
// const font = Tangerine({ 
//     weight: "700",
//     subsets: ['latin'],
// });

const font = Mrs_Saint_Delafield({weight: "400", subsets: ['latin']});
export interface TitleProps {
    
};

export default function Title(props: React.PropsWithChildren<TitleProps>) {

    return (
        <span 
            className={font.className + " text-5xl md:text-7xl lg:text-8xl text-[#879b88] font-bold"}
            // className={font.className + " text-5xl md:text-7xl lg:text-8xl text-[#879b88] font-bold"}
        >
            {props.children}
        </span>
    );
}