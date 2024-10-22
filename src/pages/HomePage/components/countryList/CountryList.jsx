import { Link } from "react-router-dom";
import { useCountry } from "../../../../providers/countriesProvider";
import "./countrylist.scss";

const CountryList = () => {
  const {countries} = useCountry()
  return (
    <>
      <div className="countryListContainer">
        <h3 className="text-2xl text-red-400">Country List</h3>
        <div id="countryList">
          {countries.map((country, i) => (
            <div
              key={`countrylisthomepage${i}`}
              className="basis-full lg:basis-1/3 p-2 "
            >
              <Link to="/countryDetail">{country.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default CountryList;
