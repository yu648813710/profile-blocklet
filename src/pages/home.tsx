
import BgImg from '../assets/cover.a49d951.png'
import DefaultAvatar from '../assets/default_avatar.png'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import { Button } from '@mui/material';
import { useProfileData } from '../hooks/useProfileData'
import EditProfile from '../component/EditProfile';
import { useState } from 'react';

function Home() {
  const { profileData, setProfileData } = useProfileData();
  const [isOpen, setOpen] = useState<boolean>(false);

  const openEdit = () => {
    setOpen(true)
  }

  return (
    <>
      <div className="w-full h-[242px] overflow-hidden">
        <img className='h-[242px] w-full object-cover' src={BgImg} alt="" />
      </div>
      <div className='flex justify-center mt-10'>
        <div className='lg:w-[80%] max-lg:w-full lg:max-w-[800px]  max-lg:px-10'>
          <div className='lg:flex max-lg:w-full'>
            <div className='w-[160px] h-[160px] rounded-full overflow-hidden max-lg:mx-auto'>
              <img className='w-full h-full' src={profileData?.avatarUrl || DefaultAvatar} alt="" />
            </div>
            <div className='lg:ml-10 mt-8 max-lg:text-center'>
              <h2 className='text-[32px] font-bold text-gray-900'>{profileData?.name || '用户名'}</h2>
              <h4 className='mt-1 text-gray-500 text-base'>{profileData?.name || '个性签名'}</h4>
            </div>
          </div>
          <div className='bg-[#f9fafb] rounded-2xl p-8 mt-10 text-gray-600 flex leading-8'>
            <div className='w-22 whitespace-nowrap'>
              <PhoneAndroidIcon className='mr-2 align-middle' />
              <span>手机号：</span>
            </div>
            <div className='leading-8'>{profileData?.name || '未填写'}</div>
          </div>
          <div className='bg-[#f9fafb] rounded-2xl p-8 mt-4 text-gray-600 flex leading-8'>
            <div className='w-22 whitespace-nowrap'>
              <EmailIcon className='mr-2 align-middle' />
              <span>邮箱：</span>
            </div>
            <div className='align-middle'>{profileData?.phone || '未填写'}</div>
          </div>
          <div className='bg-[#f9fafb] rounded-2xl p-8 mt-4 text-gray-600 flex leading-8'>
            <div className='w-22 whitespace-nowrap'>
              <HomeIcon className='mr-2 align-middle' />
              <span>地址：</span>
            </div>
            <div className='align-middle'>{profileData?.address || '未填写'}</div>
          </div>
          <div className='mt-4 max-lg:flex max-lg:justify-center'>
            <Button className='lg:w-full max-lg:w-1/2' variant="outlined" onClick={openEdit}>编辑资料</Button>
          </div>
        </div>
      </div>
      <EditProfile open={isOpen} cancel={() => {
        setOpen(false)
      }} submit={(data) => {
        setOpen(false)
        setProfileData(data)
      }}></EditProfile>
    </>
  );
}

export default Home;
