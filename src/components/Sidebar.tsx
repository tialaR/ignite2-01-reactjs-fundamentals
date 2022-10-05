import React from 'react';
import { PencilLine } from 'phosphor-react';
import {Avatar} from './Avatar';

import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
        <img className={styles.cover} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ77MvEmUJw0CXaecIo_mwWE7c3U8J7g5X6SQ&usqp=CAU" />

        <div className={styles.profile}>
            <Avatar hasBorder image="https://avatars.githubusercontent.com/u/44264528?v=4" />
            <strong>Tiala Rocha</strong>
            <span>Web Developer</span>
        </div>

        <footer>
            <a href="#"><PencilLine size={20} /> Editar seu perfil</a>
        </footer>
    </aside>
  );
}

export  {Sidebar};