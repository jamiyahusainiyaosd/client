import React from 'react';

const Marquee = () => {
    return (
        <div>
            <marquee behavior="scroll" direction="left">
                <h1 className="text-2xl font-bold">
                    <span>জামিয়া হুসাইনিয়া </span>
                    <span> মাদ্রাসায় আপনাকে স্বাগতম।</span>
                </h1>
            </marquee>
        </div>
    );
};

export default Marquee;