"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import clsx from "clsx";
import CanvasAnimation from "../components/CanvasAnimation";
import Link from "next/link";
import Aos from "aos";
import LoadingFont from "../components/LoadingFont";
import Image from "next/image";

export default function Home () {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useSearchParams();
  const category = params.get('category');

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
        headers: { "X-Api-Key": "TSachIi2Fnqhq/aDCmif0w==kwf8v9w6p6jiSvl4" },
      });
      setQuote(response.data[0]); // Assuming the API returns an array of quotes
      setLoading(false)
    } catch (err) {
      setLoading(false);
      setError(err.response ? err.response.data : "An error occurred");
    }
  };

  const handleSpeak = () => {
    if (!window.speechSynthesis) {
      alert("Sorry, your browser does not support text-to-speech.");
      return;
    }

    const text = `${quote.quote}. By ${quote.author}`;
    if (!text) {
      alert("No text found to read!");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US"; // Set the language (e.g., "en-US" for English)
    utterance.rate = 1; // Set the speed of the speech
    utterance.pitch = 1; // Set the pitch of the speech

    window.speechSynthesis.speak(utterance);
  };


  useEffect(() => {
    Aos.init();
    fetchQuote();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CanvasAnimation />
      <main data-aos="fade-in" data-aos-duration="1000" className="flex flex-col fixed top-0 left-0 h-full w-full bg-white bg-opacity-0 z-20">
        <div className={clsx("my-auto mx-auto p-10 rounded-2xl drop-shadow-lg bg-white dark:bg-zinc-950 backdrop-blur-md w-11/12 md:w-6/12 lg:w-4/12 xl:w-5/12 duration-500 transition-all",
          {
            "scale-90 bg-opacity-30 dark:bg-opacity-30": loading,
            "bg-opacity-70 dark:bg-opacity-80": !loading
          }
        )}>
          <h1 className="text-center text-3xl font-bold dark:text-green-600 tracking-wide capitalize"><LoadingFont text={`${category} Quotes`} /></h1>
          {!loading && (
            <section className="my-5">
              <blockquote data-aos="fade-in" data-aos-duration="500" className="text-justify text-lg dark:text-white dark:opacity-70">{`"${quote.quote}"`}</blockquote>
              <div className="flex items-center justify-between mt-2">
                <div data-aos="fade-in" data-aos-duration="500" onClick={handleSpeak} className="cursor-pointer flex items-center justify-center gap-x-2 font-bold">
                  <Image className="flex items-center" src="/speaker.webp" width={30} height={30} alt="speaker" />
                  <p className="text-green-950">Read Quote</p>
                </div>
                <p data-aos="fade-up" data-aos-duration="500" className="text-lg text-right font-bold text-green-900 dark:text-green-600">{`${quote.author}`}</p>
              </div>
            </section>
          )}
          {loading && (
            <div className="flex flex-col items-center gap-2 my-5">
              <span className="loading loading-bars loading-sm"></span>
              <div className="skeleton bg-green-950 opacity-80 h-4 w-full mt-3"></div>
              <div className="skeleton bg-green-950 opacity-80 h-4 w-full"></div>
              <div className="skeleton bg-green-950 opacity-80 h-4 w-full"></div>
              <div className="skeleton bg-green-950 opacity-80 h-4 w-full"></div>
            </div>
          )}
          <div className="grid">
            {!loading && (
              <audio autoPlay loop preload="auto">
                <source src="/sound.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            <div className="grid grid-cols-2 justify-center gap-x-2 md:gap-x-5">
              <Link href="/" className="bg-green-800 hover:bg-green-950 text-center duration-400 text-white p-2 drop-shadow-md rounded-full transition-all">Change Quote</Link>
              <button onClick={fetchQuote} className="bg-green-800 hover:bg-green-950 duration-400 text-white p-2 drop-shadow-md rounded-full transition-all">Next Quote</button>
            </div>
            <p onClick={() => document.getElementById('members').showModal()} className="mt-4 w-max mx-auto tracking-widest text-green-900 opacity-70 hover:bg-green-800 hover:text-white p-2 px-4 rounded-full dark:text-white cursor-pointer transition-all">View Developers</p>
          </div>
        </div>
      </main>

      <dialog id="members" className="modal">
        <div className="modal-box p-10 bg-green-950">
          <h3 className="font-bold text-lg text-center text-white uppercase tracking-widest">Developed By Group 5</h3>
          <div className="grid grid-cols-2 text-center gap-2 mt-5">
            <p className="rounded-full p-2 bg-green-900 text-white">Osborn</p>
            <p className="rounded-full p-2 bg-green-900 text-white">Caleb</p>
            <p className="rounded-full p-2 bg-green-900 text-white">Boateng</p>
            <p className="rounded-full p-2 bg-green-900 text-white">Emmanuella</p>
            <p className="rounded-full p-2 bg-green-900 text-white">Forson</p>
            <p className="rounded-full p-2 bg-green-900 text-white">Success</p>
            <p className="rounded-full p-2 bg-green-900 text-white">Favour</p>
            <p className="rounded-full p-2 bg-green-900 text-white">Benita</p>
            <p className="col-span-2 rounded-full p-2 bg-green-900 text-white">Anthony</p>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}