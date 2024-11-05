import Heading from "../../assets/components/heading/Heading";
import "./contactUsPage.scss";

const ContactusPage = () => {
  return (
    <>
      <Heading heading="Contact us"></Heading>

      <div className="bg-white contact-us-container">
        <div className="p-4 container mx-auto">
          <h4>Compile this form to contact us</h4>
          <form action="" className="form-container">
            <div className="lg:flex gap-4">
              <input type="text" name="" id="" placeholder="First Name" />
              <input type="text" name="" id="" placeholder="Last Name" />
            </div>
            <div>
              <input type="text" placeholder="Email" />
            </div>
            <textarea name="" id="" placeholder="Message"></textarea>
            <button className="custom-btn">Send</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ContactusPage;
