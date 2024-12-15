"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import CanvasAnimation from "./components/CanvasAnimation";

export default function Home() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    // const category = "happiness";
    try {
      // const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      const response = await axios.get(`https://api.api-ninjas.com/v1/quotes`, {
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
    fetchQuote();
  }, []);

  return (
    <>
      <CanvasAnimation />
      <main className="flex flex-col fixed top-0 left-0 h-full w-full bg-transparent z-20">
        <div className={clsx("my-auto mx-auto p-10 rounded-2xl drop-shadow-lg bg-white dark:bg-zinc-950 backdrop-blur-md w-11/12 md:w-6/12 lg:w-4/12 xl:w-5/12 duration-500 transition-all",
          {
            "-rotate-6 bg-opacity-30 dark:bg-opacity-30": loading,
            "bg-opacity-80 dark:bg-opacity-80": !loading
          }
        )}>
          <h1 className="text-center text-3xl font-bold dark:text-green-600 tracking-wide">Motivational Quotes</h1>
          {!loading && (
            <section className="my-5">
              <blockquote className="text-center text-lg dark:text-white dark:opacity-70">{`"${quote.quote}"`}</blockquote>
              <p className="mt-3 text-lg text-right font-bold dark:text-green-600">{`- ${quote.author}`}</p>
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
            <button onClick={fetchQuote} className="bg-green-800 hover:bg-green-950 duration-400 text-white p-2 px-10 rounded-full transition-all">Refresh</button>
            <p className="mt-4 text-center opacity-50 dark:opacity-20 tracking-widest font-bold text-black dark:text-white">Developed by Anthony Saah</p>
          </div>
        </div>
      </main>
    </>
  );
}