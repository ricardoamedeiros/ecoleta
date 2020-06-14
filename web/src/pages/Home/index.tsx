import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';

import logo from '../../assets/logo.svg';

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <h1>Liveforever</h1>
        </header>

        <main>
          <h1>Seu aplicativo para ajudar pessoas</h1>
          <p>
            Encontre pontos para realizar doação, ajudar ou receber ajuda.
          </p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastre um ponto de doação</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
