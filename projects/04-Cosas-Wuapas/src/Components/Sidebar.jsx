import { useRef, useState } from "react";

import menuIcon from '../assets/Menu.svg';
import downArrow from '../assets/down-arrow.svg'
import homeIcon from '../assets/Home.svg';
import settingsIcon from '../assets/Settings.svg';
import create from '../assets/Create.svg';
import account from '../assets/Account.svg';
import product from '../assets/Product.svg';
import favorite from '../assets/Favorite.svg';
import "./Sidebar.css";

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
  },
];

const Icon = ({ icon }) => (
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

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");

  const handleClick = (item) => {
    console.log("activeItem", activeItem);
    setActiveItem(item !== activeItem ? item : "");
  };

  return (
    <aside className="sidebar">
      <NavHeader />
      {menuItems.map((item) => (
        <div key={item.name}>
          {!item.items && (
            <NavButton
              onClick={handleClick}
              name={item.name}
              icon={item.icon}
              isActive={activeItem === item.name}
              hasSubNav={!!item.items}
            />
          )}
          {item.items && (
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
          )}
        </div>
      ))}
    </aside>
  );
};
