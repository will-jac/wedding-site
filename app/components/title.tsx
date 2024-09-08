// import { Rouge_Script } from 'next/font/google'
import { Tangerine } from 'next/font/google'
 
const font = Tangerine({ 
    weight: "700",
    subsets: ['latin'],
});

export interface TitleProps {
    
};

export default function Title(props: React.PropsWithChildren<TitleProps>) {

    return (
        <span 
            className={font.className + " text-6xl md:text-8xl text-emerald-600 font-bold"}
        >
            {props.children}
        </span>
    );
}