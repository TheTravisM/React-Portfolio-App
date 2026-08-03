import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faVuejs,
  faGithub,
  faAngular,
  faFigma,
} from '@fortawesome/free-brands-svg-icons';
import {
  faCubes,
  faServer,
} from '@fortawesome/free-solid-svg-icons';
import './skils.scss';
import skillsData from './skills.json';
import useScrollAnimation from '../CustomHook';

const skillIcons = {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faVuejs,
  faGithub,
  faAngular,
  faFigma,
  faCubes,
  faServer,
};

// Custom SVG icon for TypeScript (from Font Awesome brands - faTypeScript)
// Using inline SVG because the installed free-brands-svg-icons v6 does not export faTypeScript
const tsIcon = (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    className="svg-inline--fa"
    aria-hidden="true"
    focusable="false"
    role="img"
    fill="#fff"
  >
    <path d="M16.8 32l414.4 0c9.3 0 16.8 7.5 16.8 16.8l0 414.4c0 9.3-7.5 16.8-16.8 16.8L16.8 480C7.5 480 0 472.5 0 463.2L0 48.8C0 39.5 7.5 32 16.8 32zM249 270.3l0-36.7-159.4 0 0 36.7 56.9 0 0 163.6 45.3 0 0-163.6 57.2 0zm18.1 159.3c7.3 3.7 15.9 6.5 25.9 8.4s20.5 2.8 31.5 2.8c10.8 0 21-1 30.7-3.1s18.2-5.4 25.5-10.1 13.1-10.9 17.4-18.4 6.4-17 6.4-28.2c0-8.1-1.2-15.2-3.7-21.3s-5.9-11.5-10.5-16.3-10.1-9-16.5-12.8-13.7-7.3-21.7-10.7c-5.9-2.4-11.2-4.8-15.9-7.1s-8.7-4.6-11.9-7-5.8-4.9-7.6-7.5-2.7-5.7-2.7-9c0-3.1 .8-5.8 2.4-8.3s3.8-4.6 6.7-6.4 6.5-3.1 10.7-4.1 8.9-1.5 14.1-1.5c3.7 0 7.7 .3 11.9 .8s8.4 1.4 12.6 2.6 8.3 2.6 12.3 4.4 7.7 3.8 11 6.1l0-41.8c-6.8-2.6-14.3-4.5-22.4-5.8s-17.4-1.9-27.9-1.9c-10.7 0-20.8 1.1-30.4 3.4s-18 5.8-25.2 10.7-13 11-17.2 18.5-6.3 16.5-6.3 26.9c0 13.3 3.9 24.7 11.6 34.1s19.5 17.4 35.2 23.9c6.2 2.5 11.9 5 17.3 7.4s10 4.9 13.8 7.5 7 5.4 9.2 8.5 3.4 6.6 3.4 10.5c0 2.9-.7 5.6-2.1 8s-3.5 4.6-6.4 6.4-6.4 3.2-10.7 4.3-9.3 1.5-15 1.5c-9.7 0-19.4-1.7-28.9-5.1s-18.4-8.5-26.6-15.3l0 44.7z" />
  </svg>
);

const Skills = () => {
  const divs = useRef([]);
  const scrollTab = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  // When true, we intentionally render all three cards small + transparent
  // (no .is-center). After the browser paints the new arrangement, we set
  // this to false so the card now sitting in the center slot grows + becomes opaque.
  const [isTransitioning, setIsTransitioning] = useState(false);

  useScrollAnimation(divs);

  const total = skillsData.length;

  // Always render exactly 3 items for the carousel (left, center, right)
  const visibleItems = [
    skillsData[currentIndex % total],
    skillsData[(currentIndex + 1) % total],
    skillsData[(currentIndex + 2) % total],
  ];

  // On navigation we:
  // 1. Set isTransitioning=true so the next render shows all 3 cards small.
  // 2. Shift the window.
  // 3. After paint, set false → the middle card (the one that moved into center) gets .is-center and transitions to full size.
  const goPrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // After navigation, force one paint with all cards small+transparent,
  // then promote the middle card so it transitions from small → full size.
  useEffect(() => {
    if (!isTransitioning) return undefined;

    let raf2 = null;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIsTransitioning(false));
    });

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [isTransitioning]);

  return (
    <>
      <section id="skills" className="skills" ref={scrollTab}>
        <h2 className="title skills-title" ref={(el) => el && divs.current.push(el)}>
          A Particular Set of Skills
        </h2>
        <div className="description skills-description" ref={(el) => el && divs.current.push(el)}>
          I specialize in crafting responsive, accessible web experiences using modern technologies. With over 10 years of experience in frontend development, I focus on delivering clean, scalable code and collaborating across teams to build engaging, user-centric interfaces. Proficient in HTML, CSS, JavaScript, React, and other frameworks, I have a keen eye for design and usability.
        </div>
        <ul className="skills-list">
          {skillsData.map((value, key) => (
            <li key={key} className="skills-listItem" ref={(el) => el && divs.current.push(el)}>
              {value.icon === 'ts' ? (
                tsIcon
              ) : (
                <FontAwesomeIcon icon={skillIcons[value.icon]} />
              )}
              <h3 className="skills-listItem-title">{value.name}</h3>
              <div className="skills-listItem-description">{value.des}</div>
            </li>
          ))}
        </ul>
      </section>

      {/* Carousel: always renders exactly 3 <li className="skills-listItem"> (left, center, right) */}
      {/*
      <section className="skills-carousel">
        <div className="carousel-wrapper">
          <button
            type="button"
            className="carousel-btn carousel-btn--prev"
            onClick={goPrev}
            aria-label="Previous skills"
          >
            ‹
          </button>

          <ul className={`skills-list carousel-track ${isTransitioning ? 'is-rearranging' : ''}`}>
            {visibleItems.map((value, idx) => {
              // Always exactly 3 items: idx 0 = left, 1 = center slot, 2 = right.
              // During is-rearranging (right after button click) we render all three
              // small + transparent with transitions disabled so the new arrangement
              // is painted at the "from" state.
              // Then isTransitioning is cleared → the middle card (idx===1) gets
              // .is-center and the CSS transition makes it grow from small to full.
              const isCenter = !isTransitioning && idx === 1;
              return (
                <li
                  key={value.name}
                  className={`skills-listItem ${isCenter ? 'is-center' : ''}`}
                >
                  {value.icon === 'ts' ? (
                    tsIcon
                  ) : (
                    <FontAwesomeIcon icon={skillIcons[value.icon]} />
                  )}
                  <h3 className="skills-listItem-title">{value.name}</h3>
                  <div className="skills-listItem-description">{value.des}</div>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            className="carousel-btn carousel-btn--next"
            onClick={goNext}
            aria-label="Next skills"
          >
            ›
          </button>
        </div>
      </section>
      */}
    </>
  );
};

export default Skills;