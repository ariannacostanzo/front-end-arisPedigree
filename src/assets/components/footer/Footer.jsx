import footerImages from "../../../database/footer-img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./footer.scss";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

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
                <a href="#">
                  <span className="line"></span>
                  Online Pedigree
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="line"></span>
                  Breeds List
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="line"></span>
                  Breeds Localization
                </a>
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
          <ul>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};
export default Footer;
