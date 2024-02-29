export const initialState = {
    avatar: '',
    favorites: [],
    appointment: []
}

export const UserReducer = (state: any,action: { type: any; payload: { avatar: any; }; })=>{
    switch(action.type){
        case 'setAvatar':
            return {...state,avatar: action.payload.avatar}
        break;    
        default:    
            return state
    }
}