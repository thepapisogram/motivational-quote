import { Rubik_Dirt } from "next/font/google";

const rubik = Rubik_Dirt({ weight: "400", subsets: ['latin']});

export default function RubkiFont({ text }){
    return <span className={rubik.className}>{text}</span>
}