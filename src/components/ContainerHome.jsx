import info from "../info.json";
import "../scss/ContainerHome.scss";
import chat from "../assets/images/icon-chat.png";
import money from "../assets/images/icon-money.png";
import security from "../assets/images/icon-security.png";

const images = [chat, money, security];

const Containerhome = () => {
  return (
    <div className="container">
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
    </div>
  );
};

export default Containerhome;
