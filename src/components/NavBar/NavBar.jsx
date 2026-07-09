import React, { useState } from 'react';
import './navBar.scss';

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
    />
  </svg>
);

const NavBar = () => {
  const [linkNav] = useState(["home", "skills", "projects", "contact"]);
  const [statusNav, changeStatusNav] = useState(null);
  const [activeTab, setActiveTab] = useState('home');

  const toggleNav = () => {
    changeStatusNav(statusNav === null ? "nav--expanded" : null);
  };

  const changeTab = (value) => {
    setActiveTab(value);
    const target = document.getElementById(value);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    toggleNav();
  };

  return (
    <header>
      <div className="logo">tm</div>
      <nav className={statusNav}>
        {linkNav.map((value, key) => (
          <button
            key={key}
            className={activeTab === value ? "btn--active" : ""}
            onClick={() => changeTab(value)}
          >
            {value}
          </button>
        ))}
      </nav>
      <button className="icon-bar" onClick={toggleNav} aria-label="Toggle navigation">
        <MenuIcon />
      </button>
    </header>
  );
};

export default NavBar;