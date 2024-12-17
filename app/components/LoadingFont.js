import { Raleway } from "next/font/google";

const loading = Raleway({ weight: "400", subsets: ['latin'] });

export default function LoadingFont({ text }) {
    return <span className={loading.className}>{text}</span>
}