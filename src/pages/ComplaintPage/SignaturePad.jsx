import { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import "./signaturePad.scss";

const SignaturePad = ({ onSignatureGenerate }) => {
  const [sign, setSign] = useState();

  const handleClear = () => {
    sign.clear();
  };
  const handleGenerate = () => {
    const signatureUrl = sign.getTrimmedCanvas().toDataURL("image/png");
    onSignatureGenerate(signatureUrl);
  };

  return (
    <>
      <div>
        <div className="border border-black">
          <SignatureCanvas
            canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
            ref={(data) => setSign(data)}
          ></SignatureCanvas>
        </div>
        <div className="flex justify-center gap-6">
          <div className="signature-btn" onClick={handleClear}>
            Clear
          </div>
          <div className="signature-btn" onClick={handleGenerate}>
            Save
          </div>
        </div>
      </div>
    </>
  );
};
export default SignaturePad;
