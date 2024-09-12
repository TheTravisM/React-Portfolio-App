import React, { useRef, useState } from 'react' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-brands-svg-icons'; // Import all icons
import './skils.scss';
import skillsData from './skills.json';
import CustomHook from '../CustomHook';

const Skills = () => {
  const divs = useRef([]);
  const scrollTab = useRef();
  CustomHook(scrollTab, divs);

  return (
    <section id="skills" className="skills" ref={scrollTab}>
      <h2 
      className="title skills-title"
      ref={(el) => el && divs.current.push(el)}
    >
        A Particular Set of Skills
      </h2>
      <div className="description skills-description" ref={(el) => el && divs.current.push(el)}>
      I specialize in crafting responsive, accessible web experiences using modern technologies. With over 10 years of experience in frontend development, I focus on delivering clean, scalable code and collaborating across teams to build engaging, user-centric interfaces. Proficient in HTML, CSS, JavaScript, React, and other frameworks, I have a keen eye for design and usability.
      </div>
      <ul className="skills-list">
        {
          skillsData.map((value,key)=>(
            <li key={key} className="skills-listItem" ref={(el) => el && divs.current.push(el)}>
              <FontAwesomeIcon icon={Icons[value.icon]} />
              <h3 className="skills-listItem-title">{value.name}</h3>
              <div className="skills-listItem-description">{value.des}</div>
            </li>
          ))
        }
      </ul>
    </section>
  )
};

export default Skills;