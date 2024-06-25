import Cookies from "universal-cookie";

export const UseSetCookie = (params: any, name: any) => {
  const cookies = new Cookies();
  cookies.set(params, name);
};

export const UseGetCookie = (params: any) => {
  const cookies = new Cookies();
  cookies.get(params);
};
