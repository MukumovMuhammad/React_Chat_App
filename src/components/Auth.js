import {auth, provider } from "../firebase-config.js";
import { signInWithPopup} from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = (props) =>{

    const {setIsAuth} = props;
    const signInWithGoogle = async () =>{
        try{
            const result = await signInWithPopup(auth, provider);
            cookies.set("auto-token", result.user.refreshToken);
            setIsAuth(true);
        }
        catch(err){
            console.log(err)
        }
    }
    return(
        <div className="auth">
            <p>Sign in With Your Google Account Please</p>
            <button onClick={signInWithGoogle}>Sign in With Google</button>
        </div>
    )
}   
