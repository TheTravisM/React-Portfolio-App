import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './home.scss';
import frontEndResume from '../../assets/docs/Engineer_Travis_Mikolay_Resume.pdf';
import reactResume from '../../assets/docs/React_Travis_Mikolay_Resume.pdf';
import uxResume from '../../assets/docs/UX_UI_Travis_Mikolay_Resume.pdf';
import engineerResume from '../../assets/docs/Engineer_Travis_Mikolay_Resume.pdf';
import ProfileImg from '../../assets/images/ProfilePic.jpg';
import CustomHook from '../CustomHook';

const Home = () => {
  const scrollTab = useRef();
  CustomHook(scrollTab);

  const [searchParams] = useSearchParams();
  const [resumeUrl, setResumeUrl] = useState(engineerResume);
  const [jobTitle, setJobTitle] = useState('Engineer');
  const [description, setDescription] = useState('setDescription');

  useEffect(() => {
    const title = searchParams.get('x');
  
    switch (title) {
      case "f":
        setResumeUrl(frontEndResume);
        setJobTitle("Front End Engineer");
        setDescription("Front-End Engineer with 10+ years of experience in developing responsive, mobile-first websites and applications. Proficient in HTML, CSS, JavaScript, and modern frameworks, creating intuitive, user-centric interfaces. Skilled in collaborating with cross-functional teams, optimizing performance, and ensuring web accessibility, consistently delivering high-quality solutions that enhance user experiences and meet business goals.");
        break;
      case "r":
        setResumeUrl(reactResume);
        setJobTitle("React Engineer");
        setDescription("React Engineer with 10+ years of experience in front-end development, focused on creating interactive, mobile-first websites and applications. Expert in React, JavaScript, and modern front-end tools, delivering seamless, user-friendly interfaces. Skilled in integrating with backend systems and adhering to web accessibility standards, consistently providing high-quality, performant solutions.");
        break;
      case "x":
        setResumeUrl(uxResume);
        setJobTitle("UX/UI Engineer");
        setDescription(
          "UI/UX Engineer with 10+ years of experience in crafting mobile-first, interactive websites and applications. Skilled in leading projects, collaborating with teams, and creating visually appealing, user-centric designs. Expert in web accessibility and responsive design, delivering high-quality solutions that meet client and company needs across devices."
        );
        break;
      case "e":
        setResumeUrl(engineerResume);
        setJobTitle("The Engineer");
        setDescription(
          "Engineer with 10+ years of experience in crafting mobile-first, interactive websites and applications. Skilled in leading projects, collaborating with teams, and creating visually appealing, user-centric designs. Expert in web accessibility and responsive design, delivering high-quality solutions that meet client and company needs across devices."
        );
        break;
      default:
        setResumeUrl(engineerResume);
        setJobTitle("The Engineer");
        setDescription("Engineer with 10+ years of experience in crafting mobile-first, interactive websites and applications. Skilled in leading projects, collaborating with teams, and creating visually appealing, user-centric designs. Expert in web accessibility and responsive design, delivering high-quality solutions that meet client and company needs across devices.");
        break;
    }
  }, [searchParams]);


  return (
    <section id="home" ref={scrollTab}>
      <div className="content">
        <div className="name">
          <span>TRAVIS</span>
          <br/>{jobTitle}
        </div>
        <div className="des">
          {description}
        </div>
        <a className="btn-download" href={resumeUrl} target="_blank" rel="noopener noreferrer">
          Download My Resume
        </a>
      </div>
      <div className="home-profile-img-wrapper">
        <div className="home-profile-img-mask">
        <img src={ProfileImg} className="home-profile-img" 
        alt="profile image of travis" />
        </div>
        
      </div>
    </section>
  )
}

export default Home