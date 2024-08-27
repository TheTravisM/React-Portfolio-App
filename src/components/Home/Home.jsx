import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import './home.scss';
import frontEndResume from '../../assets/docs/Travis-Mikolay-Resume.pdf';
import reactResume from '../../assets/docs/Travis-Mikolay-Resume.pdf';
import uxResume from '../../assets/docs/UX_UI_Travis_M_Resume.pdf';
import engineerResume from '../../assets/docs/Engineer_Travis_M_Resume.pdf';
import ProfileImg from '../../assets/images/ProfilePic.jpg';
import CustomHook from '../CustomHook';

const Home = () => {
  const scrollTab = useRef();
  CustomHook(scrollTab);

  const [searchParams] = useSearchParams();
  const [resumeUrl, setResumeUrl] = useState(engineerResume);
  const [jobTitle, setJobTitle] = useState('Engineer');

  useEffect(() => {
    const title = searchParams.get('x');
  
    switch (title) {
      case 'f':
        setResumeUrl(frontEndResume);
        setJobTitle('Front End Engineer');
        break;
      case 'r':
        setResumeUrl(reactResume);
        setJobTitle('React Engineer');
        break;
      case 'x':
        setResumeUrl(uxResume);
        setJobTitle('UX/UI Engineer');
        break;
      default:
        setResumeUrl(engineerResume);
        setJobTitle('The Engineer');
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
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias ducimus, corrupti error inventore labore reprehenderit vero laudantium tempore itaque iste. Corporis pariatur voluptate cumque officiis optio et molestias minima cum.
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