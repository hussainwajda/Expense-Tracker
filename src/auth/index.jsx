import React, {useState} from 'react';
import logo from '../logo.png';
import './index.css';
import MetaTags from 'react-meta-tags';
import {setDoc,doc,getFirestore, getDoc} from "firebase/firestore";
import { auth, provider, provider2} from '../config/firebase-config';
import { useGetUserInfo } from "../hooks/useGetUserInfo";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Navigate } from 'react-router-dom';
export default function Index() {
const firestore = getFirestore();
const [isActive, setisActive] = useState(false);
const [email,setemail] = useState('');
const [password,setpassword] = useState('');
const [name, setname] = useState('');
  const navigate = useNavigate();
  const {isAuth} = useGetUserInfo();


// const googleSignIn = async () => {
//  const result = await signInWithPopup(auth, provider)
//  .then((userCredential) => {
//   const user = userCredential.user;
//   console.log(user);      
// navigate("/expense-tracker");
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   console.log(errorCode);
//   console.log(errorMessage);
//   alert("invalid credential, Don't have an account?? , Create One");
// });
// const authInfo = {
//   Userid : result.user.uid,
//   Name : result.user.displayName,
//   ProfilePhoto : result.user.profile,
//   isAuth : true,
//  };
//  localStorage.setItem("auth", JSON.stringify(authInfo));
//  navigate("/expense-tracker");
// } 

const googleSignIn = async () => {
  const results = await signInWithPopup(auth, provider);
  const authInfo = {
    userID: results.user.uid,
    name: results.user.displayName,
    profilePhoto: results.user.photoURL,
    isAuth: true,
  };
  localStorage.setItem("auth", JSON.stringify(authInfo));
  navigate("/expense-tracker");
};

// if (isAuth) {
//   return <Navigate to="/expense-tracker" />;
// }
const facebookSignIn = async () => {
  const results = await signInWithPopup(auth, provider2);
  const authInfo = {
    userID: results.user.uid,
    name: results.user.displayName,
    profilePhoto: results.user.photoURL,
    isAuth: true,
  };
  localStorage.setItem("auth", JSON.stringify(authInfo));
  navigate("/expense-tracker");
}
const RegisterHandler = () => {
    setisActive(!isActive);

} 
const LoginHandler = () => {
    setisActive(!isActive);
} 


const handleSubmitSignIn = async (event) => {
  event.preventDefault();
  const results = await signInWithEmailAndPassword(auth,email,password)
  const user = results.user;
  const userRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userRef);
    const userInfo = userDoc.data();
    console.log(userInfo);
  const authInfo = {
    userID: results.user.uid,
    name: userInfo.name,
    profilePhoto: userInfo.photoURL,
    isAuth: true,
  };
  localStorage.setItem("auth", JSON.stringify(authInfo));
  navigate("/expense-tracker");
}
const handleSubmitSignUp = async (event) =>{
  event.preventDefault();
  const results =await createUserWithEmailAndPassword(auth,email,password)
  const user = results.user;
    try{
      const userRef = doc(firestore, "users", user.uid);
    await setDoc(userRef, { name, photoUrl: localStorage.getItem("./nopp.png") }, { merge: true });
    alert("account created successfully");
    window.location.reload()

    }catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    };
}
  return (
    <div className='body'>
        <MetaTags>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />  
        </MetaTags>
        <div className='head'>
            <div id='logo'>
                <img style={{ width: 200, height: 200 }} src={logo} alt='logo' />
            </div>
            <div id='hd1'>
                <h1>Expense Tracker</h1>
            </div>            
        </div>
        <div id='content'></div>
    <div className={`container ${isActive ? "active" : ""}`} id="container">
      <div className={`container ${isActive ? "form-container sign-up" : "hide"}`}>
        <form onSubmit={handleSubmitSignUp}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" onClick={googleSignIn} className="icon google-register-btn">Google</a>
            <a href="#" onClick={facebookSignIn} className="icon facebook-register-btn">facebook</a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)}/>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)}/>
          <button>Sign Up</button>
        </form>
      </div>
      <div className={`container ${isActive ? "hide" :"form-container sign-in"}`}>
        <form onSubmit={handleSubmitSignIn}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" onClick={googleSignIn} className="icon google-login-btn">Google</a>
            <a href="#" onClick={facebookSignIn} className="icon facebook-login-btn">facebook</a>
          </div>
          <span>or use your email password</span>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)}/>
          <a href="#">Forget Your Password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className={isActive ? "toggle-panel toggle-left" : "hide"}>
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site features</p>
            <button className="hidden" onClick={LoginHandler} id="login">Sign In</button>
          </div>
          <div className={isActive ? "hide" : "toggle-panel toggle-right"}>
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of the site features</p>
            <button className="hidden" onClick={RegisterHandler} id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    
  );
}




