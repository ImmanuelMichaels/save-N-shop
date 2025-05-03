import React, { useRef, useState} from 'react';
import { motion } from "framer-motion"; 
import './Home.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const cards = [
  {img: '/images/w2.jpeg' },
  {img: '/images/gg.jpg' },
  {img: '/images/1.jpg' },
  {img: '/images/2.jpg' },
  {img: '/images/frontview.jpg' },
  {img: '/images/shop1.jpeg' },
  {img: '/images/shop4.jpg' },
  {img: '/images/shop6.jpg' },
  {img: '/images/ios.jpg' },
];

const steps = [
  {
    img: '/images/target.jpg',
    heading: 'Set Your Goal',
    text: 'Pick what you want to buy or how much you want to save - groceries, household needs, or your monthly haul.',
  },
  {
    img: '/images/wallet.jpg',
    heading: 'Save Daily',
    text: 'Top up your wallet with small daily amounts - flexible, easy, and tailored to your pocket.',
  },
  {
    img: '/images/shopp.jpg',
    heading: 'Shop Monthly',
    text: 'At month\'s end, unlock your savings and shop with ease from our trusted store partners or redeem your cash.',
  },
];

const sponsors = [
  { img: '/images/fgn.png' },
  { img: '/images/Dangote_Group_Logo.svg.png' },
  { img: '/images/unilever-logo.jpg' },
  { img: '/images/hoc.jpg' },
  { img: '/images/chi-farm.png' },
  { img: '/images/flour-mills.png' },
  { img: '/images/bua.png' },
  { img: '/images/shoprite-logo.png' },
];

const singleBenefit = [
  { img: '/images/wallet.jpg' }
];

const categories = [
  {
    img: '/images/b2s.jpg',
    label: 'Back to School',
  },
  {
    img: '/images/q.jpg',
    label: 'Quality Assurance',
  },
  {
    img: '/images/sp.avif',
    label: 'Secured Payment',
  },
  {
    img: '/images/sales.jpg',
    label: '50% Bonus Monthly',
  },
  {
    img: '/images/special-offer.png',
    label: 'Special Offers',
  },
];


const Home = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);


  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 300); // Reset after animation
  };


   return (


    // HERO SECTION STARTS HERE

    <section id="home" className="hero">
      <div className="home-container">
        <div className="curve-wrapper">
            {cards.map((card, index) => (
            <div className="card" style={{ '--i': index }} key={index}>
              <img src={card.img} alt={card.title} className="card-img"/>
            </div>
            ))}
        </div>
        </div>
         <div className="hero-text">
            <h1>Save a Little Each Day, <br/>Shop Big Every Month!</h1>
            <p>Smart Shopping Starts Here.<br/> Save Bit By Bit, Shop Big Once a Month with our <br/> Flexible Grocery Plans for Every Lifestyle.</p>
          <div className="button">
            <a href="#signup" className="cta-btn" id='shopping'>Open account</a>
            <a href="#signup" className="cta-btn" id='download-app'>Download App</a>
          </div>
      </div>
    {/* HERO SECTION ENDS HERE */}

    {/* SPONSORED BADGE STARTS HERE */}
      <div className="sponsors-badge">
          {sponsors.map((sponsor, index) => (
        <div className="sponsors" key={index}>
          <img src={sponsor.img} alt={`Sponsor ${index + 1}`} />
      </div>
      ))}
    </div>
    {/* SPONSORED BADGE ENDS HERE */}

    {/* HOW IT WORKS SECTION STARTS HERE */}
      <div className="hiw-container" id='hiw-section'>
          <div className="head-text">
            <h3 className='t-headings'>How it Works</h3>
            <p>How "Save Daily, Shop Monthly" Works</p>
          </div>

        <div className="steps-container">
            {steps.map((step, index) => (
              <div className="step-box" key={index}>
                <div className="image">
                  <img src={step.img} alt={step.heading} />
                </div>
                <p id="inner-heading">{step.heading}</p>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      {/* HOW IT WORKS SECTION ENDS HERE */}

      {/* BENEFITS STARTS HERE */}
        <div className="benefits-container" id='benefit-section'>
          <div className="head-text">
            <h3 className='t-headings'>Benefits</h3>
          </div>

          <div className="benefit-content">
            <div className="benefit-image">
                {singleBenefit.map((benefit, index) => (
              <div className="benefit" key={index}>
                  <img src={benefit.img} alt={`Benefit ${index + 1}`} />
              </div>
              ))}
            </div>

            <div className="benefits-list">
              <h3 className='t-headings'>Why Save 'n' Shop Work Wonders</h3>

              <div id='list-tag'>
                <img src="/images/pointer-svgrepo-com.svg" alt="" />
                <p> <b>No More Bulk Stress</b> - Spread out your savings so monthly shopping feels effortless.
                </p>
              </div>
              <div id='list-tag'>
                <img src="/images/pointer-svgrepo-com.svg" alt="" />
                <p><b>Financial Discipline</b> - Build a healthy saving habit that fits your daily routine.
                </p>
              </div>
              <div id='list-tag'>
                <img src="/images/pointer-svgrepo-com.svg" alt="" />
                <p><b>Purchase Power</b> - Save first, spend smart - never feel broke at month's end.
                </p>
              </div>
              <div id='list-tag'>
                <img src="/images/pointer-svgrepo-com.svg" alt="" />
                <p><b>Peace of Mind</b> - Know your monthly shopping is covered in advance.</p>
              </div>
              </div>
          </div>
        </div>

        <div className="items-categories" id="items-box">
          <div className="essential-boxes">
            {categories.map((item, index) => (
              <div className="boxes" key={index}>
                <div className="images">
                  <img src={item.img} alt={item.label} />
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="button">
            <a
              href="#signup"
              className="cta-btn group flex items-center gap-2 transition-all duration-300"
              onClick={handleClick}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              Start Saving
              <motion.span
                initial={{ x: 0, opacity: 0 }}
                animate={{
                  x: clicked ? 20 : 0,
                  opacity: hovered ? 1 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                →
              </motion.span>
            </a>
          </div>
        </div>
        
        <div className="pricing">
          <div className="head-text">
            <h3 className='t-headings'>Subscription Plan</h3>
            <p>Choose a Plan That Fits Your Pocket - Save Daily, Stocks Up Monthly.</p>
          </div>
          

          <div className="plan-content">
            <div className="plan" id='basic'>
              <div id="plan-box">
                  <h4 className="p-heading">{"\u20A6"}10,000.00</h4>
                  <p id='italic'>Perfect for singles or light essentials</p>
                  <p><span>Daily Saving Target: {"\u20A6"}334/day</span></p>
              </div>  
              <div className="items-holder">
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>5kg bag of Rice</div>
                <div id='i'><svg width="64px" height="64px" viewBox="-16 -16 64.00 64.00" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ff0000" stroke="#ff0000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g> <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g> <g id="Message"></g> <g id="Telephone"></g> <g id="User"></g> <g id="File"></g> <g id="Folder"></g> <g id="Map"></g> <g id="Download"></g> <g id="Upload"></g> <g id="Video_Recorder"></g> <g id="Schedule"></g> <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g> <g id="Pencils"></g> <g id="Group"></g> <g id="Record"></g> <g id="Headphone"></g> <g id="Music_Player"></g> <g id="Sound_On"></g> <g id="Sound_Off"></g> <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g> <g id="Favorite"></g> <g id="Film_1_"></g> <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g> <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g> <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g> <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g> <g id="Add"></g> <g id="Close"> <path d="M26.6,5.4C23.8,2.6,20,1,16,1S8.2,2.6,5.4,5.4C2.6,8.2,1,12,1,16s1.6,7.8,4.4,10.6C8.2,29.4,12,31,16,31 s7.8-1.6,10.6-4.4C29.4,23.8,31,20,31,16S29.4,8.2,26.6,5.4z" fill="#fe0101"></path> <path d="M17.4,16l5-5c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4,0l-5,4.9l-5-4.9 c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l5,5l-5,5c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7 c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l5-5l5,5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.7 c0-0.3-0.1-0.5-0.3-0.7L17.4,16z" fill="#ffffff"></path> </g> <g id="Forward"></g> <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g> <g id="Laptop"></g> </g></svg>1kg of Frozen Chicken or Fish</div>
                <div id='i'><svg width="64px" height="64px" viewBox="-16 -16 64.00 64.00" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ff0000" stroke="#ff0000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g> <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g> <g id="Message"></g> <g id="Telephone"></g> <g id="User"></g> <g id="File"></g> <g id="Folder"></g> <g id="Map"></g> <g id="Download"></g> <g id="Upload"></g> <g id="Video_Recorder"></g> <g id="Schedule"></g> <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g> <g id="Pencils"></g> <g id="Group"></g> <g id="Record"></g> <g id="Headphone"></g> <g id="Music_Player"></g> <g id="Sound_On"></g> <g id="Sound_Off"></g> <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g> <g id="Favorite"></g> <g id="Film_1_"></g> <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g> <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g> <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g> <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g> <g id="Add"></g> <g id="Close"> <path d="M26.6,5.4C23.8,2.6,20,1,16,1S8.2,2.6,5.4,5.4C2.6,8.2,1,12,1,16s1.6,7.8,4.4,10.6C8.2,29.4,12,31,16,31 s7.8-1.6,10.6-4.4C29.4,23.8,31,20,31,16S29.4,8.2,26.6,5.4z" fill="#fe0101"></path> <path d="M17.4,16l5-5c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4,0l-5,4.9l-5-4.9 c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l5,5l-5,5c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7 c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l5-5l5,5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.7 c0-0.3-0.1-0.5-0.3-0.7L17.4,16z" fill="#ffffff"></path> </g> <g id="Forward"></g> <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g> <g id="Laptop"></g> </g></svg>1 pack of Cereal</div>
                <div id='i'><svg width="64px" height="64px" viewBox="-16 -16 64.00 64.00" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ff0000" stroke="#ff0000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g> <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g> <g id="Message"></g> <g id="Telephone"></g> <g id="User"></g> <g id="File"></g> <g id="Folder"></g> <g id="Map"></g> <g id="Download"></g> <g id="Upload"></g> <g id="Video_Recorder"></g> <g id="Schedule"></g> <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g> <g id="Pencils"></g> <g id="Group"></g> <g id="Record"></g> <g id="Headphone"></g> <g id="Music_Player"></g> <g id="Sound_On"></g> <g id="Sound_Off"></g> <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g> <g id="Favorite"></g> <g id="Film_1_"></g> <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g> <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g> <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g> <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g> <g id="Add"></g> <g id="Close"> <path d="M26.6,5.4C23.8,2.6,20,1,16,1S8.2,2.6,5.4,5.4C2.6,8.2,1,12,1,16s1.6,7.8,4.4,10.6C8.2,29.4,12,31,16,31 s7.8-1.6,10.6-4.4C29.4,23.8,31,20,31,16S29.4,8.2,26.6,5.4z" fill="#fe0101"></path> <path d="M17.4,16l5-5c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4,0l-5,4.9l-5-4.9 c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l5,5l-5,5c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7 c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l5-5l5,5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.7 c0-0.3-0.1-0.5-0.3-0.7L17.4,16z" fill="#ffffff"></path> </g> <g id="Forward"></g> <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g> <g id="Laptop"></g> </g></svg>2 pack of Spaghetti</div>
                <div id='i'><svg width="64px" height="64px" viewBox="-16 -16 64.00 64.00" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ff0000" stroke="#ff0000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g> <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g> <g id="Message"></g> <g id="Telephone"></g> <g id="User"></g> <g id="File"></g> <g id="Folder"></g> <g id="Map"></g> <g id="Download"></g> <g id="Upload"></g> <g id="Video_Recorder"></g> <g id="Schedule"></g> <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g> <g id="Pencils"></g> <g id="Group"></g> <g id="Record"></g> <g id="Headphone"></g> <g id="Music_Player"></g> <g id="Sound_On"></g> <g id="Sound_Off"></g> <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g> <g id="Favorite"></g> <g id="Film_1_"></g> <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g> <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g> <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g> <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g> <g id="Add"></g> <g id="Close"> <path d="M26.6,5.4C23.8,2.6,20,1,16,1S8.2,2.6,5.4,5.4C2.6,8.2,1,12,1,16s1.6,7.8,4.4,10.6C8.2,29.4,12,31,16,31 s7.8-1.6,10.6-4.4C29.4,23.8,31,20,31,16S29.4,8.2,26.6,5.4z" fill="#fe0101"></path> <path d="M17.4,16l5-5c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4,0l-5,4.9l-5-4.9 c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l5,5l-5,5c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7 c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l5-5l5,5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.7 c0-0.3-0.1-0.5-0.3-0.7L17.4,16z" fill="#ffffff"></path> </g> <g id="Forward"></g> <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g> <g id="Laptop"></g> </g></svg>1L Hypo Bleach</div>
                <div id='i'><svg width="64px" height="64px" viewBox="-16 -16 64.00 64.00" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ff0000" stroke="#ff0000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g> <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g> <g id="Message"></g> <g id="Telephone"></g> <g id="User"></g> <g id="File"></g> <g id="Folder"></g> <g id="Map"></g> <g id="Download"></g> <g id="Upload"></g> <g id="Video_Recorder"></g> <g id="Schedule"></g> <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g> <g id="Pencils"></g> <g id="Group"></g> <g id="Record"></g> <g id="Headphone"></g> <g id="Music_Player"></g> <g id="Sound_On"></g> <g id="Sound_Off"></g> <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g> <g id="Favorite"></g> <g id="Film_1_"></g> <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g> <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g> <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g> <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g> <g id="Add"></g> <g id="Close"> <path d="M26.6,5.4C23.8,2.6,20,1,16,1S8.2,2.6,5.4,5.4C2.6,8.2,1,12,1,16s1.6,7.8,4.4,10.6C8.2,29.4,12,31,16,31 s7.8-1.6,10.6-4.4C29.4,23.8,31,20,31,16S29.4,8.2,26.6,5.4z" fill="#fe0101"></path> <path d="M17.4,16l5-5c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4,0l-5,4.9l-5-4.9 c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l5,5l-5,5c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7 c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l5-5l5,5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.7 c0-0.3-0.1-0.5-0.3-0.7L17.4,16z" fill="#ffffff"></path> </g> <g id="Forward"></g> <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g> <g id="Laptop"></g> </g></svg>1 Carton of Noodles</div>
                <div id='i'><svg width="64px" height="64px" viewBox="-16 -16 64.00 64.00" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ff0000" stroke="#ff0000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g> <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g> <g id="Message"></g> <g id="Telephone"></g> <g id="User"></g> <g id="File"></g> <g id="Folder"></g> <g id="Map"></g> <g id="Download"></g> <g id="Upload"></g> <g id="Video_Recorder"></g> <g id="Schedule"></g> <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g> <g id="Pencils"></g> <g id="Group"></g> <g id="Record"></g> <g id="Headphone"></g> <g id="Music_Player"></g> <g id="Sound_On"></g> <g id="Sound_Off"></g> <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g> <g id="Favorite"></g> <g id="Film_1_"></g> <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g> <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g> <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g> <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g> <g id="Add"></g> <g id="Close"> <path d="M26.6,5.4C23.8,2.6,20,1,16,1S8.2,2.6,5.4,5.4C2.6,8.2,1,12,1,16s1.6,7.8,4.4,10.6C8.2,29.4,12,31,16,31 s7.8-1.6,10.6-4.4C29.4,23.8,31,20,31,16S29.4,8.2,26.6,5.4z" fill="#fe0101"></path> <path d="M17.4,16l5-5c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4,0l-5,4.9l-5-4.9 c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l5,5l-5,5c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7 c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l5-5l5,5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.7 c0-0.3-0.1-0.5-0.3-0.7L17.4,16z" fill="#ffffff"></path> </g> <g id="Forward"></g> <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g> <g id="Laptop"></g> </g></svg>2kg Beans</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1kg bag of Semovita</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1 sachet of Tomatoe Paste</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1kg bag of Garri</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1L of Groundnut oil</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>2 Loaves of Bread</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1pcs bar of Bath Soap</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1pck Detergent</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1 Roll of Tissue paper</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>Maggi/Seasoning Cubes</div>
              </div>
                <div className="sub-button">
                  <button>SUBSCRIBE</button>
                </div>
                <p><span>Bonus:</span> 1 sachet Milk or Omo on your 3rd month</p>
            </div>
            <div className="plan" id='standard'>
              <div id="plan-box">
                <h4 className="p-heading">{"\u20A6"}20,000.00</h4>
                <p id='italic'>Ideal for couples or small families</p>
                  <p><span>Daily Saving Target: {"\u20A6"}667/day</span></p>
              </div>
              <div className="items-holder">
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>10kg bag of Rice</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1kg of Frozen Chicken or Fish</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>2kg bag of Semovita</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>3 packs of Spaghetti</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1 pack of Cereal</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>5 sachet of Tomatoe Paste</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>2kg Garri</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1kg Beans</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1 Bottle of Groundnut or Palm oil</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>4 Loaves of Bread</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>2 bar of Bath Soap</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1pck Detergent</div>
                <div id='i'><svg width="64px" height="64px" viewBox="-16 -16 64.00 64.00" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ff0000" stroke="#ff0000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g> <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g> <g id="Message"></g> <g id="Telephone"></g> <g id="User"></g> <g id="File"></g> <g id="Folder"></g> <g id="Map"></g> <g id="Download"></g> <g id="Upload"></g> <g id="Video_Recorder"></g> <g id="Schedule"></g> <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g> <g id="Pencils"></g> <g id="Group"></g> <g id="Record"></g> <g id="Headphone"></g> <g id="Music_Player"></g> <g id="Sound_On"></g> <g id="Sound_Off"></g> <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g> <g id="Favorite"></g> <g id="Film_1_"></g> <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g> <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g> <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g> <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g> <g id="Add"></g> <g id="Close"> <path d="M26.6,5.4C23.8,2.6,20,1,16,1S8.2,2.6,5.4,5.4C2.6,8.2,1,12,1,16s1.6,7.8,4.4,10.6C8.2,29.4,12,31,16,31 s7.8-1.6,10.6-4.4C29.4,23.8,31,20,31,16S29.4,8.2,26.6,5.4z" fill="#fe0101"></path> <path d="M17.4,16l5-5c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4,0l-5,4.9l-5-4.9 c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l5,5l-5,5c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7 c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l5-5l5,5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.7 c0-0.3-0.1-0.5-0.3-0.7L17.4,16z" fill="#ffffff"></path> </g> <g id="Forward"></g> <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g> <g id="Laptop"></g> </g></svg>1 carton of Noodles</div>
                <div id='i'><svg width="64px" height="64px" viewBox="-16 -16 64.00 64.00" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ff0000" stroke="#ff0000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g> <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g> <g id="Message"></g> <g id="Telephone"></g> <g id="User"></g> <g id="File"></g> <g id="Folder"></g> <g id="Map"></g> <g id="Download"></g> <g id="Upload"></g> <g id="Video_Recorder"></g> <g id="Schedule"></g> <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g> <g id="Pencils"></g> <g id="Group"></g> <g id="Record"></g> <g id="Headphone"></g> <g id="Music_Player"></g> <g id="Sound_On"></g> <g id="Sound_Off"></g> <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g> <g id="Favorite"></g> <g id="Film_1_"></g> <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g> <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g> <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g> <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g> <g id="Add"></g> <g id="Close"> <path d="M26.6,5.4C23.8,2.6,20,1,16,1S8.2,2.6,5.4,5.4C2.6,8.2,1,12,1,16s1.6,7.8,4.4,10.6C8.2,29.4,12,31,16,31 s7.8-1.6,10.6-4.4C29.4,23.8,31,20,31,16S29.4,8.2,26.6,5.4z" fill="#fe0101"></path> <path d="M17.4,16l5-5c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4,0l-5,4.9l-5-4.9 c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l5,5l-5,5c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7 c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l5-5l5,5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.7 c0-0.3-0.1-0.5-0.3-0.7L17.4,16z" fill="#ffffff"></path> </g> <g id="Forward"></g> <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g> <g id="Laptop"></g> </g></svg>1L of Hypo Bleach</div>
                <div id='i'><svg width="64px" height="64px" viewBox="-16 -16 64.00 64.00" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ff0000" stroke="#ff0000" stroke-width="0.00032"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Home"></g> <g id="Print"></g> <g id="Mail"></g> <g id="Camera"></g> <g id="Video"></g> <g id="Film"></g> <g id="Message"></g> <g id="Telephone"></g> <g id="User"></g> <g id="File"></g> <g id="Folder"></g> <g id="Map"></g> <g id="Download"></g> <g id="Upload"></g> <g id="Video_Recorder"></g> <g id="Schedule"></g> <g id="Cart"></g> <g id="Setting"></g> <g id="Search"></g> <g id="Pencils"></g> <g id="Group"></g> <g id="Record"></g> <g id="Headphone"></g> <g id="Music_Player"></g> <g id="Sound_On"></g> <g id="Sound_Off"></g> <g id="Lock"></g> <g id="Lock_open"></g> <g id="Love"></g> <g id="Favorite"></g> <g id="Film_1_"></g> <g id="Music"></g> <g id="Puzzle"></g> <g id="Turn_Off"></g> <g id="Book"></g> <g id="Save"></g> <g id="Reload"></g> <g id="Trash"></g> <g id="Tag"></g> <g id="Link"></g> <g id="Like"></g> <g id="Bad"></g> <g id="Gallery"></g> <g id="Add"></g> <g id="Close"> <path d="M26.6,5.4C23.8,2.6,20,1,16,1S8.2,2.6,5.4,5.4C2.6,8.2,1,12,1,16s1.6,7.8,4.4,10.6C8.2,29.4,12,31,16,31 s7.8-1.6,10.6-4.4C29.4,23.8,31,20,31,16S29.4,8.2,26.6,5.4z" fill="#fe0101"></path> <path d="M17.4,16l5-5c0.2-0.2,0.3-0.5,0.3-0.7c0-0.3-0.1-0.5-0.3-0.7c-0.4-0.4-1-0.4-1.4,0l-5,4.9l-5-4.9 c-0.4-0.4-1-0.4-1.4,0c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7l5,5l-5,5c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.3,0.1,0.5,0.3,0.7 c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3l5-5l5,5c0.2,0.2,0.5,0.3,0.7,0.3c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.3-0.7 c0-0.3-0.1-0.5-0.3-0.7L17.4,16z" fill="#ffffff"></path> </g> <g id="Forward"></g> <g id="Back"></g> <g id="Buy"></g> <g id="Mac"></g> <g id="Laptop"></g> </g></svg>1 Pack of Macaroni</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>Maggi/Seasoning Cubes</div>
              </div>
                <div className="sub-button">
                  <button>SUBSCRIBE</button>
                </div>
                <p><span>Bonus:</span> 1 free delivery every 2 months</p>
            </div>
            <div className="plan" id='celebrity'>
              <div id="plan-box">
                <h4 className="p-heading">{"\u20A6"}50,000.00</h4>
                <p id='italic'>For larger families or bulk shoppers</p>
                <p><span>Daily Saving Target: {"\u20A6"}1,667/day</span></p>
              </div>
              <div className="items-holder">
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>25kg bag of Rice</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>3kg of Chicken, Beef or Fish</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>2kg bag of Semovita</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>5 packs 0f Spaghetti</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1 pack of Custard or Cereal</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1 pack of Macaroni</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1 carton of Tomatoe Paste</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>5kg Garri</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>3kg Beans</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>5 Bottle of Groundnut/Palm oil</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>3 bar of Bath Soap + Liquid Soap</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1 bottle of Hypo</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>2pck Detergent (Large)</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>Seasoning Variety Pack</div>
                <div id='i'><svg fill="#239a31" width="64px" height="64px" viewBox="-12 -12 48.00 48.00" xmlns="http://www.w3.org/2000/svg" stroke="#239a31" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm5.676,8.237-6,5.5a1,1,0,0,1-1.383-.03l-3-3a1,1,0,1,1,1.414-1.414l2.323,2.323,5.294-4.853a1,1,0,1,1,1.352,1.474Z"></path></g></svg>1 carton of Noodles</div>
                <div id='i'><span>Optional Add-on:</span>  Milo/Milk/Cornflakes</div>
              </div>
                <div className="sub-button">
                  <button>SUBSCRIBE</button>
                </div>
                <p><span>Bonus:</span> 1 Surprise Item + Free Delivery</p>
            </div>
          </div>
        </div>

        <div className="testimonial-container">
          <div className="head-text">
            <h3 className='t-headings'>Real Users, Real Impact.</h3>
            <p>See how others are changing their shopping game - one day at a time.</p>
          </div>

          
        </div>
  
    </section>
);
};

export default Home;