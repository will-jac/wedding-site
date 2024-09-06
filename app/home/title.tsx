import { Rouge_Script } from 'next/font/google'
 
const rougeScript = Rouge_Script({ 
    weight: "400",
    subsets: ['latin'],
});

export interface TitleProps {
    
};

export default function Title(props: React.PropsWithChildren<TitleProps>) {

    return (
        <span 
            className={rougeScript.className + " text-9xl text-teal-700 font-bold"}
        >
            {props.children}
        </span>
    );
}