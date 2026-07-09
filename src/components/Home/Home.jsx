import { useEffect, useRef, useState } from 'react';
import './home.scss';
import useScrollAnimation from '../CustomHook';
import ResponsiveImage from '../ResponsiveImage';
import { HERO_IMAGE } from '../../utils/images';

// Resume modules are loaded on demand so only the selected PDF is shipped.
const resumeLoaders = {
  f: () => import('../../assets/docs/Engineer_Travis_Mikolay_Resume.pdf'),
  r: () => import('../../assets/docs/React_Travis_Mikolay_Resume.pdf'),
  x: () => import('../../assets/docs/UX_UI_Travis_Mikolay_Resume.pdf'),
  e: () => import('../../assets/docs/Engineer_Travis_Mikolay_Resume.pdf'),
};

const defaultProfile = {
  resumeKey: 'e',
  jobTitle: 'The Engineer',
  description:
    'Engineer with 10+ years of experience in crafting mobile-first, interactive websites and applications. Skilled in leading projects, collaborating with teams, and creating visually appealing, user-centric designs. Expert in web accessibility and responsive design, delivering high-quality solutions that meet client and company needs across devices.',
};

const resumeProfiles = {
  f: {
    resumeKey: 'f',
    jobTitle: 'Front End Engineer',
    description:
      'Front-End Engineer with 10+ years of experience in developing responsive, mobile-first websites and applications. Proficient in HTML, CSS, JavaScript, and modern frameworks, creating intuitive, user-centric interfaces. Skilled in collaborating with cross-functional teams, optimizing performance, and ensuring web accessibility, consistently delivering high-quality solutions that enhance user experiences and meet business goals.',
  },
  r: {
    resumeKey: 'r',
    jobTitle: 'React Engineer',
    description:
      'React Engineer with 10+ years of experience in front-end development, focused on creating interactive, mobile-first websites and applications. Expert in React, JavaScript, and modern front-end tools, delivering seamless, user-friendly interfaces. Skilled in integrating with backend systems and adhering to web accessibility standards, consistently providing high-quality, performant solutions.',
  },
  x: {
    resumeKey: 'x',
    jobTitle: 'UX/UI Engineer',
    description:
      'UI/UX Engineer with 10+ years of experience in crafting mobile-first, interactive websites and applications. Skilled in leading projects, collaborating with teams, and creating visually appealing, user-centric designs. Expert in web accessibility and responsive design, delivering high-quality solutions that meet client and company needs across devices.',
  },
  e: defaultProfile,
};

const PROFILE_ALT = 'Travis Mikolay';

function getProfileKeyFromUrl() {
  if (typeof window === 'undefined') return '';
  try {
    return new URLSearchParams(window.location.search).get('x')?.toLowerCase() || '';
  } catch {
    return '';
  }
}

const Home = () => {
  const scrollTab = useRef();
  useScrollAnimation();

  const selectedTitle = getProfileKeyFromUrl();
  const profile = resumeProfiles[selectedTitle] ?? defaultProfile;
  const { resumeKey, jobTitle, description } = profile;
  const downloadAriaLabel = `Download ${jobTitle} resume`;

  const [resumeUrl, setResumeUrl] = useState('');
  const [resumeStatus, setResumeStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    const loadResume = resumeLoaders[resumeKey] ?? resumeLoaders.e;

    setResumeStatus('loading');
    setResumeUrl('');

    loadResume()
      .then((mod) => {
        if (cancelled) return;
        setResumeUrl(mod.default);
        setResumeStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setResumeStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [resumeKey]);

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.alt = 'Travis Mikolay portrait unavailable';
  };

  return (
    <section id="home" ref={scrollTab}>
      <div className="content">
        <h1 className="name">
          <span>TRAVIS</span>
          <br />
          {jobTitle}
        </h1>
        <p className="des">{description}</p>
        <a
          className="btn-download"
          href={resumeUrl || undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={downloadAriaLabel}
          aria-disabled={resumeStatus !== 'ready'}
          onClick={(event) => {
            if (resumeStatus !== 'ready' || !resumeUrl) {
              event.preventDefault();
            }
          }}
        >
          {resumeStatus === 'loading' ? 'Preparing Resume…' : 'Download My Resume'}
        </a>
      </div>
      <div className="home-profile-img-wrapper">
        <div className="home-profile-img-mask">
          <ResponsiveImage
            avifSrcSet={HERO_IMAGE.avifSrcSet}
            webpSrcSet={HERO_IMAGE.webpSrcSet}
            src={HERO_IMAGE.fallbackSrc}
            className="home-profile-img"
            alt={PROFILE_ALT}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            sizes={HERO_IMAGE.sizes}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onError={handleImageError}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;