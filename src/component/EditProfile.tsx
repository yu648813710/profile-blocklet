import React, { FC, useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ProfileData } from '../hooks/useProfileData';
import { TextField, Avatar, Dialog, Button } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

export type submitType = (data: ProfileData) => void;

export interface EditProfileProps {
  open: boolean,
  submit?: submitType,
  cancel?: () => void,
}

const EditProfile: FC<EditProfileProps> = (props) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [signature, setSignature] = useState('');
  const [address, setAddress] = useState('');
  const [isFull, setFullScreen] = useState(false);

  const isFullScreen = () => {
    const currentWidth = window.document.body.clientWidth;

    setFullScreen(currentWidth <= 1028)

    document.body.onresize = () => {
      const currentWidth = window.document.body.clientWidth;
      setFullScreen(currentWidth <= 1028)
    }
  }

  function fileToBase64(file: File, callback: (url: string) => void) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      if (reader.result && typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target.files) return

    const file = e.target.files[0];

    if (file.size > 2 * 1024 * 1024) return;

    fileToBase64(file, (url) => {
      setAvatar(url);
    })
  };

  const handleSubmit = () => {
    if (username && email && phone) {
      props.submit && props.submit({
        name: username,
        avatarUrl: avatar || '',
        phone: phone,
        email: email,
        address: address,
        description: signature
      })
    } else {
      // 提示用户填写必填项
    }
  };

  useEffect(() => {
    isFullScreen()
  }, [])

  return <Dialog open={props.open} fullScreen={isFull} maxWidth="md" fullWidth={true}>
    <div className='w-full p-4'>
      <div>
        <div className='cursor-pointer float-right w-10 h-10' onClick={props.cancel}><CloseIcon /></div>
        <div>个人资料修改</div>
      </div>
      <div className='pt-5'>
        <form onSubmit={handleSubmit}>
          <div className='flex justify-center'>
            <div>
              <Avatar className='mx-auto mb-4' sx={{ width: 80, height: 80 }} alt="Avatar" src={avatar || undefined} />
              <input
                accept="image/*"
                id="avatar-upload"
                type="file"
                onChange={handleAvatarChange}
                hidden
              />
              <label htmlFor="avatar-upload">
                <Button variant="contained" color="primary" component="span">
                  上传头像
                  <PhotoCamera />
                </Button>
              </label>
            </div>
          </div>

          <div className='mt-4'>
            <TextField
              label="用户名"
              required
              className='w-full'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='mt-4'>
            <TextField
              className='w-full'
              label="邮箱"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className='mt-4'>
            <TextField
              label="手机号"
              className='w-full'
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className='mt-4'>
            <TextField
              className='w-full'
              label="个性签名"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>

          <div className='mt-4'>
            <TextField
              className='w-full'
              label="地址"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className='w-full pt-5'>
            <Button type="submit" className='w-full' variant="contained" >提交</Button>
          </div>
        </form>
      </div>
    </div>
  </Dialog>
}

export default EditProfile;