import Image from "next/image";
import bg from "./background-image.png";


export default function Background() {
    return (
        <Image
            src={bg}
            alt="Floral background image"
            quality="100"
            layout="fill"
            objectFit="cover"
            className="bg-repeat z-0"
        />
    )
}