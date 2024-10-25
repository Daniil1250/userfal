import styles from "./style/Addpost.module.scss";
import { MdDelete } from "react-icons/md";
import React, { useState, useEffect } from "react";

export function Addpost({ posts, name, id, setPosts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null); // Добавлено состояние для postToDelete

  const openPopUp = (post) => {
    //  post  передается  как  аргумент
    setPostToDelete(post);
    setIsOpen(true);
  };

  const closePopUp = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    setPosts(posts.filter((p) => p !== postToDelete));
    setIsOpen(false);
  };

  return (
    <>
      <br />
      <br />
      <div className={styles.ComponentLeft}>
        {posts.length === 0 ? (
          <div className={styles.PostNoPost}>Нет постов!</div>
        ) : (
          ""
        )}
        {posts.map((post, index) => (
          <div key={index} className={styles.Post}>
            <MdDelete
              style={{
                position: "relative",
                float: "right",
                top: "10px",
                cursor: "pointer",
                width: "20px",
                height: "20px",
              }}
              onClick={() => openPopUp(post)}
            />
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <smail style={{ float: "right", margin: "-20px 0px 0px 0px" }}>
              {post.time}
            </smail>
          </div>
        ))}
      </div>
      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <p onClick={closePopUp} style={{fontSize: '15px', float: 'right', marginTop: '-10px', cursor: 'pointer'}}>X</p>
            <p>{name} вы уверены что хотите удалить этот пост?</p>
           <select style={{outline: 'none', cursor: 'pointer', alignItems: 'center'}} onChange={(event)=>{
            const selectedOption = event.target.value;
            if (selectedOption === "closeClick") {
              closePopUp();
            }
            if (selectedOption === "deleteClick") {
              setPosts(posts.filter((p) => p !== postToDelete));
     setIsOpen(false);
            }
           }}>
           <option row="1">----</option>
            <option row="1" value="deleteClick">Удалить</option>
            <option value="closeClick">Отмена</option>
           </select>
          </div>
          <div className={styles.popupContentGradient}></div>
        </div>
      )}
    </>
  );
}
