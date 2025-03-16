import React from "react";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import qrCodeImage from '/qr-code.png';

const Footer = () => {
    return (
        <footer className="p-4 text-white py-8 mt-10" style={{ backgroundColor: '#111' }}>
            <div className="max-w-[1244px] mx-auto w-[100%] justify-items-center container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">

                {/* Services Section */}
                <div className="flex flex-col items-center lg:items-start">
                    <h6 className="text-lg font-semibold mb-3">গুরুত্বপূর্ণ লিংকসমূহ</h6>
                    <ul className="space-y-2">
                        <li><a href="https://www.wifaqbd.org/" className="hover:text-gray-400 underline" target="_blank">বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ</a></li>
                        <li><a href="https://mibd.org/" className="hover:text-gray-400 underline" target="_blank">মুআসসাসা ইলমিয়্যাহ বাংলাদেশ</a></li>
                        <li><a href="https://www.alkawsar.com/bn/" className="hover:text-gray-400 underline" target="_blank">মাসিক আল কাউসার</a></li>
                        <li><a href="https://ilmdrive.com/risalatul-islam-bd/" className="hover:text-gray-400 underline" target="_blank">রিসালাতুল ইসলাম বাংলাদেশ</a></li>
                        <li><a href="https://www.youtube.com/@RisalatulIslamBD/playlists" className="hover:text-gray-400 underline" target="_blank">রিসালাতুল ইসলাম বাংলাদেশ, ইউটিউব</a></li>
                    </ul>
                </div>

                {/* QR Code Section */}
                <div className="flex flex-col items-center lg:items-start">
                    <h6 className="text-lg font-semibold mb-3 whitespace-nowrap">স্ক্যান করুন</h6>
                    <img className="w-52 h-52 md:w-52 md:h-52" src={qrCodeImage} alt="qr code" />
                </div>

                {/* Contact Section */}
                <div className="flex flex-col items-center lg:items-start">
                    <h6 className="text-lg font-semibold mb-3">যোগাযোগ</h6>
                    <ul className="space-y-2">
                        <li className="font-bold whitespace-nowrap">ই-মেইল : jamiyahusainiya1@gmail.com</li>
                        <li className="font-bold">মোবাইল নাম্বার: +8801751699909</li>
                        <li className="font-bold">ব্যাংক একাউন্ট: 3070101040683</li>
                        <li className="font-bold">BS25-C-0717526 TO BS25-C-0717550</li>
                        <a target="_blank" href="https://www.google.com/maps/place/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B9%E0%A7%81%E0%A6%B8%E0%A6%BE%E0%A6%87%E0%A6%A8%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B6%E0%A6%BE%E0%A7%9F%E0%A7%87%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%BE%E0%A6%97%E0%A6%9E%E0%A7%8D%E0%A6%9C+%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A6%BE/">
                            <li className="font-bold underline">শায়েস্তাগঞ্জ হবিগঞ্জ, সিলেট, বাংলাদেশ</li>
                        </a>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="flex flex-col items-center lg:items-start">
                    <h6 className="text-lg font-semibold mb-3">ফলো করুন</h6>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/profile.php?id=61573036155447" target="_blank" className="hover:text-gray-400 text-2xl"><FaFacebookF /></a>
                        <a href="https://github.com/jamiyahusainiyaosd" target="_blank" className="hover:text-gray-400 text-2xl"><FaGithub /></a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 text-center border-t border-gray-700 pt-4">
                <p className="text-gray-400 font-bold text-sm">
                    &copy; {new Date().getFullYear()} জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ হবিগঞ্জ
                </p>
                <br />
                <p className="text-gray-400 text-sm">
                    ওয়েব সাইট বিকাশ করেছেন <a target="_blank" className="underline font-bold" href="https://nazmus-shakib.netlify.app/">নাজমুস সাকিব</a> & আব্দুল্লাহ বিন ওমর চৌধুরী
                </p>
            </div>
        </footer>
    );
};

export default Footer;