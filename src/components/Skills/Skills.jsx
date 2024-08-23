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
      <div 
      className="title"
      ref={(el) => el && divs.current.push(el)}
    >
        A Particular Set of Skills
      </div>
      <div className="des" ref={(el) => el && divs.current.push(el)}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod corrupti, ab id eum exercitationem, dolores nesciunt ipsum sequi distinctio beatae doloribus at! Unde veritatis quod, sunt quisquam repellendus ex soluta.
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