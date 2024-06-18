import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllDeptBooks } from '@/services/users/queries';
import { getUserDept } from '@/api/cookies';
import { department } from '@/services/users/endpoints';
function Home() {
  const { data, isLoading } = useQuery({
    queryFn: () => getAllDeptBooks(getUserDept() as department),
    queryKey: ['ALLDEPTBOOKS'],
    refetchOnMount: true,
  });
  console.log(' book data is: ', data);
  return (
    <div className="flex w-full h-full flex-col gap-y-5">
      <div className="flex w-full flex-col">
        <div className=" mb-2 font-bold text-2xl ">Books from your department</div>
        <div className="flex flex-col  gap-8 lg:gap-11 w-full  overflow-x-scroll ">
          {data?.data?.map((item, key) => (
            <Link key={key} to={`/dashboard/${item?.bookId}`}>
              <div
                key={key}
                className="w-full bg-gray-400 rounded-lg items-center justify-between flex p-2 pr-5 text-2xl"
              >
                <div className=" font-normal">{item?.name}</div>{' '}
                <div className=" font-light">{item?.author}</div>
              </div>
            </Link>
          ))}
          {isLoading && <div>Loading</div>}
        </div>
      </div>
      {/**
      <div className="flex w-full flex-col overflow-x-scroll">
        <div className=" mb-2 font-bold text-2xl ">Recently viewed</div>
        <div className="w-full bg-gray-400 rounded-lg items-center justify-between flex p-2 pr-5 text-2xl">
          <div className=" font-normal">Book name</div> <div className=" font-light">Author</div>
        </div>
      </div>

     
     <div className="flex w-full flex-col">
        <div className=" mb-2 font-medium text-xl ">Overdue books</div>
        <div className="flex gap-11  flex-col">
          <div className="flex ">
            “Title of book” overdue!! was meant to be returned on the 8/9/2024
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Home;
