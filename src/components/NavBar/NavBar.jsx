import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeTabActive} from '../../redux/action';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import './navBar.scss'

const NavBar = ({activeTab}) => {
  const dispatch = useDispatch();  
  const [linkNav] = useState(["home", "skill", "projects", "contacts"]);
  const [statusNav, changeStatusNav] = useState(null);
  const toggleNav = () => {
    changeStatusNav(statusNav === null ? 'active' : null);
}
  const changeTab = (value) => {
    dispatch(changeTabActive(value));
    toggleNav();
  }

  return (
    <header>
      <div className="logo">
        tm
      </div>
      <nav className={statusNav}>
        {linkNav.map((value, key) => (
          <button 
            key={key} 
            className={activeTab === value ? 'active' : ''}
            onClick={() => changeTab(value)}
          >
            {value}
          </button>
        ))}
      </nav>
      <div className="icon-bar" onClick={toggleNav}>
                <FontAwesomeIcon icon={faBars} />
            </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  activeTab: state.activeTab
});

export default connect(mapStateToProps,{changeTabActive})(NavBar)