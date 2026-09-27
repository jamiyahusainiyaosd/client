import { useState, useEffect } from "react";

const MobileInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (installed PWA)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Capture beforeinstallprompt event (Chrome, Edge, Android)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsOpen(false);
    };

    // Listen for custom open event (e.g. triggered from mobile menu)
    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("open-pwa-install", handleCustomOpen);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("open-pwa-install", handleCustomOpen);
    };
  }, []);

  // Handle native install prompt click
  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        setDeferredPrompt(null);
        setIsOpen(false);
      }
    }
  };

  // If already installed, don't show the prompt
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE FLOATING BUTTON (Only on mobile: md:hidden)                        */}
      {/* ========================================================================= */}
      {!isDismissed && !isOpen && (
        <div className="md:hidden fixed bottom-6 left-4 z-40 flex items-center shadow-xl rounded-full bg-slate-900 border border-slate-700/60 p-0.5">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 pl-3.5 pr-2.5 py-2 text-white active:scale-95 transition-transform"
            aria-label="মোবাইলে অ্যাপ ইনস্টল করুন"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="material-symbols-outlined text-[19px] text-emerald-400">
              install_mobile
            </span>
            <span className="text-xs font-semibold tracking-wide">
              অ্যাপ ইনস্টল
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded-full transition-colors mr-1"
            title="লুকিয়ে রাখুন"
            aria-label="লুকিয়ে রাখুন"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INSTALLATION POPUP / MODAL                                                */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/70 backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-5 sm:p-6">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="বন্ধ করুন"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="flex items-center gap-3.5">
                <img
                  src="/icon-192.png"
                  alt="জামিয়া হুসাইনিয়া লোগো"
                  className="w-14 h-14 rounded-2xl bg-white p-1 shadow-md object-contain shrink-0"
                />
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold mb-1 border border-emerald-500/30">
                    অফিসিয়াল ওয়েব অ্যাপ
                  </span>
                  <h3 className="text-base sm:text-lg font-bold leading-snug">
                    জামিয়া হুসাইনিয়া মাদ্রাসা
                  </h3>
                  <p className="text-xs text-emerald-100/80">
                    শায়েস্তাগঞ্জ, হবিগঞ্জ
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Install Button */}
              <button
                type="button"
                onClick={handleNativeInstall}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[22px]">
                  download
                </span>
                <span>এখনই সরাসরি ইনস্টল করুন</span>
              </button>

              {/* Benefits list */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                  <span className="material-symbols-outlined text-emerald-600 text-[20px] block mb-1">
                    bolt
                  </span>
                  <span className="text-[11px] font-semibold text-slate-800 block">
                    তাত্ক্ষণিক লোড
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                  <span className="material-symbols-outlined text-emerald-600 text-[20px] block mb-1">
                    sd_storage
                  </span>
                  <span className="text-[11px] font-semibold text-slate-800 block">
                    কম স্টোরেজ
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl text-center border border-slate-100">
                  <span className="material-symbols-outlined text-emerald-600 text-[20px] block mb-1">
                    touch_app
                  </span>
                  <span className="text-[11px] font-semibold text-slate-800 block">
                    ১-ক্লিকে ওপেন
                  </span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 text-center transition-colors"
              >
                এখন নয়, পরে করব
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileInstallPrompt;
