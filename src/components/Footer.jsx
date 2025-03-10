import React from "react";
import { FaFacebookF, FaGithub } from "react-icons/fa";
import qrCodeImage from '/qr-code.png';

const Footer = () => {
    return (
        <footer className="p-2 text-white py-4" style={{ backgroundColor: '#111' }}>
            <div className="max-w-[1144px] w-[95%] mx-auto container grid grid-cols-1 sm:grid-cols-4  text-center">
                {/* Services Section */}
                <span className="flex flex-col items-center">
                    <h6 className="text-lg font-semibold mb-3">গুরুত্বপূর্ণ লিংকসমূহ</h6>
                    <ul className="space-y-2">
                        <li>
                            <a href="https://bmeb.gov.bd/" className="hover:text-gray-400 underline" target="_blank">বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড</a>
                        </li>
                        <li>
                            <a href="https://dme.gov.bd/" className="hover:text-gray-400 underline" target="_blank">বাংলাদেশ মাদ্রাসা শিক্ষা অধিদপ্তর</a>
                        </li>
                        <li>
                            <a href="http://iau.edu.bd/" className="hover:text-gray-400 underline" target="_blank">ইসলামি আরবি বিশ্ববিদ্যালয়</a>
                        </li>
                        <li>
                            <a href="https://moedu.portal.gov.bd/" className="hover:text-gray-400 underline" target="_blank">বাংলাদেশ শিক্ষা মন্ত্রনালয়</a>
                        </li>
                    </ul>
                </span>

                {/* Company Section */}
                <span className="flex flex-col items-center">
                    <h6 className="text-lg font-semibold mb-3 whitespace-nowrap">স্ক্যান করুন</h6>
                    <ul className="space-y-2">
                        <img className="w-32 h-32" src={qrCodeImage} alt="qr code" />
                    </ul>
                </span>

                {/* contact */}
                <span className="flex flex-col items-center">
                    <h6 className="text-lg font-semibold mb-3">যোগাযোগ</h6>
                    <ul className="space-y-2">
                        <li className="whitespace-nowrap font-bold">ই-মেইল :- jamiyahusainiya1@gmail.com</li>
                        <li className="font-bold">মোবাইল নাম্বার :- +8801751699909</li>
                        <li className="font-bold">ব্যাংক একাউন্ট নাম্বার :- 3070101040683</li>
                        <li className="font-bold">BS25-C-0717526 TO BS25-C-0717550</li>
                        <a target="_blank" href="https://www.google.com/maps/place/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B9%E0%A7%81%E0%A6%B8%E0%A6%BE%E0%A6%87%E0%A6%A8%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B6%E0%A6%BE%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%BE%E0%A6%97%E0%A6%9E%E0%A7%8D%E0%A6%9C+%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A6%BE/@24.2693136,91.4753582,51m/data=!3m1!1e3!4m15!1m8!3m7!1s0x37515c51962bb759:0x8a2d74aee05945ba!2z4KaV4KeB4Kaf4Ka_4Kaw4KaX4Ka-4KaB4KaT!3b1!8m2!3d24.269072!4d91.4761023!16s%2Fg%2F1hdzb0hb_!3m5!1s0x37515de9b5a6340d:0xe3c553d2f7510f3!8m2!3d24.2693736!4d91.4753737!16s%2Fg%2F11hf6dfc7z?entry=ttu&g_ep=EgoyMDI1MDMwMi4wIKXMDSoASAFQAw%3D%3D">
                            <li className="font-bold underline">শায়েস্তাগঞ্জ হবিগঞ্জ, সিলেট, বাংলাদেশ</li>
                        </a>
                    </ul>
                </span>

                {/* Social Media Section */}
                <span className="flex flex-col items-center">
                    <h6 className="text-lg font-semibold mb-3">ফলো করুন</h6>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/profile.php?id=61573036155447" target="_blank" className="hover:text-gray-400 text-2xl"><FaFacebookF /></a>
                        <a href="https://github.com/jamiyahusainiyaosd" target="_blank" className="hover:text-gray-400 text-2xl"><FaGithub /></a>
                    </div>
                </span>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 text-center border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} Hussainiya Madrasha Developd By <a target="_blank" className="underline font-bold" href="https://nazmus-shakib.netlify.app/">Nazmus Shakib</a> & <a target="_blank" className="underline font-bold" href="https://abdullah00001.github.io/abdullah-portfolio/">Abdullah Bin Omar Chudhary</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;