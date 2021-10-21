
const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const REGISTER = baseUrl+ '/auth/register';
export const LOGIN = baseUrl+'/login';
export const FETCHUSER = baseUrl+'/auth/user'; // queryParam: account_number, bank_code
