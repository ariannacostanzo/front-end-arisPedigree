import './formLabel.scss';

const FormLabel = ({ forName, label, isMandatory = false, children }) => {
  return (
    <>
      <div className="form-label">
        <label htmlFor={forName}>{label}

          {/* Marker per i campi obbligatori */}
          {isMandatory && <span className='text-red-400'>*</span>}

        </label>
        {children}
      </div>
    </>
  );
}
export default FormLabel;