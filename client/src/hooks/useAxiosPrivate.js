import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

/* 
  Within this function is where we add the access token from 'auth' (in contest) to the request headers. The headers are checked on the 
  back end (in the 'authenticate' middleware with jwt.verify()) and used to authenticate the user and allow a response to be delivered 
  from the back end server.

  One description is that interceptors are like 'event listeners'. It is important to note that you can keep attaching more of these 
  on top of previously attached interceptors, so the cleanup function is very important.
*/
const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(()=> {
    const requestIntercept = axiosPrivate.interceptors.request.use(         // IN THIS BLOCK: we have a chance to make changes to/before our 'request'
      config => {                                                           // let's prepare our axios request
        if (!config.headers['Authorization']) {                             // if the access token isn't in the headers already,
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;  // we need to add 'Bearer access_token...'
        }
        return config;                                                      // and then return the (possibly) updated config for use in our axios request
      }, (error) => {
        Promise.reject(error)
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(         // IN THIS BLOCK: we have a chance to process our 'response'
      response => response,                                                   // the 'response' function just returns the response
      async (error) => {                                                      // the error function initiates a refresh attempt
        const prevRequest = error?.config;                                    // put our previous request in a constant
        if (error?.response?.status === 403 && !prevRequest?.sent ) {         // first time through, prevRequest.sent will be false, 2nd time through it will be true
          prevRequest.sent = true;                                            // next time around, if we still fail, .sent will be true and we will go to the 'reject'
          const refreshResponse = await refresh();                             // 'refresh' function returns new access token via useRefreshToken hook
          prevRequest.headers['Authorization'] = `Bearer ${refreshResponse.accessToken}`;  // and we add that new token to the axios 'headers'
          return axiosPrivate(prevRequest);                                   // And then, I think, we call AxiosPrivate again (recursively?) with our updated headers, hoping for success
        } 
        return Promise.reject(error);
      }
    );
      return () => {                                                          // this is the useEffect 'cleanup' function
        axiosPrivate.interceptors.request.eject(requestIntercept);            // We remove the request interceptor so that we don't accidentally accumulate multiple interceptors
        axiosPrivate.interceptors.response.eject(responseIntercept);          // Same for reponse
      }
  },[ auth, refresh])

  return axiosPrivate;
}

export default useAxiosPrivate;
