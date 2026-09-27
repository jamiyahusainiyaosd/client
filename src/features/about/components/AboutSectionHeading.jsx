const AboutSectionHeading = ({ eyebrow, title, description, centered = false }) => (
  <div className={`mb-5 ${centered ? "mx-auto max-w-2xl text-center" : ""}`}>
    <span className="block text-[11px] font-bold tracking-wide text-emerald-700">{eyebrow}</span>
    <h2 className="mt-1 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">{title}</h2>
    {description && <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">{description}</p>}
    {!centered && <span className="mt-2 block h-1 w-14 rounded-full bg-emerald-700" />}
  </div>
);

export default AboutSectionHeading;
