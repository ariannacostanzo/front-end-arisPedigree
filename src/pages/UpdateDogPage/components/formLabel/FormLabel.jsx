import './formLabel.scss';

const FormLabel = ({ forName, label, isMandatory = false }) => {
  return (
    <>
      <div className="form-label">
        <label htmlFor={forName}>{label}

          {/* Marker per i campi obbligatori */}
          {isMandatory && <span className='text-red-400'>*</span>}

        </label>
      </div>
    </>
  );
}
export default FormLabel;