const LSKey = 'profile';

export interface ProfileData {
  name: string,
  avatarUrl: string,
  description?: string,
  phone: string,
  email: string,
  address?: string,
} 

export const useProfileData = () => {
  const data = localStorage.getItem(LSKey)

  const getProfileData = ():ProfileData | null => data ? JSON.parse(data) : null
  
  const setProfileData = (data:ProfileData) => {
    localStorage.setItem(LSKey, JSON.stringify(data))
  }

  return {
    profileData: getProfileData(),
    setProfileData, 
  }
}