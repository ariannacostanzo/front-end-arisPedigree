import footerImages from "../../../database/footer-img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faVk, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./footer.scss";
import { faEnvelope, faPhone, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="p-4 container mx-auto">
        {/* dog photos  */}
        <div className="flex flex-wrap gap-2 justify-center">
          {footerImages.map((img, i) => (
            <a key={`footer-img${i}`} href={img.link}>
              <img
                src={img.path}
                alt={`dog${i}`}
                className="w-[170px]  lg:w-[200px]"
              />
            </a>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className="blue-button">
            <FontAwesomeIcon
              className="mr-2"
              icon={faInstagram}
            ></FontAwesomeIcon>{" "}
            Follow on Istagram
          </div>
        </div>
        {/* navigation  */}
        <div className="lg:flex gap-6 justify-between my-4">
          <div className="text-center">
            <img src="/logoaris.png" alt="" className="lg:w-[220px]" />
            <span className="tracking-[2px]">
              Free Pedigree <br /> for dogs of all breeds
            </span>
          </div>

          <div className="footer-nav my-10 lg:my-0">
            <h3>Services</h3>
            <span className="h3-divisor"></span>
            <ul>
              <li>
                <Link to="/search-a-dog">
                  <span className="line"></span>
                  Online Pedigree
                </Link>
              </li>
              <li>
                <Link to="/dogs-list">
                  <span className="line"></span>
                  Breeds List
                </Link>
              </li>
              <li>
                <Link to="/countryFilter">
                  <span className="line"></span>
                  Breeds Localization
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-nav my-10 lg:my-0 contacts">
            <h3>Contacts</h3>
            <span className="h3-divisor"></span>
            <ul>
              <li>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="mr-2 text-[#E89F41]"
                ></FontAwesomeIcon>
                dogsintheworld2019@protonmail.com
              </li>
              <li>
                <FontAwesomeIcon
                  icon={faPhone}
                  className="mr-2 text-[#E89F41]"
                ></FontAwesomeIcon>
                +39 371 30 30 412
              </li>
            </ul>
          </div>
          <div className="footer-nav my-10 lg:my-0">
            <h3>Newsletter</h3>
            <span className="h3-divisor"></span>
            <div className="w-full">
              <input
                type="email"
                placeholder="Your email"
                className="mb-2 w-full"
              />
            </div>
            <div>
              <input
                type="checkbox"
                name="subscription"
                id="subscription"
                className="mb-2"
              />
              <label htmlFor="subscription" className="ml-2">
                I accept the privacy policy indicated therein.
              </label>
            </div>
            <button className="my-4 w-full">Subscribe</button>
          </div>
        </div>
        <div className="social-footer">
          <ul className="flex gap-4 justify-center text-2xl">
            <li>
              <a href="#" className="bg-[#0867ff]">
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#2298ef]">
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#0174b5]">
                <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#0eab04]">
                <FontAwesomeIcon icon={faWhatsapp}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#567ca0]">
                <FontAwesomeIcon icon={faVk}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#794e93]">
                <FontAwesomeIcon icon={faPhoneVolume}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#898a8f]">
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
export default Footer;
