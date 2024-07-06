import axios from 'axios';

// const baseUrl = 'http://192.168.0.214:5000/';
const baseUrl = 'https://homeoly-server-main.onrender.com/';
// const baseUrl = 'https://app.homeoly.com/';

const endpoints = {
  SIGNUP: 'auth/api/user/signup',
  VERIFY: 'auth/api/user/verify-otp',
  SIGNIN: 'auth/api/user/signin',
  GET_DOCTOR: 'api/users/doctor',
  ADD_PATIENT: 'api/patients/add-patient',
  UPDATE_PATIENT: 'api/patients/update-patient',
  UPDATE_DOCTOR: 'api/users/update-doctor',
  GET_ALL_PATIENT: 'api/patients',
  GET_ALL_MALE_PATIENT: 'api/patients/male',
  GET_ALL_FEMALE_PATIENT: 'api/patients/female',
  GET_PATIENT_PRESCRIPTOINS: 'api/prescriptions/all-prescription',
  DELETE_PATIENT: 'api/patients/delete-patient',
  ADD_BILL: 'api/create-billing-overview',
  ALL_BILLS: 'api/get-all-billing-overview',
  ADD_PRESCRIPTION: 'api/prescriptions/add-prescription',
  GET_FINANCE: 'api/prescriptions/finance-dashboard',
  UPDATE_DUE: 'api/prescriptions/update-due',
  UPDATE_BILL: 'api/prescriptions/update-bill',
};

export const apiService = {
  signup: async user => await axios.post(baseUrl + endpoints.SIGNUP, user),
  verifyOTP: async formData =>
    await axios.post(baseUrl + endpoints.VERIFY, formData),
  signin: async formData =>
    await axios.post(baseUrl + endpoints.SIGNIN, formData),
  addPatient: async (formData, token) =>
    await axios.post(baseUrl + endpoints.ADD_PATIENT, formData, {
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    }),
  addPrescription: async (formData, token) =>
    await axios.post(baseUrl + endpoints.ADD_PRESCRIPTION, formData, {
      headers: {token},
    }),
  updatePatient: async (formData, id, token) =>
    await axios.delete(
      `${baseUrl}${endpoints.UPDATE_PATIENT}/${id}`,
      formData,
      {
        headers: {token},
      },
    ),
  updateDoctor: async (formData, token) =>
    await axios.put(`${baseUrl}${endpoints.UPDATE_DOCTOR}`, formData, {
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    }),

  updateDue: async (formData, token, prescriptionId) =>
    await axios.put(
      `${baseUrl}${endpoints.UPDATE_DUE}/${prescriptionId}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          token,
        },
      },
    ),
  updateBill: async (formData, token, prescriptionId) =>
    await axios.put(
      `${baseUrl}${endpoints.UPDATE_BILL}/${prescriptionId}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          token,
        },
      },
    ),

  getAllPatient: async token =>
    await axios.get(`${baseUrl}${endpoints.GET_ALL_PATIENT}`, {
      headers: {token},
    }),

  getAllMalePatient: async token =>
    await axios.get(`${baseUrl}${endpoints.GET_ALL_MALE_PATIENT}`, {
      headers: {token},
    }),

  getAllFemalePatient: async token =>
    await axios.get(`${baseUrl}${endpoints.GET_ALL_FEMALE_PATIENT}`, {
      headers: {token},
    }),

  getPatientPrescription: async (id, token) =>
    await axios.get(
      `${baseUrl}${endpoints.GET_PATIENT_PRESCRIPTOINS}/${(patinetId = id)}`,
      {
        headers: {token},
      },
    ),

  deletePatient: async (id, token) =>
    await axios.delete(`${baseUrl}${endpoints.DELETE_PATIENT}/${id}`, {
      headers: {
        token,
      },
    }),
  addBill: async formData =>
    await axios.post(`${baseUrl}${endpoints.ADD_BILL}`, formData),
  getAllBill: async token =>
    await axios.get(`${baseUrl}${endpoints.ALL_BILLS}`, {
      headers: {token},
    }),
  getDoctor: async token =>
    await axios.get(`${baseUrl}${endpoints.GET_DOCTOR}`, {
      headers: {token},
    }),

  getFinance: async token =>
    await axios.get(`${baseUrl}${endpoints.GET_FINANCE}`, {
      headers: {token},
    }),
};
