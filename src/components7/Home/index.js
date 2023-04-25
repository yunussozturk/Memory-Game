import React, { useState } from 'react';
import './style.css';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createUserName , startAgain } from '../../redux7/gameSlice';

function Home() {

//inputa girilen değer için kullanıcı adı oluşturuldu
  const [user , setUser] = useState("")

  const dispatch = useDispatch();

/* Kullanıcı adı boş veya 9 karakterden fazla olursa false döndürüp hata mesajı verildi. 
   Değilse oyun başlaması için gereklilikler sağlandı*/
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(user === ""){
      return alert("Lütfen kullanıcı adı giriniz")
    }

    if(user.length > 9 ){
      alert("maksimum 9 karakter giriniz")
      return false;
    }
    dispatch(startAgain())
    dispatch(createUserName(user))
    setUser("")
  }

  return (
    <div className='home'>
      Enter Username
      <input placeholder='enter a max of 9 characters...' value={user} onChange={(e) => setUser(e.target.value)} />   
      <button onClick={handleSubmit}>
        {user === "" || user.length > 9 ? "Play a Game" : (<Link to={"/play"} className='button' >Play a Game</Link>)}
      </button>
    </div>
  )
}

export default Home;