import { useState } from 'react';
import Oauth from '../components/Oauth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signinStart,signinSuccess,siginFailure } from '../redux/user/userSlice';
import { useEffect } from 'react';
export default function Signin() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    if(currentUser){
      navigate('/profile')
      return;
    }
  }, [currentUser])
  
  const [formData, setFormData] = useState({});
  const {loading,error}=useSelector((state)=>state.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // stops the page from being refreshed...
    try {
      dispatch(signinStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(siginFailure(data.message));
        return;
      }
      dispatch(signinSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(siginFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <Oauth/>
      </form>
      <div className='flex gap-2 mt-5 justify-center'>
        <p>New user?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>SignUp</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}