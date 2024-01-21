'use client';

import { Avatar, Button, Divider } from '@nextui-org/react';
import { AiOutlineGlobal } from 'react-icons/ai';
import { FiMenu } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Logo from './Logo';
import SearchBar from './SearchBar';

const filtersActions: string[] = [
  'Price',
  'Types of place',
  'Free cancellation',
  'Wifi',
  'Kitchen',
  'Air conditioning',
  'Washer',
  'Iron',
  'Dedicated workspace',
  'Free parking',
  'Dryer',
  'Filters'
];

const Header = () => {
  return (
    <div className="max-h-[148px] w-full border-b border-b-[#F3F4F6] bg-white pt-[24px] pb-[16px] px-[24px]">
      <div className="flex justify-between items-center mx-auto max-w-[1440px]">
        <Logo />
        <SearchBar />
        <div className="flex items-center space-x-4">
          <h2 className="font-medium text-sm">Become a Host</h2>
          <AiOutlineGlobal className="w-[24px] h-[24px]" />
          <Button className="bg-white w-[88px] h-[48px] p-0 rounded-[100px] flex items-center justify-center border border-[#E5E7EB]">
            <FiMenu color="#111827" className="w-[24px] h-[24px]" />
            <Avatar
              className="bg-[#F3F4F6] min-w-[32px] min-h-[32px] max-w-[32px] max-h-[32px] rounded-full overflow-hidden"
              showFallback
              src="https://images.unsplash.com/broken"
            />
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between mx-auto max-w-[1440px] mt-[24px]">
        {filtersActions.slice(0, 2).map((action, i) => (
          <Button
            endContent={<MdKeyboardArrowDown />}
            key={i}
            className="py-[8px] px-[16px] rounded-[100px] bg-white text-[#374151] border border-[#F3F4F6]"
          >
            {action}
          </Button>
        ))}
        <Divider className="h-[24px]" orientation="vertical" />

        {filtersActions.slice(2).map((action, i) => (
          <Button
            key={i}
            className="py-[8px] px-[16px] rounded-[100px] bg-white text-[#374151] border border-[#F3F4F6]"
          >
            {action}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Header;
