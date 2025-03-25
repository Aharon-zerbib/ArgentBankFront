import NavBar from "../components/Nav";
import Containerhome from "../components/ContainerHome";
import "../scss/Home.scss";
import info from "../info.json";
import chat from "../assets/images/icon-chat.png";
import money from "../assets/images/icon-money.png";
import security from "../assets/images/icon-security.png";

const images = [chat, money, security];

const Home = () => {
  return (
    <>
      <NavBar />
      <div>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">
              Open a savings account with Argent Bank today!
            </p>
          </section>
        </div>
        <Containerhome>
          {info.card.map((item, index) => (
            <div key={item.id} className="container-item">
              <div className="container-font">
                <div className="circle">
                  <img src={images[index]} alt="icon" />
                </div>
              </div>
              <div className="container-text">
                <div className="title">{item.title}</div>
                <div className="subtitle">{item.paragraph}</div>
              </div>
            </div>
          ))}
        </Containerhome>
      </div>
    </>
  );
};

export default Home;
