// Material Icons SVGs for Google Meet style controls
export const MicIcon = ({off = false, ...props}: {off?: boolean} & React.SVGProps<SVGSVGElement>) => off ? (
  <svg {...props} viewBox="0 0 24 24" fill="none" width="28" height="28">
    <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#fff"/>
    <line x1="3" y1="3" x2="21" y2="21" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
  </svg>
) : (
  <svg {...props} viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-2.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#fff"/></svg>
);

export const VideoIcon = ({off = false, ...props}: {off?: boolean} & React.SVGProps<SVGSVGElement>) => off ? (
  <svg {...props} viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M21 6.5l-4 4V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4V6.5z" fill="#fff"/><line x1="2" y1="2" x2="22" y2="22" stroke="#fff" strokeWidth="2"/></svg>
) : (
  <svg {...props} viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M17 10.5V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3.5l4 4v-11l-4 4z" fill="#fff"/></svg>
);

export const CallEndIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" width="28" height="28">
    <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08a.996.996 0 0 1 0-1.41C2.93 9.03 7.3 7.5 12 7.5s9.07 1.53 11.71 4.17c.39.39.39 1.02 0 1.41l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.1-.7-.28-.79-.73-1.68-1.36-2.66-1.85-.33-.16-.56-.51-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" fill="#fff"/>
  </svg>
);

export const LinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" width="28" height="28"><path d="M3.9 12a5 5 0 0 1 5-5h4a1 1 0 1 1 0 2h-4a3 3 0 1 0 0 6h4a1 1 0 1 1 0 2h-4a5 5 0 0 1-5-5zm7-1a1 1 0 0 1 1-1h4a5 5 0 1 1 0 10h-4a1 1 0 1 1 0-2h4a3 3 0 1 0 0-6h-4a1 1 0 0 1-1-1z" fill="#fff"/></svg>
);
