import Meta from '@/components/Meta';
//import useOrientation from '@/hooks/useOrientation';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRole } from '@/api/cookies';
import { useEffect } from 'react';
function Welcome() {
  const router = useNavigate();
  useEffect(() => {
    const userRole = getUserRole();
    if (userRole != 'false') {
      console.log(' use role is: ', userRole);
      router(userRole === 'ADMIN' ? '/admin' : '/dashboard');
    }
  }, [router]);
  //const isPortrait = useOrientation();

  //const width = isPortrait ? '40%' : '30%';
  //const height = isPortrait ? '30%' : '40%';
  const courses: string[] = ['EIE', 'CIVIL', 'PET', 'CHEM', 'MECH'];
  return (
    <section className="flex flex-row w-full h-full ">
      <Meta title="Welcome" />

      <div className={`bg-gray-800 w-48 h-full `}></div>

      <div
        style={{ backgroundImage: `url('/senate.png')`, backgroundSize: 'cover' }}
        className={`relative h-full w-full flex flex-col justify-center items-center font-poppins font-gray-800 font-medium text-xl px-5 md:px-36 `}
      >
        <div className="text-center font-bold  w-full text-2xl mb-[6.375rem]  ">
          WELCOME TO COE LIBRARY
        </div>

        <div className="flex flex-col w-full max-w-[62rem] self-center gap-11 justify-center ">
          <div className="text-left w-fit">Kindly select your department</div>

          <div className="flex w-full flex-row flex-wrap text-white  gap-y-16 gap-x-16 justify-center xl:justify-between self-center ">
            {courses.map((course: string, index: number) => (
              <Link key={index} to={'login'}>
                <button
                  key={index}
                  className="bg-gray-800 rounded-2xl text-center py-3 justify-center w-96 md:w-[27rem] "
                >
                  {course}
                </button>
              </Link>
            ))}
          </div>
          <div className=" mt-8 xl:mt-32 r-0 w-fit text-left">
            Sign in as admin{' '}
            <Link to={'login/admin'}>
              <button className=" text-blue-400">here</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
