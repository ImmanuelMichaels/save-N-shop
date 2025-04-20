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
  {
    img: '/images/essential-week.png',
    label: '50% off Home Essentials',
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
            <p>Turn your spare change into purchasing power.<br/> Build your shopping stash bit by bit, and unlock smarter monthly buying.</p>
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
            <h3 className='t-headings'>Pricing</h3>
            <p>Choose a Plan That Fits Your Pocket - Save Daily, Stocks Up Monthly.</p>
          </div>
          

          <div className="plan-content">
            <div className="plan">

            </div>
            <div className="plan"></div>
            <div className="plan"></div>
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