import React, { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import './home.scss';
import frontEndResume from '../../assets/docs/Engineer_Travis_Mikolay_Resume.pdf';
import reactResume from '../../assets/docs/React_Travis_Mikolay_Resume.pdf';
import uxResume from '../../assets/docs/UX_UI_Travis_Mikolay_Resume.pdf';
import engineerResume from '../../assets/docs/Engineer_Travis_Mikolay_Resume.pdf';
import useScrollAnimation from '../CustomHook';

const defaultProfile = {
  resumeUrl: engineerResume,
  jobTitle: 'The Engineer',
  description:
    'Engineer with 10+ years of experience in crafting mobile-first, interactive websites and applications. Skilled in leading projects, collaborating with teams, and creating visually appealing, user-centric designs. Expert in web accessibility and responsive design, delivering high-quality solutions that meet client and company needs across devices.',
};

const resumeProfiles = {
  f: {
    resumeUrl: frontEndResume,
    jobTitle: 'Front End Engineer',
    description:
      'Front-End Engineer with 10+ years of experience in developing responsive, mobile-first websites and applications. Proficient in HTML, CSS, JavaScript, and modern frameworks, creating intuitive, user-centric interfaces. Skilled in collaborating with cross-functional teams, optimizing performance, and ensuring web accessibility, consistently delivering high-quality solutions that enhance user experiences and meet business goals.',
  },
  r: {
    resumeUrl: reactResume,
    jobTitle: 'React Engineer',
    description:
      'React Engineer with 10+ years of experience in front-end development, focused on creating interactive, mobile-first websites and applications. Expert in React, JavaScript, and modern front-end tools, delivering seamless, user-friendly interfaces. Skilled in integrating with backend systems and adhering to web accessibility standards, consistently providing high-quality, performant solutions.',
  },
  x: {
    resumeUrl: uxResume,
    jobTitle: 'UX/UI Engineer',
    description:
      'UI/UX Engineer with 10+ years of experience in crafting mobile-first, interactive websites and applications. Skilled in leading projects, collaborating with teams, and creating visually appealing, user-centric designs. Expert in web accessibility and responsive design, delivering high-quality solutions that meet client and company needs across devices.',
  },
  e: defaultProfile,
};

const PROFILE_ALT = 'Photo of Travis Mikolay';

const Home = () => {
  const scrollTab = useRef();
  useScrollAnimation();

  const [searchParams] = useSearchParams();
  const rawQuery = searchParams?.get('x');
  const selectedTitle = typeof rawQuery === 'string' ? rawQuery.toLowerCase() : '';
  const profile = resumeProfiles[selectedTitle] ?? defaultProfile;
  const { resumeUrl, jobTitle, description } = profile;
  const downloadAriaLabel = `Download ${jobTitle} resume`;

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.alt = 'Profile image unavailable';
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
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={downloadAriaLabel}
        >
          Download My Resume
        </a>
      </div>
      <div className="home-profile-img-wrapper">
        <div className="home-profile-img-mask">
          <picture>
            <source srcSet="/img/avif/ProfilePic.avif" type="image/avif" />
            <source srcSet="/img/webp/ProfilePic.webp" type="image/webp" />
            <img
              src="/img/ProfilePic.jpg"
              className="home-profile-img"
              alt={PROFILE_ALT}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              onError={handleImageError}
            />
          </picture>
        </div>
      </div>
    </section>
  );
};

export default Home