import mapImage from "/map.png";

const ContactUsLeftDiv = () => {
  return (
    <div className="w-full lg:w-1/2 h-full">
      <div className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-900 dark:border-gray-500 h-full transition-all duration-300">
        <img 
          src={mapImage} 
          alt="Google Map" 
          className="w-full h-full min-h-[500px] object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
          <a className="text-white underline" target="_blank" href="https://www.google.com/maps/place/%E0%A6%9C%E0%A6%BE%E0%A6%AE%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B9%E0%A7%81%E0%A6%B8%E0%A6%BE%E0%A6%87%E0%A6%A8%E0%A6%BF%E0%A6%AF%E0%A6%BC%E0%A6%BE+%E0%A6%B6%E0%A6%BE%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A6%BE%E0%A6%97%E0%A6%9E%E0%A7%8D%E0%A6%9C+%E0%A6%AE%E0%A6%BE%E0%A6%A6%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%B8%E0%A6%BE/@24.2693785,91.4727988,17z/data=!3m1!4b1!4m6!3m5!1s0x37515de9b5a6340d:0xe3c553d2f7510f3!8m2!3d24.2693736!4d91.4753737!16s%2Fg%2F11hf6dfc7z?entry=ttu&g_ep=EgoyMDI1MDQwOS4wIKXMDSoASAFQAw%3D%3D">
            <h3 className="text-2xl font-bold mb-2">আমাদের অবস্থান</h3>
            <p className="text-gray-200">শায়েস্তাগঞ্জ, হবিগঞ্জ, সিলেট</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUsLeftDiv;