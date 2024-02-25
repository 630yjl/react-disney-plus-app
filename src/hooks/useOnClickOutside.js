import { useEffect } from "react"

export default function useOnClickOutside(ref, handler) {//ref는 지금 클릭하는 곳이 안인지 밖인지 확인하기 위해 가져오고, handler 부분에 함수를 넣어줄 건데 이 함수에서 모달 창 외의 부분을 클릭했을 때 모달 창히 닫히는 액션을 함수에서 구현한다
 useEffect(() => {
    const listener = (event) => {
      if(!ref.current || ref.current.contains(event.target)) { //ref.current가 없거나 event.target의 영역이 ref.current 안 일때 
        return
      
      }
      handler()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

   return () => {
    document.removeEventListener('mousedown', listener)
    document.removeEventListener('touchstart', listener)
   }
 }, [ref, handler])
 
}