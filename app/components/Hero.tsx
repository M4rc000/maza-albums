"use client"
import { useState, useEffect } from 'react';

export default function Hero() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Trigger animation after the component is mounted
        setLoaded(true);
    }, []);

    return (
        <div className={`relative isolate px-6 pt-14 lg:px-8 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} transition-all duration-1000`}>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl py-20 sm:py-40 lg:py-48">
                <div className="text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-gray-300 sm:text-7xl">
                        Happy with u, and ending with u
                    </h1>
                    <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                        Beauty is not only seen on the outside, but also in every little moment between us. We don&apos;t just write stories, we flow in a symphony of love.
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500 sm:text-xl">
                        Bee x Bubba – forever
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="#"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Get started
                        </a>
                    </div>
                </div>
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
                <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                />
            </div>
        </div>
    );
}