"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import clsx from "clsx";
import CanvasAnimation from "../components/CanvasAnimation";
import Link from "next/link";
import Aos from "aos";
import LoadingFont from "../components/LoadingFont";

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

  useEffect(() => {
    Aos.init();
    fetchQuote();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CanvasAnimation />
      <main data-aos="fade-in" data-aos-duration="1000" className="flex flex-col fixed top-0 left-0 h-full w-full bg-transparent z-20">
        <div className={clsx("my-auto mx-auto p-10 rounded-2xl drop-shadow-lg bg-white dark:bg-zinc-950 backdrop-blur-md w-11/12 md:w-6/12 lg:w-4/12 xl:w-5/12 duration-700 transition-all",
          {
            "-rotate-3 bg-opacity-30 dark:bg-opacity-30": loading,
            "bg-opacity-70 dark:bg-opacity-80": !loading
          }
        )}>
          <h1 className="text-center text-3xl font-bold dark:text-green-600 tracking-wide capitalize"><LoadingFont text={`${category} Quotes`} /></h1>
          {!loading && (
            <section className="my-5">
              <blockquote data-aos="fade-in" data-aos-duration="500" className="text-justify text-lg dark:text-white dark:opacity-70">{`"${quote.quote}"`}</blockquote>
              <p data-aos="fade-right" data-aos-duration="500" className="mt-3 text-lg text-right font-bold tracking-widest text-black dark:text-green-600">{`~ ${quote.author}`}</p>
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
            <p className="mt-4 text-center opacity-50 dark:opacity-20 tracking-widest font-bold text-black dark:text-white"><LoadingFont text="Developed by Group 5" /></p>
          </div>
        </div>
      </main>
    </>
  );
}