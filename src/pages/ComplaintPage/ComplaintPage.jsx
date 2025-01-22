import { useState } from "react";
import Heading from "../../assets/components/heading/Heading";
import "./complaintPage.scss";
import SignaturePad from "./SignaturePad";
import { useNavigate } from "react-router-dom";

const ComplaintPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    physicalAddress: "",
    city: "",
    state: "",
    postalCode: "",
    complaint: "",
    url: "",
    signature: "",
    date: "",
  });
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    phoneNumber: false,
    physicalAddress: false,
    city: false,
    state: false,
    postalCode: false,
    complaint: false,
    url: false,
    signature: false,
    date: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignature = (signatureUrl) => {
    setFormData((prev) => ({ ...prev, signature: signatureUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const {
      fullName,
      email,
      physicalAddress,
      city,
      state,
      postalCode,
      complaint,
      url,
      signature,
      date,
    } = formData;

    if (!fullName) newErrors.fullName = true;
    if (!email) newErrors.email = true;
    if (!physicalAddress) newErrors.physicalAddress = true;
    if (!city) newErrors.city = true;
    if (!state) newErrors.state = true;
    if (!postalCode) newErrors.postalCode = true;
    if (!complaint) newErrors.complaint = true;
    if (!url) newErrors.url = true;
    if (!signature) newErrors.signature = true;
    if (!date) newErrors.date = true;

    if (Object.values(newErrors).some((value) => value === true)) {
      setErrors(newErrors);
      return;
    }

    navigate("/feedback", {
      state: "Your complaint has been successfully sent!",
    });
  };

  return (
    <>
      <Heading heading="Complaint"></Heading>
      <div className="bg-white complaint-page">
        <div className="p-4 container mx-auto">
          <h2 className="text-center font-bold text-2xl my-6">
            Copyright and Legal Violation Report Form
          </h2>

          <form onSubmit={handleSubmit}>
            <h3 className="text-center font-bold my-4">
              {" "}
              1. Complainant Information:
            </h3>
            <div className="lg:lg:flex text-center  gap-10 justify-center">
              {/* full Name  */}
              <div>
                <div className="my-2">
                  <label htmlFor="fullName">Full Name:*</label>
                </div>
                <input
                  className="w-full md:w-[500px]"
                  type="text"
                  name="fullName"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="fullName"
                  //   required
                />
                {errors.fullName && (
                  <div className="error-complaint">
                    You must insert your name
                  </div>
                )}
              </div>

              {/* email address  */}
              <div>
                <div className="my-2">
                  <label htmlFor="email">Email Address:*</label>
                </div>
                <input
                  className="w-full md:w-[500px]"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  //   required
                />
                {errors.email && (
                  <div className="error-complaint">
                    You must insert your email address
                  </div>
                )}
              </div>
            </div>
            <div className="lg:flex text-center gap-10 justify-center">
              {/* phoneNumber  */}
              <div>
                <div className="my-2">
                  <label htmlFor="phoneNumber">Phone Number (optional):</label>
                </div>
                <input
                  className="w-full md:w-[500px]"
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  autoComplete="phoneNumber"
                />
              </div>
              {/* physical address  */}
              <div>
                <div className="my-2">
                  <label htmlFor="physicalAddress">Physical Address:*</label>
                </div>
                <input
                  className="w-full md:w-[500px]"
                  type="text"
                  name="physicalAddress"
                  value={formData.physicalAddress}
                  onChange={handleChange}
                  autoComplete="physicalAddress"
                  //   required
                />
                {errors.physicalAddress && (
                  <div className="error-complaint">
                    You must insert your physical address
                  </div>
                )}
              </div>
            </div>
            <div className="lg:flex text-center gap-10 justify-center">
              {/* city  */}
              <div>
                <div className="my-2">
                  <label htmlFor="city">City:*</label>
                </div>
                <input
                  className="w-full md:w-[500px]"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  autoComplete="city"
                  //   required
                />
                {errors.city && (
                  <div className="error-complaint">
                    You must insert your city
                  </div>
                )}
              </div>

              {/* state  */}
              <div>
                <div className="my-2">
                  <label htmlFor="state">State:*</label>
                </div>
                <input
                  className="w-full md:w-[500px]"
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  autoComplete="state"
                  //   required
                />
                {errors.state && (
                  <div className="error-complaint">
                    You must insert your state
                  </div>
                )}
              </div>
            </div>
            <div className="lg:flex text-center gap-10 justify-center">
              {/* postal code  */}
              <div>
                <div className="my-2">
                  <label htmlFor="postalCode">Postal Code:*</label>
                </div>
                <input
                  className="w-full md:w-[500px]"
                  type="number"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  autoComplete="postalCode"
                  //   required
                />
                {errors.postalCode && (
                  <div className="error-complaint">
                    You must insert your postal code
                  </div>
                )}
              </div>
            </div>
            {/* Violated Content */}
            <h3 className="text-center font-bold my-4">
              {" "}
              2. Description of the Violated Content:
            </h3>
            <div className="lg:flex text-center gap-10 justify-center">
              <div>
                <div>
                  <label>
                    Please provide a detailed description of the alleged
                    violation (e.g., describe the copyrighted material that you
                    believe has been infringed):*
                  </label>
                </div>
                <div className="lg:flex text-center justify-center my-4">
                  <textarea
                    rows="4"
                    cols="40"
                    // required
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleChange}
                  ></textarea>
                </div>
                {errors.complaint && (
                  <div className="error-complaint">
                    You must insert the description
                  </div>
                )}
              </div>
            </div>
            {/* Link to the Violated Content */}
            <h3 className="text-center font-bold my-4">
              {" "}
              3. Link to the Violated Content:
            </h3>
            <div className="lg:flex text-center gap-10 justify-center">
              <div>
                <div className="my-2">
                  <label htmlFor="url">
                    URL where the violated content can be found:*:
                  </label>
                </div>
                <input
                  className="w-full md:w-[500px]"
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  autoComplete="url"
                  //   required
                />
                {errors.url && (
                  <div className="error-complaint">You must insert the url</div>
                )}
              </div>
            </div>
            {/* Certification */}
            <h3 className="text-center font-bold my-4"> 4. Certification:</h3>
            <div className="lg:flex text-center gap-10 justify-center">
              <div>
                By submitting this report, you certify under penalty of perjury
                that:
                <ul className="list-disc text-left my-4 mx-4">
                  <li>
                    The content you are reporting is protected by copyright.
                  </li>
                  <li>
                    You have not authorized the publication, distribution, or
                    use of the violated material.
                  </li>
                  <li>The information provided in this report is accurate.</li>
                </ul>
              </div>
            </div>
            {/* Signature of the Complainant */}
            <h3 className="text-center font-bold my-4">
              {" "}
              5.* Signature of the Complainant:*
            </h3>
            <div className="lg:flex text-center gap-10 justify-center">
              {/* signature  */}
              <div>
                <div className="my-2">
                  <label htmlFor="signature">
                    Signature ( draw under and save):*
                  </label>
                </div>
                <SignaturePad
                  onSignatureGenerate={handleSignature}
                ></SignaturePad>
                {errors.signature && (
                  <div className="error-complaint">
                    You must save the signature
                  </div>
                )}
              </div>
              {/* date  */}
              <div>
                <div className="my-2">
                  <label htmlFor="date">Date:*</label>
                </div>
                <input
                  className="w-full md:w-[500px]"
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  autoComplete="date"
                  //   required
                />
                {errors.date && (
                  <div className="error-complaint">
                    You must insert the date
                  </div>
                )}
              </div>
            </div>
            <h3 className="text-center font-bold my-4">
              {" "}
              6. Indemnification Statement:
            </h3>
            <div className="lg:flex text-center gap-10 justify-center">
              <p>
                The undersigned agrees to indemnify and hold harmless the
                website from any liability arising from legal claims related to
                the reported copyright infringement.
              </p>
            </div>
            <button className="custom-btn my-6"> Send Complaint</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default ComplaintPage;
