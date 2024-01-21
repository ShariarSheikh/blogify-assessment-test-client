'use client';
import HotelItem from '@/components/HotelItem';
import MapComponent from '@/components/Map';
import { useGetAllHotelsQuery } from '@/redux/api';
import { useAppSelector } from '@/redux/hooks';
import { DataInterface } from '@/redux/hotelSlice';
import { Divider, Spinner } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [hotelsData, setHotelsData] = useState<DataInterface[]>([]);
  const [isNotFound, setIsNotFount] = useState<boolean>(false);

  const searchDataState = useAppSelector((state) => state.hotelSlice);
  const { isLoading, data } = useGetAllHotelsQuery();

  useEffect(() => {
    if (searchDataState.isLoading) {
      return setHotelsData([]);
    } else if (
      !searchDataState.isLoading &&
      !searchDataState.searchedHotelData.length
    ) {
      return setIsNotFount(false);
    }
    setHotelsData(searchDataState.searchedHotelData);
  }, [searchDataState]);

  useEffect(() => {
    if (isLoading) return;
    setHotelsData(data?.data || []);
  }, [isLoading, data]);

  return (
    <main className="w-full h-[calc(100vh-148px)] overflow-hidden">
      <div className="flex w-full h-full">
        <div className="w-full max-w-[60%] px-12">
          {isLoading || searchDataState.isLoading ? (
            <div className="h-[400px] flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div>
              {isNotFound ? (
                <p className="text-center pt-16 text-gray-500 font-normal">
                  Not found any data
                </p>
              ) : (
                <>
                  <div className="py-8">
                    <h2 className="mb-6 text-[#6B7280] font-normal">
                      Total location {hotelsData?.length ?? 0}
                    </h2>
                    <Divider />
                  </div>
                  <div className="h-[calc(100vh-148px)] overflow-hidden overflow-y-auto scrollbar-hide pb-24">
                    {hotelsData?.map((item) => (
                      <HotelItem key={item.location} data={item} />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        <div className="w-[40%] h-[calc(100vh-148px)] relative">
          <MapComponent />
        </div>
      </div>
    </main>
  );
}
