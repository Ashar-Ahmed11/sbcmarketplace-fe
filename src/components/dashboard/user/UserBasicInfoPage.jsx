import { useContext, useEffect, useState } from 'react';
import AppContext from '../../context/appContext';
import UserProfileForm from '../UserProfileForm';

function UserBasicInfoPage() {
  const { currentUser, fetchUser, updateUserProfile } = useContext(AppContext);
  const [form, setForm] = useState({
    fullName: '',
    city: '',
    state: '',
    zipCode: '',
    address: '',
    phoneNumber: '',
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (currentUser) {
      setForm({
        fullName: currentUser.fullName || '',
        city: currentUser.city || '',
        state: currentUser.state || '',
        zipCode: currentUser.zipCode || '',
        address: currentUser.address || '',
        phoneNumber: currentUser.phoneNumber || '',
      });
    }
  }, [currentUser]);

  return (
    <UserProfileForm
      data={form}
      onChange={(event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))}
      onSubmit={() => updateUserProfile(form)}
    />
  );
}

export default UserBasicInfoPage;
