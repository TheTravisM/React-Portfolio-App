import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { changeTabActive} from '../../redux/action';
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from '../../assets/images/logo.png'
import './navBar.scss'

const NavBar = ({activeTab}) => {
  const [listNav] = useState(["home", "skill", "projects", "contacts"]);
  const dispatch = useDispatch();  
  const changeTab = (value) => {
    dispatch(changeTabActive(value));
  }

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <nav>
        {listNav.map((value, key) => (
          <button 
            key={key} 
            className={activeTab === value ? 'active' : ''}
            onClick={() => changeTab(value)}
          >
            {value}
          </button>
        ))}
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => ({
  activeTab: state.activeTab
})

export default connect(mapStateToProps,{changeTabActive})(NavBar)