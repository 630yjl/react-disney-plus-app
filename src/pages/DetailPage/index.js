import axios from '../../api/axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailPage = () => {
  //let movieId = useParams().movieId ->아래 문법이 줄인 문법
  let {movieId} = useParams() //useParam는 React Router 라이브러리의 일부인 react-router-dom에서 제공하는 훅 중 하나입니다. 이 훅은 현재 경로의 URL 매개변수를 추출하는 데 사용됩니다. 
  const [movie, setMovie] = useState({})

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/movie/${movieId}`
      )
      setMovie(response.data)
    }
    fetchData()
  }, [movieId])
  
  if(!movie) return null

  return (
    <section>
      <img
        className='modal__poster0img'
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="img"
      />
    </section>
  )
}

export default DetailPage