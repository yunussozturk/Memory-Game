import React, { useEffect, useState } from 'react'

import "./style.css"
import { useSelector , useDispatch} from 'react-redux';
import {startAgain , openAddTwoCharacter  , changeRecord , restart } from "../../redux7/gameSlice"

import {Modal,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,useDisclosure,Button} from '@chakra-ui/react'

import { Link } from 'react-router-dom';

function Game() {

  const [ twoSelectedCharacters , setTwoSelectedCharacters] = useState([])    // kıyaslanacak iki eleman için oluşturuldu
  const [ blackOut , setBlackOut ] = useState([])    // açılan benzer karakterleri karartmak için oluşturuldu

  const newRecord = useSelector((state) => state.game.newRecord)
  const userName = useSelector((state) => state.game.userName)
  const gameCharacters = useSelector((state) => state.game.gameCharacters)
  const similarCharacters = useSelector((state) => state.game.similarCharacters)    // açılan benzer karakterler
  const recordHolder = useSelector((state) => state.game.recordHolder)
  const [ score , setScore] = useState({name : userName , point : 100})

  const similarCharactersID = similarCharacters.map((similarCharacter) => similarCharacter.id)    // similarCharacters dekilerin id leri
  const twoSelectedCharactersID = twoSelectedCharacters.map((data) => data.id)    // kıyaslanan iki elemanın id ' leri

  const dispatch = useDispatch();

// restart butonuna tıklayınca olması gerekenler
  const resetBtnClick = () =>{
    setTwoSelectedCharacters([])
    dispatch(startAgain())
    setTimeout(function(){
      dispatch(restart())
    },1500)
    setScore({name : userName , point : 100})
  }

// kutulara tıkla ve seçilmiş iki karakteri oluştur
  const handleClick = (data) =>{
    setTwoSelectedCharacters([...twoSelectedCharacters , data])
  }

/* seçilmiş iki elemanda ki iki eleman aynı ise similarCharacters ' e ekle . Score ' a 50 puan ekle, değilse 10 puan azalt.
   tüm kutular doğru açılmışsa(eleman sayısı 20 ise oyunu bitir) */
  useEffect(() =>{
      if(twoSelectedCharacters.length === 2 && twoSelectedCharacters[0].title === twoSelectedCharacters[1].title){
        dispatch(openAddTwoCharacter(twoSelectedCharacters))
        setScore({ name : userName , point : score.point + 50})
        setTwoSelectedCharacters([])
      }
      else if(twoSelectedCharacters.length === 2 && twoSelectedCharacters[0].title !== twoSelectedCharacters[1].title){
        setScore({ name : userName , point : score.point - 10})
        setTimeout(() => setTwoSelectedCharacters([]) , 1000)
      }    
      if(similarCharacters.length === 20){
        onOpen()
        dispatch(changeRecord(score))
      }
  },[twoSelectedCharacters])

// seçili elemanlar aynı olup similarCharacters'e eklenince koyu renk yap
  useEffect(()=>{
    setTimeout(function(){
      setBlackOut(similarCharacters.map((data) => data.id))
    },1500)
  },[similarCharacters])

// userName ' i locale kaydet
  useEffect(() =>{
    localStorage.setItem("userName" , JSON.stringify(userName))
  },[userName])

// score sıfıra düşünce oyunu bitir
  useEffect(() =>{
    if(score.point === 0){
      onOpen()
    }
  },[score.point])

  const { isOpen, onOpen, onClose } = useDisclosure()

//Modal ' ı kapatınca yeniden başlatmak için gerekenler yapıldı
  const close = () =>{
    dispatch(startAgain())
    dispatch(restart())
    setScore({name : userName , point : 100})
    onClose()
  }

  return (
    <div className='game'>
        <div>
            <div className='player'>Player</div>
            <div className='userName'>{userName}</div>
            <div className='resetBtn'><button onClick={resetBtnClick}>Restart</button></div>
            <div className='back'><button><Link to={"/"}>Back</Link></button></div>
        </div>      
       <div className='boxes'>
        {
          gameCharacters.map((data) => (
            <button key={data.id} className='box' disabled={twoSelectedCharactersID.includes(data.id) || similarCharactersID.includes(data.id) || twoSelectedCharactersID.length > 1} onClick={() => handleClick(data)}>
              <div className={`${twoSelectedCharactersID.includes(data.id) === true || similarCharactersID.includes(data.id) === true  ? "back2" : "back1"}`}>
                <img className={`${blackOut.includes(data.id) === true && "blackout"}`} src={data.address}  />
              </div>
              <div className={`${twoSelectedCharactersID.includes(data.id) === true || similarCharactersID.includes(data.id) === true  ? "front2" : "front1"}`}>
                <div className='questionMark'>?</div>
              </div>
            </button>
          ))
        }
       </div>             
        <div>
            <div className='score'>
              <div>SCORE</div>
              <div id='score' >{score.point}</div>
            </div>        
            <div className='record'>
              <div className='recordTitle'>RECORD</div>
              <div className='recordHolder'>{recordHolder}<br /><span className='recordScore'>{newRecord}</span></div>
            </div>
        
              <Modal border='2px solid black' borderRadius='20px'  isOpen={isOpen} onClose={close}>      
                <ModalContent marginTop='150px'>
                  <ModalHeader bg='orange' fontSize='30px' color='green' padding='20px' >
                    {similarCharacters.length === 20 ? "Congratulations !" : "You Lost !" }
                  </ModalHeader>
                  <ModalCloseButton fontSize='20px' border='1px solid red' bg='red' color='white' >X</ModalCloseButton>
                  <ModalBody fontSize='50px' bg='white' padding='20px'>    
                  Your Score : {score.point}
                  </ModalBody>
                  <ModalFooter bg='white'>
                    <Button colorScheme='blue' mr={3} onClick={close}>
                      Close
                    </Button>
                    <Button colorScheme='green' onClick={close}>
                      Restart
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal> 
        </div>
    </div>
  )
}
export default Game