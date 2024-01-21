import { useSearchHotelsMutation } from '@/redux/api';
import { useAppDispatch } from '@/redux/hooks';
import { updateSearchState } from '@/redux/hotelSlice';
import { Button, Divider, Spinner } from '@nextui-org/react';
import moment from 'moment';
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { BiSearch } from 'react-icons/bi';
import { CiCircleMinus } from 'react-icons/ci';
import { GoPlusCircle } from 'react-icons/go';
import { IoIosCloseCircle } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
//---------------------------------------------------------------------
type SearchBoxOpenWithType =
  | 'Location'
  | 'Dates'
  | 'StartDate'
  | 'EndDate'
  | 'Guests'
  | '';
interface SearchBoxOpenWithState {
  isOpen: boolean;
  openWith: SearchBoxOpenWithType;
  openSelectionBox: boolean;
}

//---------------------------------------------------------------------

const SearchBar = () => {
  const [searchBoxOpenWith, setSearchBoxOpenWith] =
    useState<SearchBoxOpenWithState>({
      isOpen: false,
      openWith: '',
      openSelectionBox: false
    });

  const closeBox = () =>
    setSearchBoxOpenWith((prevState) => ({
      ...prevState,
      isOpen: false,
      openWith: '',
      openSelectionBox: false
    }));

  const openBox = (openWith: SearchBoxOpenWithType) => {
    setSearchBoxOpenWith((prevState) => ({
      ...prevState,
      isOpen: true,
      openWith: openWith === 'Dates' ? 'StartDate' : openWith,
      openSelectionBox: true
    }));
  };
  return (
    <>
      <div
        style={{
          boxShadow: '0px 4px 6px 0px #1F29371A'
        }}
        className="min-w-[334px] rounded-full overflow-hidden h-[48px] border border-[#E5E7EB] relative"
      >
        <div className="flex items-center justify-between h-full pr-[8px]">
          <Button
            onClick={() => openBox('Location')}
            className="bg-white rounded-l-full h-full font-medium"
          >
            Anywhere
          </Button>
          <Divider className="h-[24px]" orientation="vertical" />
          <Button
            onClick={() => openBox('Dates')}
            className="bg-white rounded-none h-full font-medium"
          >
            Any week
          </Button>
          <Divider className="h-[24px]" orientation="vertical" />
          <Button
            onClick={() => openBox('Guests')}
            className="bg-white h-full rounded-none font-medium"
          >
            Add guests
          </Button>
          <Button
            onClick={() => openBox('')}
            className="bg-[#DE3151] flex items-center justify-center rounded-full ml-1"
            isIconOnly
          >
            <BiSearch className="text-white h-[12px] w-[12px]" />
          </Button>
        </div>
      </div>
      <SearchInputBox
        closeBox={closeBox}
        setSearchBoxOpenWith={setSearchBoxOpenWith}
        searchBoxOpenWith={searchBoxOpenWith}
      />
    </>
  );
};

export default SearchBar;

//------------------------------------------------------------------------------------
interface SearchInputBoxProps {
  searchBoxOpenWith: SearchBoxOpenWithState;
  setSearchBoxOpenWith: Dispatch<SetStateAction<SearchBoxOpenWithState>>;
  closeBox: () => void;
}
//------------------------------------------------------------------------------------

const SearchInputBox = (props: SearchInputBoxProps) => {
  const [searchHotel, searchHotelApi] = useSearchHotelsMutation();

  const [searchAbleLocations, setSearchAbleLocations] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    location: '',
    startDate: null,
    endDate: null,
    guests: 0,
    focusedInput: null
  });
  const { searchBoxOpenWith, setSearchBoxOpenWith, closeBox } = props;

  const clickOutside = () => {
    setSearchBoxOpenWith((prevS) => ({
      ...prevS,
      openSelectionBox: false,
      openWith: ''
    }));
  };
  const ref = useDetectClickOutside({ onTriggered: clickOutside });
  const onSelectSearchCategory = (category: SearchBoxOpenWithType) => {
    setSearchBoxOpenWith((prevS) => ({
      ...prevS,
      openWith: category,
      openSelectionBox: true
    }));
  };

  const filterButtonStyle = (
    category: SearchBoxOpenWithType
  ): CSSProperties => {
    return {
      boxShadow:
        searchBoxOpenWith.openWith === category
          ? 'box-shadow: 0px 4px 16px rgba(17,17,26,0.1), 0px 8px 24px rgba(17,17,26,0.1), 0px 16px 56px rgba(17,17,26,0.1);'
          : 'none',
      backgroundColor:
        searchBoxOpenWith.openWith !== category ? 'transparent' : 'white'
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addFilterHandler = (name: string, value: any) => {
    if (name === 'location') {
      setFilterOptions((prevState) => ({
        ...prevState,
        location: value
      }));
      setSearchBoxOpenWith((prevS) => ({
        ...prevS,
        openSelectionBox: false
      }));
    }

    if (name === 'startDate') {
      setFilterOptions((prevState) => ({
        ...prevState,
        startDate: value
      }));
    }

    if (name === 'endDate') {
      setFilterOptions((prevState) => ({
        ...prevState,
        endDate: value
      }));
    }
  };

  const guestInputHandler = (btnType: 'increase' | 'decrease') => {
    if (btnType === 'decrease') {
      if (filterOptions.guests === 0) return;
      setFilterOptions((prevState) => ({
        ...prevState,
        guests: prevState.guests - 1
      }));
    } else {
      setFilterOptions((prevState) => ({
        ...prevState,
        guests: 1 + prevState.guests
      }));
    }
  };

  //@ts-ignore
  const handleFocusChange = (focusedInput) => {
    setFilterOptions((prevState) => ({
      ...prevState,
      focusedInput: focusedInput
    }));
  };

  // on close on off update the overflow style of body
  if (searchBoxOpenWith.isOpen && typeof window !== 'undefined') {
    window.document.body.style.overflow = 'hidden';
  } else if (typeof window !== 'undefined') {
    window.document.body.style.overflow = 'auto';
  }

  const getSearchAbleLocation = async () => {
    try {
      const json = await fetch('http://localhost:8000/search/locations');
      const data = await json.json();
      setSearchAbleLocations(data.data);
    } catch (error) {
      setSearchAbleLocations([]);
    }
  };

  const formatDate = (date: Date) => {
    // Use Moment.js to format the date
    return moment(date).format('MMM DD, YYYY');
  };

  const onSearchHandler = () => {
    setSearchBoxOpenWith((prevS) => ({
      ...prevS,
      openSelectionBox: false
    }));

    const data = {
      location: filterOptions.location,
      dates: {
        //@ts-ignore
        startDate: filterOptions.startDate?.format('MM-DD-YYYY'),
        //@ts-ignore
        endDate: filterOptions.endDate?.format('MM-DD-YYYY')
      },
      guests: filterOptions.guests
    };

    searchHotel({
      ...data
    });
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    getSearchAbleLocation();
  }, []);

  useEffect(() => {
    if (searchHotelApi.isLoading) {
      setSearchBoxOpenWith((prevS) => ({
        ...prevS,
        openSelectionBox: false
      }));

      dispatch(updateSearchState({ data: [], isLoading: true }));
    }

    if (searchHotelApi.isSuccess) {
      setSearchBoxOpenWith({
        isOpen: false,
        openWith: '',
        openSelectionBox: false
      });

      dispatch(
        updateSearchState({ data: searchHotelApi.data?.data, isLoading: false })
      );
    }
  }, [searchHotelApi]);

  return (
    <div
      style={{
        width: searchBoxOpenWith.isOpen ? 'auto' : 0,
        height: searchBoxOpenWith.isOpen ? 'auto' : 0
      }}
      className="h-screen overflow-hidden absolute left-0 right-0 max-w-[100vw] top-[0px] w-full bg-transparent z-50 transition-all duration-150"
    >
      <div className="h-[160px]">
        <div className="w-full max-w-[850px] h-[80px] max-h-[80px] mx-auto flex space-x-6 justify-center items-center bg-white">
          <h2 className="font-semibold">Stays</h2>
          <h2 className="font-normal">Experiences</h2>
          <h2 className="font-normal">Online Experiences</h2>
        </div>

        <div className="bg-white h-[80px]">
          <div
            ref={ref}
            style={{
              boxShadow: '0px 4px 6px 0px #1F29371A',
              background: searchBoxOpenWith.openSelectionBox
                ? '#EAEAEA'
                : 'white'
            }}
            className="w-full flex items-center justify-between max-w-[850px] rounded-full border border-[#E5E7EB] h-[66px] mx-auto relative"
          >
            <Button
              onClick={() => onSelectSearchCategory('Location')}
              style={filterButtonStyle('Location')}
              className="hover:bg-[#DDDDDD] rounded-full w-[284px] h-full font-medium relative"
            >
              <div className="w-full h-[66px] pl-4 flex flex-col items-start justify-center">
                <h2 className="text-[12px] font-medium">Where</h2>
                {filterOptions.location ? (
                  <div className="flex items-center justify-between">
                    <h1>{filterOptions.location}</h1>
                    <IoIosCloseCircle
                      onClick={() =>
                        setFilterOptions((prevState) => ({
                          ...prevState,
                          location: ''
                        }))
                      }
                      className="w-[20px] h-[20px] cursor-pointer"
                    />
                  </div>
                ) : (
                  <h1>Map Area</h1>
                )}
              </div>
            </Button>

            {!searchBoxOpenWith.openSelectionBox && (
              <Divider className="h-[24px]" orientation="vertical" />
            )}

            <Button
              onClick={() => onSelectSearchCategory('StartDate')}
              style={filterButtonStyle('StartDate')}
              className="hover:bg-[#DDDDDD] rounded-[20px] h-full font-medium"
            >
              <div>
                <h2 className="text-[12px] font-medium">Check in</h2>
                {filterOptions.startDate && (
                  <h1>{formatDate(filterOptions.startDate)}</h1>
                )}
              </div>
            </Button>

            {!searchBoxOpenWith.openSelectionBox && (
              <Divider className="h-[24px]" orientation="vertical" />
            )}

            <Button
              onClick={() => onSelectSearchCategory('EndDate')}
              style={filterButtonStyle('EndDate')}
              className="hover:bg-[#DDDDDD] rounded-[20px] h-full font-medium"
            >
              <div>
                <h2 className="text-[12px] font-medium">Check out</h2>
                {filterOptions.endDate && (
                  <h1>{formatDate(filterOptions.endDate)}</h1>
                )}
              </div>
            </Button>

            {!searchBoxOpenWith.openSelectionBox && (
              <Divider className="h-[24px]" orientation="vertical" />
            )}

            <Button
              onClick={() => onSelectSearchCategory('Guests')}
              style={filterButtonStyle('Guests')}
              className="hover:bg-[#DDDDDD] h-full w-[282px] rounded-full font-medium"
            >
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col items-start justify-center">
                  <h2 className="text-[12px] font-medium">Who</h2>
                  {filterOptions.guests ? (
                    <p className="font-light">guests {filterOptions.guests}</p>
                  ) : (
                    <p className="font-light">Add guests</p>
                  )}
                </div>
                <Button
                  onClick={onSearchHandler}
                  style={{
                    width: searchBoxOpenWith.openSelectionBox ? 111 : 48
                  }}
                  className="bg-[#DE3151] h-[48px] transition-all duration-150 flex items-center justify-center rounded-full ml-1"
                  isIconOnly
                >
                  <BiSearch className="text-white h-[24px] w-[24px]" />
                  {searchBoxOpenWith.openSelectionBox ? (
                    <span className="text-white ml-2">Search</span>
                  ) : (
                    ''
                  )}
                </Button>
              </div>
            </Button>

            {/* dropdown section */}
            <div
              style={{
                justifyContent:
                  searchBoxOpenWith.openWith === 'Guests'
                    ? 'justify-end'
                    : 'justify-start'
              }}
              className="absolute top-[73px] flex bg-transparent"
            >
              {searchBoxOpenWith.openSelectionBox &&
                searchBoxOpenWith.openWith === 'Location' && (
                  <div className="bg-white overflow-hidden h-[390px] max-h-[390px] w-[384px] flex flex-col justify-center items-center rounded-[32px] py-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    {searchAbleLocations?.length === 0 ? (
                      <Spinner />
                    ) : (
                      <div className="w-full overflow-hidden overflow-y-scroll scrollbar-hide h-[390px] max-h-[390px]">
                        {searchAbleLocations.map((location) => (
                          <div
                            onClick={() =>
                              addFilterHandler('location', location)
                            }
                            key={location}
                            className="flex items-center cursor-pointer bg-white w-full hover:bg-[#F7F7F7] h-[64px] px-[40px] py-[8px]"
                          >
                            <div className="w-[45px] h-[45px] bg-[#e7e7e7] rounded-[10px] flex items-center justify-center">
                              <IoLocationOutline className="w-[24px] h-[24px]" />
                            </div>
                            <p className="text-lg text-gray-600 ml-3">
                              {location}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              {searchBoxOpenWith.openSelectionBox &&
                (searchBoxOpenWith.openWith === 'StartDate' ||
                  searchBoxOpenWith.openWith === 'EndDate' ||
                  searchBoxOpenWith.openWith === 'Dates') && (
                  <div className="bg-white overflow-hidden h-[500px] max-h-[500px] w-[850px] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <div className="w-"></div>
                    <DateRangePicker
                      startDate={filterOptions.startDate}
                      endDate={filterOptions.endDate}
                      startDateId="your_unique_start_date_id"
                      endDateId="your_unique_end_date_id"
                      onDatesChange={(value) => {
                        const { startDate, endDate } = value;
                        addFilterHandler('startDate', startDate);
                        addFilterHandler('endDate', endDate);
                      }}
                      focusedInput={filterOptions.focusedInput || 'startDate'}
                      onFocusChange={handleFocusChange}
                      showClearDates
                    />
                  </div>
                )}

              {searchBoxOpenWith.openSelectionBox &&
                searchBoxOpenWith.openWith === 'Guests' && (
                  <div className="w-[850px] h-[128px] flex flex-col justify-center bg-white items-center overflow-hidden rounded-[32px] py-[16px] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                    <div className="flex items-center justify-between cursor-pointer bg-white w-full h-[74px] border-b border-gray-200 px-[40px] py-[8px]">
                      <div className="flex flex-col items-start justify-center">
                        <h2 className="text-lg font-medium">Adults</h2>
                        <p className="font-light">Ages 13 or above</p>
                      </div>
                      <div className="flex items-center space-x-5">
                        <div
                          onClick={() => guestInputHandler('decrease')}
                          className="w-[32px] h-[32px] overflow-hidden rounded-full flex items-center justify-center hover:font-semibold"
                        >
                          <CiCircleMinus className="w-[24px] h-[24px]" />
                        </div>
                        <span>{filterOptions?.guests || 0}</span>
                        <div
                          onClick={() => guestInputHandler('increase')}
                          className="w-[32px] h-[32px] overflow-hidden rounded-full flex items-center justify-center hover:font-semibold"
                        >
                          <GoPlusCircle className="w-[24px] h-[24px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={closeBox}
        className="bg-[#00000021] h-[calc(100vh-146px)]"
      ></div>
    </div>
  );
};
