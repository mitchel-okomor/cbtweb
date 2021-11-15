import { cookieService } from './authServices';



// Fetch
export const fetchData = async (endpoint:string, data:any, method:any, contentType:any, refresh=false) => {
  const token = cookieService().getToken();
  const refreshToken =  cookieService().getRefreshToken();

  const options: any = {
    method: method ? method : data ? 'POST' : 'GET',
    headers: {
      'Content-Type': contentType || 'application/json',
      Authorization: refresh ? refreshToken : token && token,
      Accept: 'application/json'
    }
  };
  if (data && !contentType) options.body = JSON.stringify(data);
  if (contentType) options.body = data;

  const response = await fetch(endpoint, options);
  if (response.status === 401) {
    cookieService().removeToken('access_token');
    cookieService().removeToken('expiresIn');
    localStorage.removeItem('user');
  }
  return response.json();
};
