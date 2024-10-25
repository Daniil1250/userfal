import styles from '../UsersProfile.module.scss';
import myImage from './hd-tekstury-dorogi_1710279861_968562.jpg';
import { Addpost } from './Addpost.jsx';
import { useEffect, useState } from 'react';
import { insertData } from './server/PostPushData/yourDataFunctions.js';
import { supabase } from './server/connectPost/supabaseClient.jsx';

export function UsersProfile({ name, firstname, email, token }) {

  const [randomNumberW, setRandomNumberW] = useState(0);

  const generateRandomNumber = () => {
    const newrandomNumber = Math.floor(Math.random() * 10000000000); 
    setRandomNumberW(newrandomNumber);
  };

  const [newfromID, setNewfromID] = useState('');

  useEffect(() => {
    setNewfromID(randomNumberW + token);
  }, [randomNumberW]);

  const [posts, setPosts] = useState([]);
  const [numberPost, setNumberPost] = useState(0);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewBody] = useState('');
  const [newTimePost, setNewTimePost] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
 console.log(posts);
 
  const addPost = async (e) => {
    generateRandomNumber();
    

     setNumberPost(numberPost + 1);    

    if (newPostTitle.trim() && newPostBody.trim()) {
      setPosts([...posts, { 
        id: numberPost, 
        title: newPostTitle, 
        body: newPostBody,
        time: newTimePost,
        token: newfromID,
      }]);
   
      setNewPostTitle('');
      setNewBody('');
    }

     const data = {title: newPostTitle, bodySms: newPostBody, time: newTimePost, user_id: token, number: newfromID}; 
  const result = await insertData(data);
  console.log(result);
  };

 
  return (
    <>
      <div className={styles.RightBlockContent}>
        <div className={styles.UsersProfile}>
          <div className={styles.centercontent}>
            <img src={myImage} className={styles.ImageColor} />
            <div className={styles.BioInfa}>
              <div className={styles.BioUser}>
                <p style={{ fontSize: '17px' }}>{name}</p>
                <p style={{ fontSize: '17px' }}>{firstname}</p>
              </div>
              <p style={{ textAlign: 'center', fontSize: '12px', opacity: '0.5' }}>{email}</p>
            </div>
          </div>
        </div>
        <a style={{ color: 'white', fontSize: '20px' }}>Напиши свою статью:</a>
        <input
          type='text'
          className={styles.Title}
          name="Title"
          placeholder='Заголовок'
          value={newPostTitle}
          onChange={(e) => { setNewPostTitle(e.target.value); }}
        />
        <textarea
          className={styles.BodySms}
          name="BodySms"
          rows="4"
          placeholder='Содержание ...'
          value={newPostBody}
          onChange={(e) => { setNewBody(e.target.value); }}
        />
        <input
          type='submit'
          name='buttonSms'
          placeholder='Отправить'
          className={styles.ButtonSms}
          onClick={addPost}
        />
      </div>
      <Addpost posts={posts} name={name} newfromID={newfromID} id={posts.id} setPosts={setPosts}/>
    </>
  );
}
