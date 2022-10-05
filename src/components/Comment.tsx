import React from 'react';
import { ThumbsUp, Trash } from 'phosphor-react';

import {Avatar} from './Avatar';

import  styles from './Comment.module.css';
import { useState } from 'react';

interface CommentProps {
  content: string;
  onDeleteComment: (comment: string) => void;
}

const Comment = ({ content, onDeleteComment }: CommentProps) => {

  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment() {
    onDeleteComment(content);
  }

  function handleLikeComment() {
    setLikeCount((oldState) => {
      return oldState + 1
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar image="https://avatars.githubusercontent.com/u/44264528?v=4" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commetContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Devon Lane (você)</strong>
              <time title="11 de Maio à 8:13h" dateTime="2022-05-11 08:13:30">Cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}

export {Comment};