import React from 'react';

const Header = () => {
  const headerStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "25px"
  };
  const h1Style = {
    color: "blue"
  };

  return (
    <header style={headerStyle}>
      <h1 style={h1Style}>Weather Application</h1>
    </header>
  )
}

export default Header;
