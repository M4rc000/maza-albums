"use client"
import { useState, useEffect } from 'react';

export default function AboutHero() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Trigger animation after the component is mounted
        setLoaded(true);
    }, []);

    return (
        <div className={`relative isolate px-6 pt-10 lg:px-8 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} transition-all duration-1000`}>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl py-10 sm:py-20 lg:py-38">
                <div className="text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-gray-300 sm:text-7xl">
                        Our Love, Our Story From the first glance to forever.
                    </h1>
                    <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                        This is more than just a story—it&apos;s the rhythm of us, a journey written in love.
                    </p>
                </div>
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"/>
            </div>
        </div>
    );
}