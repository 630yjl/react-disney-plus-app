import { useEffect, useState } from "react"

export const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value) //타이핑 값인 value를 넣어준다
    }, delay);
  
    return () => {
      clearTimeout(handler) //delay 시간 안에 계속해서 쳐지는 타이핑을 클리어해준다 
    }
  }, [value, delay]) //value, delay가 바뀔때마다 함수실행
  
  return debounceValue

}