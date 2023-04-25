import { createSlice } from "@reduxjs/toolkit";
import game from "../game.json";
import arrayShuffle from 'array-shuffle';

export const gameSlice = createSlice({
    name : 'game',
    initialState:{
        userName: localStorage.getItem('userName') ? JSON.parse(localStorage.getItem('userName')) : [],
        gameCharacters: arrayShuffle(game),
        similarCharacters : [],
        recordHolder : localStorage.getItem('recordHolder') ? JSON.parse(localStorage.getItem('recordHolder')) : [],
        newRecord : localStorage.getItem('newRecord') ? JSON.parse(localStorage.getItem('newRecord')) : [],
    },
    reducers:{
        createUserName : (state , action) =>{
            state.userName = action.payload;
        },
        openAddTwoCharacter : (state , action) =>{
            const characters = state.similarCharacters.concat(action.payload)
            state.similarCharacters = characters; 
        },
        startAgain : (state) =>{       
            state.similarCharacters = [];
            state.score = 100;           
        },
        restart : (state) =>{
            state.gameCharacters = arrayShuffle(game)
        },
        changeRecord : (state , action) =>{
            if(action.payload.point > state.newRecord){
                localStorage.setItem("recordHolder" , JSON.stringify(action.payload.name))
                localStorage.setItem("newRecord" , JSON.stringify(action.payload.point))
                state.recordHolder = action.payload.name
                state.newRecord = action.payload.point
            }
        }
    }
})

export const {createUserName , openAddTwoCharacter , startAgain  , changeRecord , restart} = gameSlice.actions;
export default gameSlice.reducer;

