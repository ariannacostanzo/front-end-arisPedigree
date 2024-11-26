import Heading from "../../assets/components/heading/Heading";
import "./contactUsPage.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faPaw } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faLinkedin, faTwitter, faVk, faWhatsapp, faPinterest, faTiktok, faThreads } from "@fortawesome/free-brands-svg-icons";

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
              <a
                href="https://www.facebook.com/workingdogsintheworld/"
                target="_blank"
                className="bg-[#0867ff]">
                <FontAwesomeIcon className="mr-2" icon={faFacebook}></FontAwesomeIcon>
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://x.com/WDogsInTheWorld?t=vRaMbQo-DK7EZ0_8S3vGZg&s=09"
                target="_blank"
                className="bg-[#2298ef]">
                <FontAwesomeIcon className="mr-2" icon={faTwitter}></FontAwesomeIcon>
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@dogsintheworld?_t=8rgxLHJGBZW&_r=1"
                target="_blank"
                className="tiktok bg-[#000]">
                <FontAwesomeIcon className="mr-2" icon={faTiktok}></FontAwesomeIcon>
                TikTok
              </a>
            </li>
            <li>
              <a
                href="https://www.threads.net/@working_dogs_in_the_world"
                target="_blank"
                className=" bg-[#000]">
                <FontAwesomeIcon className="mr-2" icon={faThreads}></FontAwesomeIcon>
                Threads
              </a>
            </li>
            <li>
              <a href="#" className="bg-[#0174b5]">
                <FontAwesomeIcon className="mr-2" icon={faLinkedin}></FontAwesomeIcon>
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/393713030412"
                target="_blank"
                className="bg-[#0eab04]">
                <FontAwesomeIcon className="mr-2" icon={faWhatsapp}></FontAwesomeIcon>
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/working_dogs_in_the_world/"
                target="_blank"
                className="bg-[#C13584]">
                <FontAwesomeIcon className="mr-2" icon={faInstagram}></FontAwesomeIcon>
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://it.pinterest.com/workingdogsintheworld/"
                target="_blank"
                className="bg-[#ce3226]">
                <FontAwesomeIcon className="mr-2" icon={faPinterest}></FontAwesomeIcon>
                Pinterest
              </a>
            </li>
            <li>
              <a
                href="https://vk.com/id536674510"
                target="_blank"
                className="bg-[#567ca0]">
                <FontAwesomeIcon className="mr-2" icon={faVk}></FontAwesomeIcon>
                VK
              </a>
            </li>
            <li>
              <a
                href="https://ok.ru/group/54439009386639"
                target="_blank"
                className="bg-[#e98019]">
                <FontAwesomeIcon className="mr-2" icon={faPaw}></FontAwesomeIcon>
                OK
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