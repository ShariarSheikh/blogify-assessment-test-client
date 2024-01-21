import { DataInterface } from '@/redux/hotelSlice';
import { Divider } from '@nextui-org/react';
import Image from 'next/image';
import { FC } from 'react';
import { BsDot } from 'react-icons/bs';
import { FaRegHeart, FaStar } from 'react-icons/fa';

const HotelItem: FC<{ data: DataInterface }> = ({ data }) => {
  return (
    <div className="flex items-center pb-6 border-b border-[#E5E7EB] mb-6">
      <div className="min-w-[300px] w-[300px] min-h-[200px] h-[200px] relative rounded-xl overflow-hidden shadow-[0px_0px_4px_0px_#edf2f7]">
        <Image src={data.hotel_image} fill alt="hotel image" />
      </div>
      <div className="pl-6 h-[200px] pb-4 w-full">
        <div className="flex justify-between h-full w-full">
          <div className="w-full">
            <p className="font-normal text-sm text-gray-500 mb-[2px]">
              Entire home in {data.title}
            </p>
            <h1 className="text-gray-700 text-[20px] font-medium mb-4">
              {data.location}
            </h1>
            <Divider className="w-[40px] mb-4" />
            <div className="w-full max-w-[390px] text-gray-500 text-sm font-normal mb-4">
              <span>{data.guests} guests</span> <BsDot className="inline" />
              <span>Entire Home</span>
              <BsDot className="inline" />
              <span>{data.beds} beds</span>
              <BsDot className="inline" />
              <span>{data.baths}</span> <BsDot className="inline" />
              {data.wifi && <span>Wifi</span>}
              <BsDot className="inline" />
              {data.kitchen && <span>Kitchen</span>}
              <BsDot className="inline" />
              {data.free_parking && <span>Free Parking</span>}
            </div>
            <Divider className="w-[40px] mb-4" />
          </div>
          <div className="h-full w-[50px] flex items-start justify-center">
            <FaRegHeart className="w-[24px] h-[24px]" />
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <span className="font-medium text-sm">{data.rating}</span>
            <FaStar className="text-[#F59E0B]" />
            <span className="font-normal text-sm">
              ({data.reviews} reviews)
            </span>
          </div>

          <div>
            <span className="font-medium text-lg text-gray-600">
              ${data.price}
            </span>
            <span className="font-normal text-gray-500">/night</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelItem;
