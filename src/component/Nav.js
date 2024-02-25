import React, {useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';

const Nav = () => {
  //userData가 있을 경우 즉 application 에 key와 value가 있을 경우 그것을 사용하고 없을 경우 빈 객체를 사용한다
  //(JSON.parse()는  JSON.stringify로 인해 텍스트화 되어있는 것을 다시 객체나 배열로 되돌림)
  const initalUserData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {};

  const [show, setShow] = useState(false);
  const {pathname} = useLocation()
  const [searchValue, setSearchValue] = useState("")
  const navigate = useNavigate(); // useNavigate ->경로를 바꿔줌
  const auth = getAuth()
  const provider = new GoogleAuthProvider()
  const [userData, setUserData] = useState({initalUserData})


  useEffect(() => {//onAuthStateChanged - user가 로그인인지 아닌지 감시함
    
      onAuthStateChanged(auth, (user) => {
        if(user) {
          if(pathname === "/") { // 로그인 페이지에서 user가 있으면 메인으로 가게끔
            navigate("/main")
          }
        } else { 
          navigate("/")
        }
      })

  }, [auth, navigate, pathname])
  


  useEffect(() => { 
    window.addEventListener('scroll', handleScroll) 
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []); //[]은 안에 state가 변할 때 마다 실행이 됨 

  const handleScroll = () => {
    if(window.scrollY > 50) {
      setShow(true)
    } else {
      setShow(false)
    }
  }
  
  
  const handleChange = (e) => {
    setSearchValue(e.target.value) //e.target.value ->타이핑할때마다 타이핑 값이 반환 setSearchValue값을 바꿈
    navigate(`/search?q=${e.target.value}`) // https://localhost:3000/search?q=검색할내용
  }

  const handleAuth = () => {
    signInWithPopup(auth, provider)
    .then(result => { // result -> user정보가 들어옴 이 중에서 pothoUrl이용
      setUserData(result.user)
      localStorage.setItem("userData", JSON.stringify(result.user))

    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleSignOUt = () => { //firebase에서 가져옴- 인증된 유저가 로그아웃 할 수 있게
    signOut(auth).then(() => {
      setUserData({}) //setUserData를 없애준다(논객체로 만듦)
      navigate('/') //로그인 페이지로 이동
    }).catch((error) => {console.log(error)})
  }


  return (
    <NavWrapper $show={show}>
      <Logo>
        <img
          alt="Disney Plus logo"
          src="/images/logo.svg"
          onClick={() => (window.location.href = "/")}
        />
      </Logo>

      {pathname === '/'
        ? (<Login onClick={handleAuth}>Login</Login>)
        : <> <Input value={searchValue} onChange={handleChange} className='nav_input' type='text' placeholder='검색해주세요.' />

        <SignOut>
          <UserImg src={userData.photoURL} alt={userData.displayName} />
          <DropDown>
            <span onClick={handleSignOUt}>Sign Out</span>
          </DropDown>

        </SignOut>
        </>
      }
    </NavWrapper>
  )
}

export default Nav

const DropDown = styled.div `
  position: absolute;
  top:  48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 /50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100%;
  opacity: 0;
`

const SignOut = styled.div `
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`
const UserImg = styled.img `
  border-radius: 50%;
  width: 100%;
  height: 100%;
`

const Login = styled.a `
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: gray;
    border-color: transparent;
  }

`
const Input = styled.input `
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${props => props.$show ? "#090b13" : "transparent"};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img{
    display: block;
    width: 100%;
  }
`