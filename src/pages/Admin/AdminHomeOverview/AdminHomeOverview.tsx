import { Link } from 'react-router-dom';

import Meta from '@/components/Meta';
//import Notification from '@/pages/User/Notification';

function AdminHomeOverview() {
  return (
    <div className="flex w-full h-full flex-col ">
      <div className=" mb-7 font-bold text-xl">Dashboard</div>

      <Meta title="Transactions" />
      <div className="flex w-full flex-col gap-y-5">
        <div className="flex flex-row justify-between">
          <div className=" mb-2 font-bold text-xl">Book Management</div>
          <Link to={'book-management'} className=" mb-2 font-normal text-xl hover:underline">
            See all actions
          </Link>
        </div>
        <div className="flex gap-11  flex-col">
          <Link to={'book-management/add-books'} className="w-full">
            <div className="flex py-3 px-10 w-full rounded-[15px] bg-gray-800 text-white ">
              Add books
            </div>
          </Link>

          <Link to={'book-management/approve-extension'} className="w-full">
            <div className="flex py-3 px-10 w-full rounded-[15px] bg-gray-800 text-white ">
              Approve submission change request
            </div>
          </Link>
        </div>
      </div>

      {/**  <div className="flex w-full flex-col gap-y-5 mt-20">
        <div className="flex flex-row justify-between">
          <div className=" mb-2 font-bold text-xl">Notifications</div>
          <Link to={'book-management'} className=" mb-2 font-normal text-xl hover:underline">
            See all notifications
          </Link>
        </div>
        <div className="flex gap-11  flex-col ">
          <Notification embed={true} limit={3} type="admin" />
        </div>
      </div> */}
    </div>
  );
}

export default AdminHomeOverview;
