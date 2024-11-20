import { MdLocationOn } from "react-icons/md";
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../../context/AuthenticationProvider";
const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOption, setOpenOption] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selectedDate",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const handleOptions = (name, operation) => {
    setOptions((prevOption) => {
      return {
        ...prevOption,
        [name]:
          operation === "inc" ? prevOption[name] + 1 : prevOption[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    // setSearchParams(encodedParams)

    navigate({ pathname: "/hotels", search: encodedParams.toString() });

    // console.log(encodedParams.get("options"), "sss");
  };
  return (
    <div className="header">
      <NavLink to="/bookmark">Bookmarks</NavLink>
      <div className="headerSearch">
        <div className="headerSearchItem">
          <MdLocationOn className="locationIcon headerIcon" />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="headerSearchInput"
            type="text"
            placeholder="Where To Go ???"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <HiCalendar className="headerIcon dateIcon" />
          <div
            className="dateDropDown"
            onClick={() => setOpenDate((prevState) => !prevState)}
          >
            {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
              date[0].endDate,
              "MM/dd/yyyy"
            )}`}
          </div>
          {openDate && (
            <DateRange
              className="date"
              ranges={date}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
              onChange={(item) => setDate([item.selectedDate])}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <div
            id="optionDropDown"
            onClick={() => setOpenOption((prevState) => !prevState)}
          >
            {options.adult} adult &nbsp;&bull;&nbsp;
            {options.children} children &nbsp;&bull;&nbsp;
            {options.room} room
          </div>
          {openOption && (
            <GuestOptionList
              options={options}
              handleOptions={handleOptions}
              setOpenOption={setOpenOption}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon" />
          </button>
        </div>
      </div>
      <User />
    </div>
  );
};

export default Header;

const GuestOptionList = ({ options, handleOptions, setOpenOption }) => {
  const ref = useRef();
  useOutsideClick(ref, "optionDropDown", () => {
    setOpenOption((prevState) => !prevState);
  });
  return (
    <div className="guestOptions" ref={ref}>
      <OptionItem
        handleOptions={handleOptions}
        options={options}
        type="adult"
        minLimit={1}
      />
      <OptionItem
        handleOptions={handleOptions}
        options={options}
        type="children"
        minLimit={0}
      />
      <OptionItem
        handleOptions={handleOptions}
        options={options}
        type="room"
        minLimit={1}
      />
    </div>
  );
};

function OptionItem({ options, type, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={minLimit >= options[type]}
          onClick={() => handleOptions(type, "dec")}
        >
          <HiMinus className="icon" />
        </button>
        <span className="optionCounterNumber">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleOptions(type, "inc")}
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}

const User = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log(navigate);
    // navigate("/login");
    logout();
  };
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <span>{user.name}</span>
          <button>
            <HiLogout
              onClick={handleLogout}
              className="icon"
              style={{ scale: "1.7", marginLeft: "1rem" }}
            />
          </button>
        </div>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </div>
  );
};
