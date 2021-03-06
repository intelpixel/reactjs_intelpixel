import {getaxiosInstance} from "../axiosInstance";
export const getFiltersApi = async (filterType,queryParam) => {
  return await getaxiosInstance().get(`/api/v1/${filterType}/get${queryParam}`);
};
export const getElasticSearchApi = async (queryParam) => {
  return await getaxiosInstance().get(`/api/v1/elasticsearch/get${queryParam}`);
};


// export const RegistrationApi = async (params) => {
//   return await getaxiosInstance().post(`/registration/verifyToken`,params);
// };
// export const RegistrationMemberApi = async (params) => {
//   return await getaxiosInstance(`Bearer ${localStorage.getItem('verifyOtp')}`).post(`/registration/memberdata`,{...params,jwtToken:localStorage.getItem('verifyToken')});
// };
// export const CheckUsernameApi = async (params) => {
//   return await getaxiosInstance(`Bearer ${localStorage.getItem('verifyOtp')}`).get(`/registration/checkusername?name=${params}`);
// };
// export const LoginApi = async (params) => {
//   return await getaxiosInstance().post(`/authenticate`,params);
// };
// export const ChangePasswordApi = async (params) => {
//   return await getaxiosInstance(`Bearer ${localStorage.getItem('user')}`).post(`/changePassword`,params);
// };
// export const ForgotApi = async (params) => {
//   return await getaxiosInstance().post(`/member/forgotPassword`,params);
// };
// export const PasswordResetApi = async (params) => {
//   return await getaxiosInstance().post(`/member/passwordReset`,params);
// };
// export const RequestOtpApi = async (url) => {
//   return await getaxiosInstance(`Bearer ${localStorage.getItem('verifyToken')}`).post(`${url}/requestOTP`,{jwtToken:localStorage.getItem('verifyToken')});
// };
// export const VerifyOtpApi = async (url,token,params) => {
//   return await getaxiosInstance(token).post(`${url}/verifyOTP`,params);
// };