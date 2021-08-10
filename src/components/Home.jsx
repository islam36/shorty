import React, { useEffect } from 'react';
import {
  FaMoneyBill,
  FaLock,
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNodeJs,
  FaArrowDown
} from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { RiOpenSourceFill } from 'react-icons/ri';
import { DiMongodb } from 'react-icons/di';
import { BiInfinite } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const Home = () => {
  const cardsContent = [
    {
      icon: RiOpenSourceFill,
      text: "As we love open source, Shorty is also open source and built with open source! You can check our source code on our github repository. Any contribution is welcome too!"
    },
    {
      icon: FaMoneyBill,
      text: "Completly FREE to use! no credit card required! No annoying advertissments and no subscription. You can use it as you like and as long as you wish!"
    },
    {
      icon: BiInfinite,
      text: "Infinite links! You can create as many short links as you like. We are using a free plan database, so you can continue to use Shorty untill the free plan is completly used!"
    },
    {
      icon: FaLock,
      text: "Totally private. We keep our web app private. We don't collect any information from you. We also don't take responsability for adding links that conatins sensitive informations."
    }
  ];

  const cards = cardsContent.map((card, index) => (
    <div key={index}
      className="card"
      data-aos="fade-in"
      data-aos-delay={`${index * 200}`}
    >
      <card.icon className="icon" />
      <p className="card-content">{card.text}</p>
    </div>
  ));

  const toolsContent = [
    {
      icon: FaReact,
      color: '#61DBFB',
      title: 'React',
      link: 'https://www.reactjs.com'
    },
    {
      icon: FaNodeJs,
      color: '#66cc33',
      title: 'Node.js',
      link: 'https://www.nodejs.org'
    },
    {
      icon: DiMongodb,
      color: '#3FA037',
      title: 'MongoDB',
      link: 'https://www.mongodb.com'
    }
  ];

  const toolsCards = toolsContent.map((tool, index) => (
    <div
      key={index}
      className="tools__card"
    >
      <tool.icon
        className="tools__card-icon"
        color={tool.color}
      />
      <a
        href={tool.link}
        target="_blank"
      >{tool.title}</a>
    </div>
  ));

  useEffect(() => {
    document.title = "Shorty";
  }, []);

  return (
    <>
      <main>
        <section className="hero">
          <h1>Shorty</h1>
          <p>Just another free and open source link shortenr</p>
          <div className="hero__btns">
            <Link to="/register" className="hero__btn btn-primary">Get started</Link>
            <a href="#features" className="hero__btn btn-secondary">Learn more</a>
          </div>
          <FaArrowDown className="hero__arrow-icon" />
        </section>

        <section className="features" id="features">
          <h1>features</h1>
          <div className="cards">
            {cards}
          </div>
        </section>

        <section className="tools">
          <h1>Built with</h1>
          <div className="tools__cards">
            {toolsCards}
          </div>

          <p className="tools_text">{'This is the link to '}
            <a
              href="https://www.github.com/islam36/shorty"
              target="_blank"
            >the repo</a>
            {'. Don\'t forget to leave a little star ✨'}
          </p>
        </section>
      </main>

      <footer className="footer">
        <div className="social-icons">
          <a
            target="_blank"
            href="http://www.github.com/islam36"
          >
            <FaGithub className="icon" />
          </a>

          <a
            target="_blank"
            href="http://www.linkedin.com/in/med-islam-boumendjel"
          >
            <FaLinkedin className="icon" />
          </a>

          <a
            target="_blank"
            href="mailto:jm_boumendjel@esi.dz"
          >
            <MdMail className="icon" />
          </a>
        </div>

        <p>Built with 💖 and open source by <a href="https://www.github.com/islam36">Mohamed Islam Boumendjel</a></p>
      </footer>
    </>
  );
}

export default Home;