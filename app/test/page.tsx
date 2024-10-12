'use client'
// Main HomePage Component
import React from 'react';
import styled from 'styled-components';
// import HeroSection from './HeroSection';
// import LoveStory from './LoveStory';
// import EventDetails from './EventDetails';
// import RSVP from './RSVP';
// import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <LoveStory />
      <EventDetails />
      <RSVP />
      <Footer />
    </div>
  );
};

export default HomePage;

// Hero Section Component
const HeroSection = () => {
  return (
    <HeroSectionWrapper>
      <HeroHeading>Welcome to Our Wedding</HeroHeading>
      <HeroSubheading>Join us as we celebrate our love story</HeroSubheading>
    </HeroSectionWrapper>
  );
};

const HeroSectionWrapper = styled.section`
  height: 100vh;
  background: url(/path/to/your/image.jpg) center/cover no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
`;

const HeroHeading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;

const HeroSubheading = styled.p`
  font-size: 1.5rem;
  margin-top: 1rem;
`;

// Love Story Component
const LoveStory = () => {
  return (
    <LoveStorySection>
      <h2>Our Love Story</h2>
      <p>
        It all began on a beautiful summer day... (You can add your love story here, highlighting key moments!)
      </p>
    </LoveStorySection>
  );
};

const LoveStorySection = styled.section`
  padding: 2rem;
  background-color: #f9f3e6;
  text-align: center;
`;

// Event Details Component
const EventDetails = () => {
  return (
    <EventDetailsSection>
      <h2>Wedding Details</h2>
      <p>Date: June 15, 2025</p>
      <p>Location: The Grand Garden Venue</p>
      <p>Time: 5:00 PM</p>
    </EventDetailsSection>
  );
};

const EventDetailsSection = styled.section`
  padding: 2rem;
  text-align: center;
`;

// RSVP Component
const RSVP = () => {
  return (
    <RSVPSection>
      <h2>RSVP</h2>
      <p>We'd love to have you with us on our special day. Please RSVP below:</p>
      <RSVPButton>RSVP Now</RSVPButton>
    </RSVPSection>
  );
};

const RSVPSection = styled.section`
  padding: 2rem;
  text-align: center;
  background-color: #ffe0e0;
`;

const RSVPButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #ff6699;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

// Footer Component
const Footer = () => {
  return (
    <FooterWrapper>
      <p>&copy; 2025 Your Names Here. All Rights Reserved.</p>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  padding: 1rem;
  background-color: #333;
  color: #fff;
  text-align: center;
`;