import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bannerImage from "../assets/img/color-clash-banner.png"; // Ensure the banner is in the assets folder

const ColorClash = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/play");
  };

  return (
    <Container
      fluid
      className="banner-container d-flex flex-column align-items-center justify-content-center text-center"
      onClick={handleClick}
      style={{ cursor: "pointer", width: "auto", height: "100vh", overflow: "hidden" }}
    >
      <img
        src={bannerImage}
        alt="Color Clash Banner"
        className="banner-image"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </Container>
  );
};

export default ColorClash;
