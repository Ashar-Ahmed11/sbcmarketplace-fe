import { useContext, useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-dropdown-select';
import AppContext from '../../context/appContext';

function UserTruckFinanceCreatePage({ editMode = false }) {
  const {
    categories,
    createFinanceTruck,
    deleteFinanceTruck,
    financeTruckInitialForm,
    getCategories,
    getFinanceTruckById,
    pakistanCities,
    updateFinanceTruck,
  } = useContext(AppContext);
  const history = useHistory();
  const { truckFinanceId } = useParams();
  const [form, setForm] = useState(financeTruckInitialForm);
  const categoryOptions = useMemo(
    () => categories.map((item) => ({ label: item.name, value: item._id })),
    [categories]
  );
  const selectedCategories = useMemo(
    () => categoryOptions.filter((item) => (form.categories || []).includes(item.value)),
    [categoryOptions, form.categories]
  );
  const cityOptions = useMemo(
    () => pakistanCities.map((city) => ({ label: city, value: city })),
    [pakistanCities]
  );
  const selectedCities = useMemo(
    () => cityOptions.filter((item) => (form.financeCities || []).includes(item.value)),
    [cityOptions, form.financeCities]
  );

  useEffect(() => {
    setForm(financeTruckInitialForm);
  }, [financeTruckInitialForm]);

  useEffect(() => {
    getCategories('truck');
  }, [getCategories]);

  useEffect(() => {
    if (editMode && truckFinanceId) {
      getFinanceTruckById(truckFinanceId).then((data) => {
        setForm({
          categories: (data?.categories || []).map((item) => item?._id || item),
          financeAmount: data?.financeAmount || '',
          financeCities: (data?.financeCities || []).map((item) => item?.city).filter(Boolean),
        });
      });
    }
  }, [editMode, getFinanceTruckById, truckFinanceId]);

  const onSubmit = async () => {
    const payload = {
      categories: form.categories,
      financeAmount: form.financeAmount,
      financeCities: form.financeCities.map((city) => ({ city })),
    };
    if (editMode && truckFinanceId) {
      await updateFinanceTruck(truckFinanceId, payload);
    } else {
      await createFinanceTruck(payload);
    }
    history.push('/user-dashboard/finance/trucks');
  };

  return (
    <section className="dashboard-section-card form-card-panel">
      <div className="dashboard-section-head"><div><h1>{editMode ? 'Edit Truck Finance' : 'Create Truck Finance'}</h1><p>Define truck finance categories, amount, and supported cities.</p></div></div>
      <div className="row g-3">
        <div className="col-12 form-field">
          <label>Categories</label>
          <div className="dashboard-multi-select">
            <Select
              create={false}
              clearAllLabel="Clear all"
              clearOnSelect={false}
              closeOnSelect={false}
              dropdownHandle
              keepSelectedInList
              labelField="label"
              multi
              onChange={(values) => setForm((current) => ({ ...current, categories: values.map((item) => item.value) }))}
              options={categoryOptions}
              placeholder="Select categories"
              searchBy="label"
              selectAll
              selectAllLabel="Select all"
              value={selectedCategories}
              values={selectedCategories}
            />
          </div>
        </div>
        <div className="col-md-6 form-field">
          <label>Finance Amount</label>
          <input onChange={(event) => setForm((current) => ({ ...current, financeAmount: event.target.value }))} type="number" value={form.financeAmount} />
        </div>
        <div className="col-12 form-field">
          <label>Finance Cities</label>
          <div className="dashboard-multi-select">
            <Select
              create={false}
              clearAllLabel="Clear all"
              clearOnSelect={false}
              closeOnSelect={false}
              dropdownHandle
              keepSelectedInList
              labelField="label"
              multi
              onChange={(values) => setForm((current) => ({ ...current, financeCities: values.map((item) => item.value) }))}
              options={cityOptions}
              placeholder="Select finance cities"
              searchBy="label"
              selectAll
              selectAllLabel="Select all"
              value={selectedCities}
              values={selectedCities}
            />
          </div>
        </div>
      </div>
      <div className="dashboard-form-actions mt-4">
        <button className="dashboard-action-btn" onClick={onSubmit} type="button">{editMode ? 'Update Truck Finance' : 'Create Truck Finance'}</button>
        {editMode ? <button className="dashboard-danger-btn" onClick={async () => { await deleteFinanceTruck(truckFinanceId); history.push('/user-dashboard/finance/trucks'); }} type="button">Delete</button> : null}
      </div>
    </section>
  );
}

export default UserTruckFinanceCreatePage;
