"use client"
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Picker from 'react-mobile-picker'
import Aos from 'aos'
import 'aos/dist/aos.css';
import RubikFont from './components/RubikFont'
import Link from 'next/link'
import CanvasAnimation from './components/CanvasAnimation'

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

    useEffect(() => {
        Aos.init();
    }, [])

    const [pickerValue, setPickerValue] = useState({
        quote: 'happiness'
    })

    return (
        <>
            <CanvasAnimation />
            <main className="flex flex-col items-center justify-center fixed top-0 left-0 h-full w-full z-20">
                <div className="papi-container">
                    <div className="flex flex-col gap-3 text-center p-5">
                        <h1 data-aos="slide-down" data-aos-duration="1000" className="text-4xl md:text-6xl font-bold text-green-700 tracking-wide"><RubikFont text="Quotable" /></h1>
                        <p data-aos="slide-up" data-aos-duration="1000" className="text-lg md:text-xl">Choose Quote Category</p>
                    </div>
                    <div data-aos="zoom-in" data-aos-delay="1000" data-aos-duration="1000" className='flex flex-col items-center my-5'>
                        <Picker className='w-11/12 md:w-96 border-4' value={pickerValue} onChange={setPickerValue} height={250} wheelMode='natural'>
                            {Object.keys(selections).map(name => (
                                <Picker.Column key={name} name={name}>
                                    {selections[name].map(option => (
                                        <Picker.Item className={clsx("duration-200 text-lg transition-all", {
                                            "text-green-700 tracking-widest font-bold text-xl border-y-2": option === pickerValue.quote
                                        })} key={option} value={option}>
                                            {option}
                                        </Picker.Item>
                                    ))}
                                </Picker.Column>
                            ))}
                        </Picker>
                    </div>
                    <div data-aos="fade-up" data-aos-duration="1000" data-aos-offset="-5900" data-aos-delay="1000">
                        <Link href={`/quote?category=${pickerValue.quote}`} className='block mx-auto text-center border-2 border-green-700 hover:border-green-700 text-green-700 hover:bg-green-700 hover:text-white py-2 w-full rounded-full duration-500 transition-all'>Proceed</Link>
                    </div>
                </div>
            </main>
        </>
    );
}