"use client"
import { useState, useEffect } from 'react';

export default function PhotosHero() {
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
                        Where light paints your memories.
                    </h1>
                    <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                        Every picture is a journey through time.
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-500 sm:text-xl pb-10">
                        Let your photos speak when words fade.
                    </p>
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