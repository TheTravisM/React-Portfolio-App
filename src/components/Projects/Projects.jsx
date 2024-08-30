import React, { useRef } from 'react' 
import "./projects.scss";
import projectsData from "./projects.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPersonCircleQuestion,
  faEarthAmericas,
} from "@fortawesome/free-solid-svg-icons";
import CustomHook from '../CustomHook';

const Projects = () => {
  const divs = useRef([]);
  const scrollTab = useRef();
  CustomHook(scrollTab, divs);

  return (
    <section id="projects" ref={scrollTab}>
      <h2 
        className="title project-title"
        ref={(el) => el && divs.current.push(el)}
      >
        My Projects
      </h2>

      <div 
        className="description project-description"
        ref={(el) => el && divs.current.push(el)}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis doloribus
        quisquam quae dolor aspernatur quaerat cumque qui perferendis asperiores
        rerum cum commodi deserunt ipsa natus earum nam, dicta dignissimos
        perspiciatis?
      </div>

      <ul className="projects-list">
        {projectsData.map((value, key) => (
          <li 
            key={key} 
            className="projects-listItem"
            ref={(el) => el && divs.current.push(el)}
          >
            <a href={value.url} 
              className="image-wrapper"
              target="_blank" 
              rel="noopener noreferrer">
              <img src={value.images} alt="" />
            </a>
            <div className="content">
              <h3 className="projects-listItem-title">
                {value.name}
              </h3>
              <div className="projects-listItem-description">
                {value.des}
              </div>
              <a href={value.url} 
                className="project-link"
                target="_blank" 
                rel="noopener noreferrer">
                Link to project
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

export default Projects;
