'use client';
import MapComponent from '@/components/Map';
import { useGetAllHotelsQuery } from '@/redux/api';
import { useAppSelector } from '@/redux/hooks';

export default function Home() {
  const searchDataState = useAppSelector((state) => state.hotelSlice);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, data } = useGetAllHotelsQuery();

  // eslint-disable-next-line no-console
  console.log(searchDataState);

  return (
    <main className="w-full">
      <div className="flex w-full">
        <div className="w-full max-w-[60%] h-[calc(100vh-148px)] overflow-hidden overflow-y-auto scrollbar-hide">
          <h2>hasdf</h2>
          <h2>hasdf</h2>
          <h2>hasdf</h2>
          <h2>hasdf</h2>
          <h2>hasdf</h2>
          <h2>hasdf</h2>
          <h2>hasdf</h2>
          <h2>hasdf</h2>
          <h2>hasdf</h2>
          <h2>hasdf</h2>
          <h2>hasdf</h2>
        </div>
        <div className="w-[40%] h-[calc(100vh-148px)] relative">
          <MapComponent />
        </div>
      </div>
    </main>
  );
}
