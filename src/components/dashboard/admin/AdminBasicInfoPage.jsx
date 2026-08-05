import { useContext, useEffect, useState } from 'react';
import BasicInfoForm from '../BasicInfoForm';
import AppContext from '../../context/appContext';

function AdminBasicInfoPage() {
  const { basicInfo, getBasicInfo, updateBasicInfo } = useContext(AppContext);
  const [form, setForm] = useState(basicInfo);

  useEffect(() => {
    getBasicInfo();
  }, [getBasicInfo]);

  useEffect(() => {
    setForm(basicInfo);
  }, [basicInfo]);

  return (
    <BasicInfoForm
      data={form}
      onChange={(event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))}
      onSubmit={() => basicInfo?._id && updateBasicInfo(basicInfo._id, form)}
      submitLabel="Update Basic Info"
      subtitle="Manage admin-controlled fee percentages used during negotiation payments."
      title="Basic Info"
    />
  );
}

export default AdminBasicInfoPage;
