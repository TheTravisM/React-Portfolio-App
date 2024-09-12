import React, { useRef } from 'react' 
import "./work.scss";
import workData from "./work.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonCircleQuestion,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";
import CustomHook from '../CustomHook';

const Work = () => {
  const divs = useRef([]);
  const scrollTab = useRef();
  CustomHook(scrollTab, divs);

  return (
    <section id="work" ref={scrollTab}>
      <h2 
        className="title work-title"
        ref={(el) => el && divs.current.push(el)}
      >
        Work Portfolio
      </h2>

      <div 
        className="description work-description"
        ref={(el) => el && divs.current.push(el)}
      >
        My work portfolio includes a variety of challenging projects where I’ve applied my skills in frontend development, UX/UI design, and accessibility. From developing interactive dashboards to creating mobile-first applications, I take pride in delivering solutions that are not only visually appealing but also efficient and user-friendly.
      </div>

      <ul className="work-list">
        {workData.map((value, key) => (
          <li 
            key={key} 
            className="work-listItem"
            ref={(el) => el && divs.current.push(el)}
          >
            <a href={value.url} 
              className="image-wrapper"
              target="_blank" 
              rel="noopener noreferrer">
              <img src={value.images} alt="" />
            </a>
            <div className="content">
              <h3 className="work-listItem-title">
                {value.name}
              </h3>
              <div className="work-listItem-description">
                {value.des}
              </div>
              <a href={value.url} 
                className="work-link"
                target="_blank" 
                rel="noopener noreferrer">
                Link to work
              </a>

              <div className="mission">
                <div>
                  <FontAwesomeIcon icon={faPersonCircleQuestion} />
                </div>
                <div>
                  <h4>Mission</h4>
                  <div className="misson-description">
                    {value.mission}
                  </div>
                </div>
              </div>

              <div className="mission">
                <div>
                  <FontAwesomeIcon icon={faEarthAmericas} />
                </div>
                <div>
                  <h4>Techology</h4>
                  <div className="misson-description">
                    {value.technology}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Work;
