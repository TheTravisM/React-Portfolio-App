import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faVuejs,
  faGithub,
  faAngular,
} from '@fortawesome/free-brands-svg-icons';
import './skils.scss';
import skillsData from './skills.json';
import useScrollAnimation from '../CustomHook';

const brandIcons = {
  faHtml5,
  faCss3,
  faJs,
  faReact,
  faVuejs,
  faGithub,
  faAngular,
};

const Skills = () => {
  const divs = useRef([]);
  const scrollTab = useRef();
  useScrollAnimation(divs);

  return (
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
            <FontAwesomeIcon icon={brandIcons[value.icon]} />
            <h3 className="skills-listItem-title">{value.name}</h3>
            <div className="skills-listItem-description">{value.des}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;