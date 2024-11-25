import Heading from "../../assets/components/heading/Heading";
import "./contactUsPage.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
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
          <ul className="socials-list flex gap-4 justify-center text-2xl">
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
      </div>
    </>
  );
};
export default ContactusPage;

//da mettere la pagina social , email ecc