import { Link } from 'react-router-dom';
import Meta from '@/components/Meta';

function Root() {
  return (
    <div className="flex w-full h-full flex-col ">
      <Meta title="Transactions" />
      <div className="flex w-full flex-col gap-y-5">
        <div className=" mb-2 font-bold text-xl">Book Management</div>
        <div className="flex gap-11  flex-col">
          <Link to={'borrowed-books'} className="w-full">
            <div className="flex py-3 px-10 w-full rounded-[15px] bg-gray-800 text-white ">
              View borrowed books
            </div>
          </Link>

          <Link to={'add-books'} className="w-full">
            <div className="flex py-3 px-10 w-full rounded-[15px] bg-gray-800 text-white ">
              Add books
            </div>
          </Link>

          <Link to={'approve-extension'} className="w-full">
            <div className="flex py-3 px-10 w-full rounded-[15px] bg-gray-800 text-white ">
              Approve submission change request
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Root;
