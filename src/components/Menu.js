import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../css/Menu.css';
import { Bell, Cards, House, Key, MapPin, Monitor, UserCircle } from 'phosphor-react';
const Menu = () => {
  const location = useLocation();
  return (
    <div className="menu">
      <div className='header'>
        <UserCircle className='user-icon' size='3.75em' weight='light'/> 
        <div className='title'>
          <span className='hello body1-regular'> Xin chào </span> 
          <br/> 
          <span className='h3-bold'>Bảo Ngọc</span>
        </div>

        <Bell size='2.1875em' display='flex' className='bell-icon'/>
      </div>

      <ul className='menubar h3-bold'>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center'}}><House size='1.5em' /> Trang chủ</Link>
        </li>
        <li className={location.pathname.startsWith('/devices') ? 'active' : ''}> {/* Check if the current path starts with /devices */}
          <Link to="/devices" style={{ display: 'flex', alignItems: 'center'}}><Monitor size='1.5em'/> <span>Quản lý thiết bị </span></Link>
        </li>
        <li className={location.pathname.startsWith('/regions') ? 'active' : ''}>
          <Link to="/regions" style={{ display: 'flex', alignItems: 'center'}}><MapPin size='1.5em' /> <span> Quản lý khu vực </span></Link>
        </li>
        <li className={location.pathname === '/cards' ? 'active' : ''}>
          <Link to="/cards" style={{ display: 'flex', alignItems: 'center'}}><Cards size='1.5em' /> <span> Quản lý thẻ </span></Link>
        </li>
        <li className={location.pathname === '/security' ? 'active' : ''}>
          <Link to="/security" style={{ display: 'flex', alignItems: 'center'}}><Key size='1.5em' /> <span> Bảo mật </span></Link>
        </li>
      </ul>
    </div>
  
  );
};

export default Menu;