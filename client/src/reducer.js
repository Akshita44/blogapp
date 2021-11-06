export const initialState={
    user:null,
    loc:null
}

export default (initialState,action)=>{
    if(action.type === "Login")
    {
        return{
            ...initialState,
            user:action.payload
        }
    }
    else if(action.type === "Set")
    {
        return{
            user:action.payload.user,
            loc:action.payload.add
        }
    }
    else if(action.type === "Update")
    {
        return{ ...initialState,
            user:action.payload
        }
    }
    else if(action.type === "Logout")
    {
        return{
            ...initialState,
            user:null
        }
    }
    else{
        return initialState
    }
}