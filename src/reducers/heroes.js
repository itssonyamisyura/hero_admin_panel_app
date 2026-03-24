import { createReducer } from "@reduxjs/toolkit"

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted,
    heroDeleteError
} from '../actions';


const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// const heroes = createReducer(initialState, {
//     [heroesFetching]: state => { state.heroesLoadingStatus = 'loading'},
//     [heroesFetched]: (state, action) => {
//                     state.heroesLoadingStatus = 'idle';
//                     state.heroes = action.payload;
//                 },
//     [heroesFetchingError]: state => {state.heroesLoadingStatus = 'error'},
//     [heroCreated]: (state, action) => {
//                     state.heroes.push(action.payload);
//                 },
//     [heroDeleted]: (state, action) => {
//                     state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
//                 },
//     [heroDeleteError]: state => {state.heroesLoadingStatus = 'error'}
//         },
//     [],
//     state => state
// )
// The object notation for createReducer has been removed!
// keys = action creators, их свойства = выполняемые действия



const heroes = createReducer(initialState, builder => {
    builder
        .addCase(heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        }) 
        .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(hero => hero.id !== action.payload)
        })
        .addCase(heroDeleteError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
})
// usining obj builder


// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_DELETED':
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(hero => hero.id !== action.payload)
//             }
//         case 'HERO_DELETE_ERROR':
//             return {
//                 ...state,
//                 heroLoadingStatus: 'error'
//             }
//         case 'HERO_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//                 //action.payload = new hero
//             }
//         default: return state
//     }
// }

export default heroes;