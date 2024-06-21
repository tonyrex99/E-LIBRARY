import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllDeptBooks } from '@/services/users/queries';
import { getUserDept } from '@/api/cookies';
import { department } from '@/services/users/endpoints';
import BookCover from '@/components/BookCover';
import { book } from '@/services/users/queries';
function Home() {
  const { data, isLoading } = useQuery({
    queryFn: () => getAllDeptBooks(getUserDept() as department),
    queryKey: ['ALLDEPTBOOKS'],
    refetchOnMount: true,
  });
  //console.log(' book data is: ', data);

  function getRandomItems(array: book[], numberOfItems: number): book[] {
    if (!array || array.length === 0) return [];
    // Shuffle the array
    const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
    // Return the first 'numberOfItems' items
    return shuffledArray.slice(0, numberOfItems);
  }
  const randomItems = getRandomItems(data?.data as book[], 5);

  return (
    <div className="flex w-full h-full flex-col gap-y-5">
      <div className="flex w-full flex-col">
        <div className=" mb-2 font-bold text-2xl ">Books from your department</div>
        <div className="flex flex-row gap-8 lg:gap-11 w-full overflow-x-auto">
          {data?.data?.map((item, key) => (
            <Link key={key} to={`/dashboard/${item?.bookId}`}>
              <BookCover author={item?.author} title={item?.name} key={item?.name + key} />
            </Link>
          ))}
          {isLoading && <div>Loading</div>}
        </div>
      </div>
      {/* Recommended */}
      <div className="flex w-full flex-col">
        <div className=" mb-2 font-bold text-2xl ">Recommended books</div>
        <div className="flex flex-row gap-8 rel lg:gap-11 w-full overflow-x-auto">
          {randomItems.map((item, key) => (
            <Link key={key} to={`/dashboard/${item?.bookId}`}>
              <BookCover author={item?.author} title={item?.name} key={item?.name + key} />
            </Link>
          ))}
          {isLoading && <div>Loading</div>}
        </div>
      </div>
    </div>
  );
}

export default Home;
