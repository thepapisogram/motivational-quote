"use client"
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Picker from 'react-mobile-picker'
import Aos from 'aos'
import 'aos/dist/aos.css';
import RubikFont from './components/RubikFont'
import Link from 'next/link'
import CanvasAnimation from './components/CanvasAnimation'
import LoadingFont from './components/LoadingFont'

const selections = {
    quote: [
        "age", "alone", "amazing", "anger", "architecture", "art", "attitude", "beauty",
        "best", "birthday", "business", "car", "change", "communication", "computers",
        "cool", "courage", "dad", "dating", "death", "design", "dreams", "education",
        "environmental", "equality", "experience", "failure", "faith", "family", "famous",
        "fear", "fitness", "food", "forgiveness", "freedom", "friendship", "funny", "future",
        "god", "good", "government", "graduation", "great", "happiness", "health", "history",
        "home", "hope", "humor", "imagination", "inspirational", "intelligence", "jealousy",
        "knowledge", "leadership", "learning", "legal", "life", "love", "marriage", "medical",
        "men", "mom", "money", "morning", "movies", "success"
    ]
}

export default function Home() {

    const [phase1, setPhase1] = useState(true);
    const [phase2, setPhase2] = useState(false);
    const [phase3, setPhase3] = useState(false);
    const [phase4, setPhase4] = useState(false);
    const [phase5, setPhase5] = useState(false);
    const [phase6, setPhase6] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setPhase1(false);
            setPhase2(true);
            setTimeout(() => {
                setPhase2(false);
                setPhase3(true);
                setTimeout(() => {
                    setPhase3(false);
                    setPhase4(true);
                    setTimeout(() => {
                        // setPhase4(false);
                        setPhase5(true);
                        setTimeout(() => {
                            setPhase5(false);
                            setPhase6(true);
                            setTimeout(() => {
                                setLoading(false);
                            }, 2000)
                        }, 1000);
                    }, 2000);
                }, 700)
            }, 2000);
        }, 2000);
        Aos.init();
    }, [])
    
    const [pickerValue, setPickerValue] = useState({
        quote: 'happiness'
    })

    return (
        <>
            {loading && (
                <div className={clsx("fixed top-0 left-0 flex flex-col gap-5 items-center justify-center h-full w-full duration-700 transition-all select-none", {
                    "bg-zinc-950": phase1,
                    "bg-white": phase2,
                    "bg-gradient-to-br from-green-700 to-green-900": phase6
                })}>
                    <div data-aos="fade-down" data-aos-duration="1000">
                        <h1 className={clsx("text-4xl md:text-6xl font-bold tracking-wide duration-700 transition-all", {
                            "text-orange-500": phase1,
                            "text-green-600": phase2,
                            "opacity-0": phase3,
                            "hidden": phase4
                        })}>
                            <RubikFont text="Quotable" />
                        </h1>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000">
                        <h1 className={clsx("text-xl font-bold tracking-widest duration-700 capitalize transition-all", {
                            "text-white": phase1,
                            "text-green-600": phase2,
                            "opacity-0": phase3,
                            "hidden": phase4
                        })}>
                            <LoadingFont text="Be happy with Quotable" />
                        </h1>
                    </div>
                    {phase4 && (
                        <span data-aos="zoom-in" data-aos-duration="1000" className={clsx("loading loading-infinity loading-lg text-green-600", {
                            "opacity-0": phase5,
                            "hidden": phase6
                        })}></span>
                    )}
                </div>
            )}
            {phase6 && (
                <CanvasAnimation />
            )}
            {!loading && (
            <>
            <main className="flex flex-col items-center justify-center fixed top-0 left-0 h-full w-full z-20 select-none">
                <div data-aos="fade-in" data-aos-duration="1000" className="papi-container">
                    <div className="flex flex-col gap-3 text-center p-5">
                        <h1 data-aos="slide-down" data-aos-duration="1000" className="text-4xl md:text-6xl font-bold text-green-700 tracking-wide"><RubikFont text="Quotable" /></h1>
                        <p data-aos="slide-up" data-aos-duration="1000" className="text-lg md:text-xl">Choose Quote Category</p>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="1000" data-aos-duration="1000" className='flex flex-col items-center my-5'>
                        <Picker className='w-11/12 md:w-96' value={pickerValue} onChange={setPickerValue} height={250} wheelMode='natural'>
                            {Object.keys(selections).map(name => (
                                <Picker.Column key={name} name={name}>
                                    {selections[name].map(option => (
                                        <Picker.Item className={clsx("duration-200 text-lg transition-all capitalize", {
                                            "text-green-700 tracking-widest font-bold text-xl border-y-2 border-green-700": option === pickerValue.quote
                                        })} key={option} value={option}>
                                            {option}
                                        </Picker.Item>
                                    ))}
                                </Picker.Column>
                            ))}
                        </Picker>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000" data-aos-offset="-5900" data-aos-delay="1000">
                        <Link href={`/quote?category=${pickerValue.quote}`} className='block mx-auto text-center border-2 border-green-700 hover:border-green-700 text-green-700 hover:bg-green-700 hover:text-white py-2 w-9/12 rounded-full duration-500 transition-all hover:rounded-t-none'>Proceed</Link>
                    </div>
                </div>
            </main>
            </>
            )}
        </>
    );
}