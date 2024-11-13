import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { City, Country, State } from "country-state-city";

const GetAllCountryStateCity = ({
  cityName,
  stateName,
  countryName,
  pinCodeName,
  formik,
  pinCodeValues,
  handleReset,
  country,
  state,
  city,
  setCountry,
  setState,
  setCity,
  stateData,
  setStateData,
}) => {
  const [countryData, setCountryData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStateName, setSelectedStateName] = useState("");

  console.log("stateData", stateData);
  useEffect(() => {
    // Initialize countryData with all countries
    const countries = Country.getAllCountries();
    setCountryData(countries);

    // Find and set the default country to India
    const defaultCountry = countries.find(
      (country) => country.name === "India"
    );
    if (defaultCountry) {
      setCountry(defaultCountry.isoCode);
      formik.setFieldValue(countryName, defaultCountry.name);
    }
  }, []);

  useEffect(() => {
    if (country) {
      setStateData(State.getStatesOfCountry(country));
    }
  }, [country]);

  useEffect(() => {
    if (country && state) {
      setCityData(City.getCitiesOfState(country, state));
    }
  }, [country, state]);

  const handleCountryChange = (event) => {
    const selectedCountryISOCode = event?.target?.value;

    setCountry(selectedCountryISOCode);
    const selectedCountry = countryData.find(
      (countryItem) => countryItem.isoCode === selectedCountryISOCode
    );
    formik.setFieldValue(countryName, selectedCountry.name);
    setState(""); // Reset state when the country changes
    setSelectedStateName(""); // Reset state name
  };

  const handleStateChange = (event) => {
    const selectedStateISOCode = event?.target?.value;
    const selectedState = stateData.find(
      (stateItem) => stateItem.isoCode === selectedStateISOCode
    );
    setState(selectedStateISOCode);
    setSelectedStateName(selectedState.name);
    formik.setFieldValue(stateName, selectedState.name);
    console.log("selectedStateName", selectedState);
    setCity(""); // Reset city when the state changes
  };

  const handleCityChange = (event) => {
    const selectedCity = event?.target?.value;
    setCity(selectedCity);
    formik.setFieldValue(cityName, selectedCity);
  };

  return (
    <Box>
      {/* country and state */}
      <Box
        sx={{
          display: "flex",
          alignItems: {
            lg: "flex-start",
            md: "flex-start",
            sm: "flex-start",
            xs: "flex-start",
          },
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "row",
            xs: "column",
          },
          gap: "10px",
          mb: 1,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel id="country-label">Country</InputLabel>
          <Select
            labelId="country-label"
            id="country-select"
            value={country}
            name={countryName}
            label="Country"
            onChange={handleCountryChange}
            disabled
          >
            {countryData.map((countryItem) => (
              <MenuItem key={countryItem.isoCode} value={countryItem?.isoCode}>
                {countryItem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            id="state-select"
            value={state}
            name={stateName}
            label="State"
            onChange={handleStateChange}
          >
            {stateData.map((stateItem) => (
              <MenuItem key={stateItem.isoCode} value={stateItem.isoCode}>
                {stateItem.name}
              </MenuItem>
            ))}
          </Select>
          {/* Helper Text */}
          <FormHelperText
            style={{
              color: "red",
              margin: "2px 0 0 5px",
              fontSize: ".7rem",
            }}
          >
            {formik.touched?.address?.state && formik.errors?.address?.state}
          </FormHelperText>
        </FormControl>
      </Box>

      {/* city and pin code */}
      <Box
        sx={{
          display: "flex",
          alignItems: {
            lg: "flex-start",
            md: "flex-start",
            sm: "flex-start",
            xs: "flex-start",
          },
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "row",
            xs: "column",
          },
          gap: "10px",
          mb: 1,
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel id="city-label">City</InputLabel>
          <Select
            labelId="city-label"
            id="city-select"
            value={city}
            name={cityName}
            label="City"
            onChange={handleCityChange}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            {cityData
              .filter((cityItem) =>
                cityItem.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((filteredCity) => (
                <MenuItem key={filteredCity.name} value={filteredCity.name}>
                  {filteredCity.name}
                </MenuItem>
              ))}
          </Select>
          {/* Helper Text */}
          <FormHelperText
            style={{
              color: "red",
              margin: "2px 0 0 5px",
              fontSize: ".7rem",
            }}
          >
            {formik.touched?.address?.city && formik.errors?.address?.city}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            size="small"
            id="outlined-basic"
            label="Enter pin code"
            name={pinCodeName}
            value={pinCodeValues}
            variant="outlined"
            placeholder="Enter pin code"
            onChange={formik.handleChange}
          />
          {/* Helper Text */}
          <FormHelperText
            style={{
              color: "red",
              margin: "2px 0 0 5px",
              fontSize: ".7rem",
            }}
          >
            {formik.touched?.address?.pinCode &&
              formik.errors?.address?.pinCode}
          </FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
};

export default GetAllCountryStateCity;
