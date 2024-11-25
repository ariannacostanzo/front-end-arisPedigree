import footerImages from "../../../database/footer-img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faThreads, faPinterest, faTiktok, faLinkedin, faTwitter, faVk, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./footer.scss";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="px-4 py-16 container mx-auto">
        {/* dog photos  */}
        <div className="flex flex-wrap gap-2 justify-center">
          {footerImages.map((img, i) => (
            <a key={`footer-img${i}`} href={img.link} target="_blank">
              <img
                src={img.path}
                alt={`dog${i}`}
                className="w-[170px]  lg:w-[200px] h-[170px] lg:h-[200px] rounded-md"
              />
            </a>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className="blue-button">
            <a href="https://www.instagram.com/working_dogs_in_the_world/" target="_blank" >
              <FontAwesomeIcon
                className="mr-2"
                icon={faInstagram}
              ></FontAwesomeIcon>{" "}
              Follow on Istagram
            </a>
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
                <Link to="/dogs-list" onClick={() => window.scrollTo(0, 0)}>
                  <span className="line"></span>
                  Online Pedigree
                </Link>
              </li>
              <li>
                <Link to="/search-a-dog" onClick={() => window.scrollTo(0, 0)}>
                  <span className="line"></span>
                  Dogs Filter
                </Link>
              </li>
              <li>
                <Link to="/add-new-dog" onClick={() => window.scrollTo(0, 0)}>
                  <span className="line"></span>
                  Dogs Creation
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-nav my-10 lg:my-0 contacts">
            <h3>Contacts</h3>
            <span className="h3-divisor"></span>
            <ul>
              <li>
                <a href="mailto:dogsintheworld2019@protonmail.com">

                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mr-2 text-[#E89F41]"
                  ></FontAwesomeIcon>
                  dogsintheworld2019@protonmail.com
                </a>
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
          {/* <div className="footer-nav my-10 lg:my-0">
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
          </div> */}
        </div>
        <div className="social-footer">
          <ul className="flex gap-4 justify-center text-2xl">
            <li>
              <a
                href="https://www.facebook.com/workingdogsintheworld/"
                target="_blank"
                className="bg-[#0867ff]">
                <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a
                href="https://x.com/WDogsInTheWorld?t=vRaMbQo-DK7EZ0_8S3vGZg&s=09"
                target="_blank"
                className="bg-[#2298ef]">
                <FontAwesomeIcon icon={faTwitter}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#0174b5]">
                <FontAwesomeIcon icon={faLinkedin}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/393713030412"
                target="_blank"
                className="bg-[#0eab04]">
                <FontAwesomeIcon icon={faWhatsapp}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@dogsintheworld?_t=8rgxLHJGBZW&_r=1"
                target="_blank"
                className="tiktok bg-[#000]">
                <FontAwesomeIcon icon={faTiktok}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a
                href="https://www.threads.net/@working_dogs_in_the_world"
                target="_blank"
                className=" bg-[#000]">
                <FontAwesomeIcon icon={faThreads}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a
                href="https://it.pinterest.com/workingdogsintheworld/"
                target="_blank"
                className="bg-[#ce3226]">
                <FontAwesomeIcon icon={faPinterest}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a
                href="https://vk.com/id536674510"
                target="_blank"
                className="bg-[#567ca0]">
                <FontAwesomeIcon icon={faVk}></FontAwesomeIcon>
              </a>
            </li>

            {/* VEDI TU */}
            {/* <li>
              <a href="#" className="bg-[#794e93]">
                <FontAwesomeIcon icon={faPhoneVolume}></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#898a8f]">
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </a>
            </li> */}
          </ul>
        </div>
      </footer>
    </>
  );
};
export default Footer;
