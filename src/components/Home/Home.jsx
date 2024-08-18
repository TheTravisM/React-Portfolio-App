import React, { useRef } from 'react' 
import './home.scss'
import MikolayResume from '../../assets/Travis-Mikolay-Resume.pdf'
import AvatarImg from '../../assets/images/avatar.jpg';
import CustomHook from '../CustomHook';

const Home = () => {
  const scrollTab = useRef();
  CustomHook(scrollTab);
  return (
    <section id="home" ref={scrollTab}>
      <div className="content">
        <div className="name">
          MY NAME IS <span>TRAVIS</span>
        </div>
        <div className="des">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias ducimus, corrupti error inventore labore reprehenderit vero laudantium tempore itaque iste. Corporis pariatur voluptate cumque officiis optio et molestias minima cum.
        </div>
        <a href={MikolayResume} target="_blank" rel="noopener noreferrer">
          Download My Resume
        </a>
      </div>
      <div className="avatar">
        <div className='card'>
          <img src={AvatarImg} alt="profile image of travis" />
          <div className="info">
            <div className="">UI/UX Developer</div>
            <div className="">United States</div>
            <div className="">KickAss Pirate</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home