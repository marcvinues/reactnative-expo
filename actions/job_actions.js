import axios from 'axios';
import { FETCH_JOBS } from './types';
import reverseGeocode from 'latlng-to-zip'
import qs from 'qs';

//const JOB_ROOT_URL= 'http://api.indeed.com/ads/apisearch?'
const JOB_ROOT_URL= '../data.json'

const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({...JOB_QUERY_PARAMS, l: zip})
  return 'http://api.indeed.com/ads/apisearch?'+query;
}

export const fetchJobs = (region) => async (dispatch) => {
  try{
    let zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    let { data } = await axios.get(url);
    dispatch({
      type: FETCH_JOBS,
      payload: data
    });
    console.log(data)
  } catch(e){
    console.error(e);
  }
}


