import React, { useState, useRef } from 'react' 
import contactData from './contact.json';
import './contact.scss';
import CustomHook from '../CustomHook';

const Contact = () => {

  const divs = useRef([]);
  const scrollTab = useRef();
  CustomHook(scrollTab, divs);

  return (
    <section id="contact" className="contacts" ref={scrollTab}>
      <h2 className="contact-title" ref={(el) => el && divs.current.push(el)}>
        My Contacts
      </h2>
      <div className="contact-description"  ref={(el) => el && divs.current.push(el)}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad architecto veritatis, illo voluptate commodi at dolorum quidem error recusandae, reprehenderit vero voluptates iure mollitia. Corporis, numquam. Nesciunt molestiae in eius!
      </div>
      <ul className="contact-list"  ref={(el) => el && divs.current.push(el)}>
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