import React, { useRef } from 'react' 
import contactData from './contact.json';
import './contact.scss';
import CustomHook from '../CustomHook';

const Contact = () => {

  const divs = useRef([]);
  const scrollTab = useRef();
  CustomHook(scrollTab, divs);

  return (
    <section id="contact" ref={scrollTab}>
      <h2 
        className="title contact-title" 
        ref={(el) => el && divs.current.push(el)}>
        My Contacts
      </h2>
      <div 
        className="description contact-description"  
        ref={(el) => el && divs.current.push(el)}>
        Feel free to reach out for collaborations, freelance opportunities, or to learn more about my work.
      </div>
      <ul 
        className="contact-list"  
        ref={(el) => el && divs.current.push(el)}>
        {contactData.map((value,key) => (
          <li key={key} className="contact-listItem">
            <h3 className="contact-listItem-title">
              {value.title}
            </h3>
            <div className="contact-listItem-description">
              {value.value}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Contact