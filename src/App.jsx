import React, { useState, useEffect } from 'react'
import styles from './App.module.scss'
import {UsersProfile} from './component/User.jsx'
import { insertData } from './server/PushData/yourDataFunctions.js'
import { Buffer } from 'buffer'


const SecretKey = 'strin';

const base64UrlEncode = (str) => {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=+$/, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const generateToken = (header, payload) => {
  const headerEncoded = base64UrlEncode(JSON.stringify(header));
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload));
  
  const signature = base64UrlEncode(`${headerEncoded}.${payloadEncoded}.${SecretKey}`);
  
  return `${headerEncoded}.${payloadEncoded}.${signature}`;
};


export function App() {
  const [name, setName] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [point_none, setPoint_none] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [token, setToken] = useState('');

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

     
    return () => clearInterval(timerId);
  }, []);

  const handleGenerateToken = () => {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    const payload = {
      name,
      firstname,
      email
    };

    const newToken = generateToken(header, payload);
    setToken(newToken);
  };


const Click = async () =>{

  
  if(name.length === 0){
      alert("Поле `имя` не может быть пустым!");
      setPoint_none(false);
    }else if(firstname.length === 0){
      alert("Поле `фамилия` не может быть пустым!");
     setPoint_none(false);
    }else if(email.length === 0){
      alert("Поле `email` не может быть пустым!");
     setPoint_none(false);
    }else if(password.length === 0){
      alert("Поле `пароль` не может быть пустым!");
      setPoint_none(false);
    }else{
    setPoint_none(true);
    handleGenerateToken();
    const data = {login: name, fullName: firstname, time: currentTime.toLocaleTimeString(), email: email}; 
    const result = await insertData(data);
    console.log(result);
    
  } 

  
    
}
  return (<>
  <div style={{ display: point_none === true ? 'none' : 'block' }}>
<div className={styles.UserInput}>
  <p style={{margin: '0 auto'}}>Зарегистрироваться/Авторизироваться</p>
   <input type="text" placeholder='Имя' onChange={(event)=>{setName(event.target.value)}}  />
   <input type="text" placeholder='Фамилия' onChange={(event)=>{setFirstname(event.target.value)}}  />
   <input type="text" placeholder='email' onChange={(event)=>{setEmail(event.target.value)}}  />
   <input type="password" placeholder='Пароль' onChange={(event)=>{setPassword(event.target.value)}}/>
   <input type="submit" placeholder='Отправить' className={styles.SubmitGo} onClick={()=>{Click()}}/>
</div>
</div>

{point_none === true ? <UsersProfile name={name} firstname={firstname} email={email} token={token}/> : ''}


  </>)
}