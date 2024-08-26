import React, { useRef } from 'react' 
import './home.scss'
import MikolayResume from '../../assets/Travis-Mikolay-Resume.pdf'
import ProfileImg from '../../assets/images/ProfilePic.jpg';
import CustomHook from '../CustomHook';

const Home = () => {
  const scrollTab = useRef();
  CustomHook(scrollTab);
  return (
    <section id="home" ref={scrollTab}>
      <div className="content">
        <div className="name">
          <span>TRAVIS</span>
          <br/>The Engineer
        </div>
        <div className="des">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias ducimus, corrupti error inventore labore reprehenderit vero laudantium tempore itaque iste. Corporis pariatur voluptate cumque officiis optio et molestias minima cum.
        </div>
        <a className="btn-download" href={MikolayResume} target="_blank" rel="noopener noreferrer">
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