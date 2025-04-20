import React from 'react';
import './Essential.css';

const Essentials = () => {
  return (
    <section id='flash' className='sales'>
        <div className="essentials-cat">
          <div className="boxes">
            <img src="#" alt="" />
            <span>Groceries</span>
          </div>
          <div className="boxes">
            <img src="#" alt="" />
            <span>Provisions</span>
          </div>
          <div className="boxes">
            <img src="#" alt="" />
            <span>Beverages</span>
          </div>
          <div className="boxes">
            <img src="#" alt="" />
            <span>Home Essentials</span>
          </div>
          <div className="boxes">
            <img src="/public/images/special-offer.png" alt="image" />
            <span>Special offers</span>
          </div>
          <div className="boxes">
            <img src="/public/images/essential-week.png" alt="image" />
            <span>Upto 80% off</span>
          </div>
        </div>
    </section>
  )
}

export default Essentials
