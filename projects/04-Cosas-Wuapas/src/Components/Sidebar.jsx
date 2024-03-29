import { useRef, useState, useEffect } from "react";
import {isMobileDevice} from 'react-device-detect';
//importamos los iconos que vamos a utilizar
import menuIcon from '../assets/Menu.svg';
import downArrow from '../assets/down-arrow.svg'
import homeIcon from '../assets/Home.svg';
import settingsIcon from '../assets/Settings.svg';
import create from '../assets/Create.svg';
import account from '../assets/Account.svg';
import product from '../assets/Product.svg';
import favorite from '../assets/Favorite.svg';
//importamos el css
import "./Sidebar.css";

//creamos un array de objetos con las opciones del menú donde:
//name es el nombre de la opción
//icon es el icono que se muestra junto al nombre
//items es un array con las subopciones de cada opción
const menuItems = [
  {
    name: "Home",
    icon: homeIcon,
  },
  {
    name: "Settings",
    icon: settingsIcon,
    items: ["Display", "Editor", "Theme", "Interface"],
  },
  {
    name: "Create",
    icon: create,
    items: ["Article", "Document", "Report"],
  },
  {
    name: "Account",
    icon: account,
    items: ["Dashboard", "Logout"],
  },
  {
    name: "Products",
    icon: product,
  },
  {
    name: "Favourites",
    icon: favorite,
    items: ["Photos", "Videos", "Files"],
  },
];

const Icon = ({ icon }) => (
    //creamos un componente Icon que recibe un icono/imagen/url y lo muestra
    <img src={icon} className="material-symbols-outlined" alt="icon"/>
);

const NavHeader = () => (
  <header className="sidebar-header">
    <button type="button">
      <Icon icon= {menuIcon} />
    </button>
    <span>Admin</span>
  </header>
);

const NavButton = ({
  onClick,
  name,
  icon,
  isActive,
  hasSubNav,
}) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active" : ""}
  >
    {icon && <Icon icon={icon} />}
    <span>{name}</span>
    {hasSubNav && <Icon icon={downArrow} />}
  </button>
);

const SubMenu = ({ item, activeItem, handleClick }) => {
  const navRef = useRef(null);

  const isSubNavOpen = (item, items) =>
    items && (items.some((i) => i === activeItem) || item === activeItem);

  return (
    <div
      className={`sub-nav ${isSubNavOpen(item.name, item.items || []) ? "open" : ""}`}
      style={{
        height: !isSubNavOpen(item.name, item.items || [])
          ? 0
          : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item?.items && item.items.map((subItem) => (
          <NavButton
            onClick={handleClick}
            name={subItem}
            isActive={activeItem === subItem}
          />
        ))}
      </div>
    </div>
  );
};


//exportamos el Sidebar para utilizarlo en el App.jsx
export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  // Estado para identificar si el dispositivo es móvil
  const [isMobileDevice, setIsMobileDevice] = useState(window.innerWidth < 768);

// Efecto para escuchar cambios en el tamaño de la ventana
useEffect(() => {
  const handleResize = () => {
    setIsMobileDevice(window.innerWidth <= 768);
  };

  // Agregar listener al cambiar tamaño de la ventana
  window.addEventListener('resize', handleResize);

  // Limpiar listener
  return () => window.removeEventListener('resize', handleResize);
}, []);


  const handleClick = (item) => {
    console.log("activeItem", activeItem);
    setActiveItem(item !== activeItem ? item : "");
  };
  
  return (
    <div className="sidebar">
      <NavHeader />
      {menuItems.map((item) => (
        <div key={item.name}>
          {!item.items && (
            // Condicional basado en el tamaño de la pantalla
            isMobileDevice ? (
              <NavButton
                onClick={handleClick}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items} 
              />
            ) : (
              <NavButton
                onClick={handleClick}
                icon={item.icon}
                name={item.name}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
              />
            )
          )}
          {item.items && (
            isMobileDevice ? (
               // Condicional basado en el tamaño de la pantalla
              <>
              <NavButton
                onClick={handleClick}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
              />
              <SubMenu
                activeItem={activeItem}
                handleClick={handleClick}
                item={item}
              />
              </>
            ) : (
              <>
              <NavButton
                onClick={handleClick}
                name={item.name}
                icon={item.icon}
                isActive={activeItem === item.name}
                hasSubNav={!!item.items}
              />
              <SubMenu
                activeItem={activeItem}
                handleClick={handleClick}
                item={item}
              />
              </>
            )
          )}
        </div>
      ))}
    </div>
  );
};
