import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bannerImage from "../assets/img/color-clash-banner.png";
import bannerImageMobile from "../assets/img/color-clash-banner-Mobile.png";

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
      <picture>
        <source srcSet={bannerImageMobile} media="(max-width: 768px)" />
        <img
          src={bannerImage}
          alt="Color Clash Banner"
          className="banner-image"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </picture>
    </Container>
  );
};

export default ColorClash;
