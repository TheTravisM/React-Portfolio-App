import React from 'react'
import './projects.scss'
import projectsData from './projects.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons';
const Projects = () => {
  return (
    <section id="projects">
      <h2 className="title project-title">My Projects</h2>

      <div className="project-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis doloribus
        quisquam quae dolor aspernatur quaerat cumque qui perferendis asperiores
        rerum cum commodi deserunt ipsa natus earum nam, dicta dignissimos
        perspiciatis?
      </div>

      <ul className="projects-list">
        {projectsData.map((value, key) => (
          <li key={key} className="projects-listItem">
            <div className="images">
              <img src={value.images} alt="" />
            </div>
            <div className="content">
              <h3 className="projects-listItem-title">{value.name}</h3>
              <div className="projects-listItem-description">{value.des}</div>
              <div className="mission">
                <div><FontAwesomeIcon icon={faPersonCircleQuestion}/></div>
                <div className="">
                  <h4>Missions</h4>
                  <div className="de">
                    {value.mission}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Projects