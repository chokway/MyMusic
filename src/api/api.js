import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://localhost:3000';

export function fetchGet(url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, {params: param} )
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default {
  MusicUrl (id) {
    return fetchGet('/music/url', {id})
  },
  MusicLyric (id) {
    return fetchGet('/lyric', {id})
  },
  MusicSearch (keywords) {
    return fetchGet('/search', {keywords})
  },
  MusicRank (idx) {
    return fetchGet('/top/list', {idx})
  },
}
