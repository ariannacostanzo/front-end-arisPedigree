import Heading from "../../assets/components/heading/Heading";
import "./contactUsPage.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faVk, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const ContactusPage = () => {
  return (
    <>
      <Heading heading="Contact us"></Heading>

      <div className="bg-white contact-us-container">
        <div className="p-4 container mx-auto">

          {/* Email */}
          <h4>
            <a
              className="email-sender"
              href="mailto:dogsintheworld2019@protonmail.com">
              <FontAwesomeIcon className="mr-2 text-[#E89F41]" icon={faEnvelope} />
              dogsintheworld2019@protonmail.com</a>
          </h4>

          {/* Cell */}
          <h4 className="my-6">
            <span>
              <FontAwesomeIcon className="mr-2 text-[#E89F41]" icon={faPhone} />
              Call us at: +39 371 30 30 412</span>
          </h4>

          {/* Social */}
          <h4>Find us on:</h4>
          <ul className="socials-list mt-2 flex flex-col gap-5 justify-center text-2xl">
            <li>
              <a href="#" className="bg-[#0867ff]">
                <FontAwesomeIcon className="mr-2" icon={faFacebook}></FontAwesomeIcon>
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#2298ef]">
                <FontAwesomeIcon className="mr-2" icon={faTwitter}></FontAwesomeIcon>
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#0174b5]">
                <FontAwesomeIcon className="mr-2" icon={faLinkedin}></FontAwesomeIcon>
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://wa.me/393713030412" target="_blank" className="bg-[#0eab04]">
                <FontAwesomeIcon className="mr-2" icon={faWhatsapp}></FontAwesomeIcon>
                WhatsApp
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#e1395f]">
                <FontAwesomeIcon className="mr-2" icon={faInstagram}></FontAwesomeIcon>
                Instagram
              </a>
            </li>
          </ul>

        </div>
      </div>
    </>
  );
};
export default ContactusPage;

//da mettere la pagina social , email ecc