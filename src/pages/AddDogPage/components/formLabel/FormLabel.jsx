import './formLabel.scss';

const FormLabel = ({forName, label}) => {
     return (
       <>
         <div className="form-label">
           <label htmlFor={forName}>{label}</label>
         </div>
       </>
     );
}
export default FormLabel;