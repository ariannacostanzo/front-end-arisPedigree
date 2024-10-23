import { Link } from "react-router-dom";
import { useCountry } from "../../../../providers/countriesProvider";
import "./countrylist.scss";
import Loader from "../../../../assets/components/loader/Loader";

const CountryList = () => {
  const { countries, loading } = useCountry();
  return (
    <>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="countryListContainer">
          <div className="px-4 py-16 container mx-auto">
            <h3 className="my-10">Breed countries</h3>
            <h5>Select Country</h5>
            <div id="countryList">
              <div className="basis-1/2 lg:basis-1/4  countryItem ">
                <Link to="/countryDetail">-UNSET- &#40;0&#41;</Link>
              </div>
              {countries.length > 0 &&
                countries.map((country, i) => (
                  <div
                    key={`countrylisthomepage${i}`}
                    className="basis-1/2 lg:basis-1/4  countryItem "
                  >
                    <Link to="/countryDetail">{country.name} &#40;0&#41;</Link>
                  </div>
                ))}
            </div>
            {countries.length === 0 && <div>No countries found</div>}
          </div>
        </div>
      )}
    </>
  );
};
export default CountryList;
