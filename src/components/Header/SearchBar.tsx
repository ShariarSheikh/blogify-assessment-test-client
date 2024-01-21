import { Button, Divider } from '@nextui-org/react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  return (
    <div
      style={{
        boxShadow: '0px 4px 6px 0px #1F29371A'
      }}
      className="min-w-[334px] rounded-full overflow-hidden h-[48px] border border-[#E5E7EB]"
    >
      <div className="flex items-center justify-between h-full pr-[8px]">
        <Button className="bg-white rounded-l-full h-full font-medium">
          Anywhere
        </Button>
        <Divider className="h-[24px]" orientation="vertical" />
        <Button className="bg-white rounded-none h-full font-medium">
          Feb 19-26
        </Button>
        <Divider className="h-[24px]" orientation="vertical" />
        <Button className="bg-white h-full rounded-none font-medium">
          Add guests
        </Button>
        <Button
          className="bg-[#DE3151] flex items-center justify-center rounded-full ml-1"
          isIconOnly
        >
          <BiSearch className="text-white h-[12px] w-[12px]" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
