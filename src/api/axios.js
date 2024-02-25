import axios from 'axios'

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "89482459e7c7859492fe337ae173c533",
    language: "ko-KR"
  }
})

export default instance //import할때 어떠한 이름을 써도 상관없음