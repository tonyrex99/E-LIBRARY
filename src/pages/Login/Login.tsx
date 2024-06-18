/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Meta from '@/components/Meta';
import { Input } from '@mui/material';
import { FormEventHandler, useState } from 'react';
import { signInUser } from '@/services/auth/mutations';
import { useMutation } from '@tanstack/react-query';
import { setAuthToken } from '@/api/cookies';
import { AuthSuccessResponse } from '@/services/types/responses';
import { getAuthToken, getUserRole } from '@/api/cookies';
import { useParams } from 'react-router-dom';
function Login() {
  const { admin } = useParams();
  const [userInfo, setUserInfo] = useState({ matricNumber: '', password: '' });

  const router = useNavigate();
  console.log(' auth token is: ', getAuthToken(), ' user role is: ', getUserRole());

  const mutation = useMutation({
    mutationFn: signInUser,
    onSuccess: (data: { data: AuthSuccessResponse }) => {
      setAuthToken({
        token: data.data.token,
        role: data.data.role,
        department: data.data.department,
      });
      /**
      toast({
        title: "Login Success",
        description: "You are being redirected.",
      });
       */
      router(data.data.role == 'ADMIN' ? '/admin' : '/dashboard');
    },
    onError: (err: any) => {
      console.log('Error: ', err);
      alert('Authentication Failed');
      //  toast({ title: "Error", description: JSON.stringify(err) });
    },
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    /**
    setAuthToken({
      token:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJpYXQiOjE3MTg2OTExODgsImV4cCI6MTcxODcyNTc0OH0.RCMrvbJkf1jJTKdNQzNqKgkwdqtlh8DWmqPPykNWchA',
      role: 'ADMIN',
      department: 'EIE',
    });
     */
    e.preventDefault();
    const oldUser = userInfo;
    console.log('old use is: ', oldUser);
    mutation.mutate(oldUser);
  };
  console.log('admin value is: ', admin);
  return (
    <section className="flex   w-full h-screen ">
      <Meta title="Login" />

      <div className="flex w-0 lg:w-1/2 h-full bg-gray-800">
        <img
          src={
            typeof admin === 'string' && admin.trim() !== ''
              ? '/bookshop1png.png'
              : '/bookshop1png.png'
          }
          alt="Image"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-gray-800 text-xl flex w-full lg:w-1/2 h-full px-7 md:px-16 pt-20 relative">
        <Link to={'/'}>
          <div className="  font-normal absolute xtop-0 xleft-0 mb-7 ">Back</div>
        </Link>

        <div className="flex w-full h-full mt-28 justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-10 w-full px-3 md:px-12"
          >
            <div className="w-full text-center">Login</div>
            <Input
              onChange={({ target }) => setUserInfo({ ...userInfo, matricNumber: target.value })}
              name="matric-no"
              className="border-gray-800 border py-5 px-6 flex justify-center text-2xl text-gray-800 rounded-2xl w-full h-16"
              placeholder="Enter your Matric no"
            />
            <Input
              onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
              name="password"
              type="password"
              className="border-gray-800 border py-5 px-6 flex justify-center text-2xl text-gray-800 rounded-2xl w-full h-16"
              placeholder="Enter your password"
            />

            <button className="text-white bg-gray-800 py-5 px-16 rounded-2xl w-full ">Login</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
