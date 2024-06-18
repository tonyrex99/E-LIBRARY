import Meta from '@/components/Meta';

import { Link } from 'react-router-dom';
export default function IndexTransaction() {
  return (
    <div className="flex w-full h-full flex-col ">
      <Meta title="Transactions" />
      <div className="flex w-full flex-col gap-y-5">
        <div className=" mb-2 font-bold text-xl ">Book transaction</div>
        <div className="flex gap-11  flex-col">
          <Link to={'borrowed-books'} className="w-full">
            <div className="flex py-3 px-10 w-full rounded-[15px] bg-gray-800 text-white ">
              View borrowed books
            </div>
          </Link>

          <Link to={'borrowed-books/reserve'} className="w-full">
            <div className="flex py-3 px-10 w-full rounded-[15px] bg-gray-800 text-white ">
              View reserved books
            </div>
          </Link>

          <Link to={'/dashboard'} className="w-full">
            <div className="flex py-3 px-10 w-full rounded-[15px] bg-gray-800 text-white ">
              Borrow books
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
