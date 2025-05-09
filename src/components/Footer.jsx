import React from "react";
import { FaFacebookF } from "react-icons/fa";
import qrCodeImage from "/qr-code.png";

const Footer = () => {
  return (
    <footer className="p-4 py-10 mt-10 bg-white dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-[1244px] mx-auto w-[100%] justify-items-center container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
        {/* Services Section */}
        <div className="flex flex-col items-center lg:items-start">
          <h6 className="text-lg font-bold mb-3 text-black dark:text-white">
            গুরুত্বপূর্ণ লিংকসমূহ
          </h6>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://www.wifaqbd.org/"
                className="underline text-black dark:text-white"
                target="_blank"
              >
                বেফাকুল মাদারিসিল আরাবিয়া বাংলাদেশ
              </a>
            </li>
            <li>
              <a
                href="https://mibd.org/"
                className="underline text-black dark:text-white"
                target="_blank"
              >
                মুআসসাসা ইলমিয়্যাহ বাংলাদেশ
              </a>
            </li>
            <li>
              <a
                href="https://www.alkawsar.com/bn/"
                className="underline text-black dark:text-white"
                target="_blank"
              >
                মাসিক আল কাউসার
              </a>
            </li>
            <li>
              <a
                href="https://ilmdrive.com/risalatul-islam-bd/"
                className="underline text-black dark:text-white"
                target="_blank"
              >
                রিসালাতুল ইসলাম বাংলাদেশ
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/@RisalatulIslamBD/playlists"
                className="underline text-black dark:text-white"
                target="_blank"
              >
                রিসালাতুল ইসলাম বাংলাদেশ, ইউটিউব
              </a>
            </li>
          </ul>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center lg:items-start">
          <h6 className="text-lg font-bold mb-3 text-black dark:text-white whitespace-nowrap">
            স্ক্যান করুন
          </h6>
          <img
            className="w-52 h-52 md:w-52 md:h-52 rounded-lg border"
            src={qrCodeImage}
            alt="qr code"
          />
        </div>

        {/* Contact Section */}
        <div className="flex flex-col items-center lg:items-start">
          <h6 className="text-lg font-bold mb-3 text-black dark:text-white">
            যোগাযোগ
          </h6>
          <ul className="space-y-2 text-sm">
            <li className="font-bold whitespace-nowrap text-black dark:text-white">
              ই-মেইল : jamiyahusainiya1@gmail.com
            </li>
            <li className="font-bold text-black dark:text-white">
              মোবাইল নাম্বার: +8801751699909
            </li>
            <li className="font-bold text-black dark:text-white">
              পূবালী ব্যাংক একাউন্ট নাম্বার : 3070101040683
            </li>
            <li className="font-bold text-black dark:text-white">
              শায়েস্তাগঞ্জ, হবিগঞ্জ ব্রাঞ্চ : BS25-C-0717526 TO BS25-C-0717550
            </li>
            <a
              target="_blank"
              href="https://www.google.com/maps/place/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B9%E0%A7%81%E0%A6%B8%E0%A6%BE%E0%A6%87%E0%A6%A8%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B6%E0%A6%BE%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%BE%E0%A6%97%E0%A6%9E%E0%A7%8D%E0%A6%9C+%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A6%BE/@24.2693785,91.4727988,17z/data=!3m1!4b1!4m6!3m5!1s0x37515de9b5a6340d:0xe3c553d2f7510f3!8m2!3d24.2693736!4d91.4753737!16s%2Fg%2F11hf6dfc7z?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D"
            >
              <li className="font-bold underline text-black dark:text-white">
                শায়েস্তাগঞ্জ হবিগঞ্জ, সিলেট, বাংলাদেশ
              </li>
            </a>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center lg:items-start">
          <h6 className="text-lg font-bold mb-3 text-black dark:text-white">
            ফলো করুন
          </h6>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=61573036155447"
              target="_blank"
              className="text-4xl text-black dark:text-white hover:opacity-80 transition-opacity"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center border-t pt-4 border-black dark:border-white text-sm">
        <p className="font-bold text-sm text-black dark:text-white">
          &copy; {new Date().getFullYear()} জামিয়া হুসাইনিয়া শায়েস্তাগঞ্জ,
          হবিগঞ্জ
        </p>
        <br />
        <p className="text-black dark:text-white">
          ওয়েব সাইট বিকাশ করেছেন{" "}
          <a
            target="_blank"
            className="underline font-bold text-black dark:text-white"
            href="https://najmusshakib.netlify.app/"
          >
            নাজমুস সাকিব
          </a>{" "}
          &{" "}
          <a
            target="_blank"
            href="https://abdullah00001.github.io/abdullah-portfolio/"
            className="font-bold text-black dark:text-white underline"
          >
            আব্দুল্লাহ বিন ওমর চৌধুরী
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
