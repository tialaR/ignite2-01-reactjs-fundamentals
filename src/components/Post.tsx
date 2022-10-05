import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import styles from './Post.module.css';

import { Comment } from './Comment';
import {Avatar} from './Avatar';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(['Muito bom, parabéns!! 👏👏']);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  //Data de publicação do post relativa a data atual (publicado a tanto tempo da data atual)
  const publishedDaterelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true
  });

  //FormEvent -> Esse é o evento que é disparado pois é um evento disparado pelo formulário
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    // PROGRAMAÇÃO IMPERATIVA - const newCommentText = event.target.comment.value;

    setComments([...comments, newCommentText]);
    setNewCommentText('');

    //Limpar textarea após realizar comentário
    //PROGRAMAÇÃO IMPERATIVA - event.target.comment.value = ''
  }

  /*  ChangeEvent<HTMLTextAreaElement> -> O evento é do tipo changeEvent e 
  está sendo disparado por uma textarea */
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    //Anotando que o textarea não estás mais com erro
    event.target.setCustomValidity('')

    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete: string) {
    // Deletar comentário 
    // Criar uma nova lista de comentários sem o comentário que eu não quero mais
    const commentsWithoutDeletedOne = comments?.filter(comment => {
      return comment !== commentToDelete
    });

    //Atualizando a lista de comentários removendo o que foi deletado
    setComments(commentsWithoutDeletedOne);
  }

  /* InvalidEvent<HTMLTextAreaElement> -> O tipo do evento é invalidElement e está sendo 
  disparado por uma textarea */
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    //Anotando que o texarea está com erro
    event.target.setCustomValidity('Esse campo é obrigatório')
  }

  const isNewCommentEmpty = newCommentText?.length === 0;

  return (
    <article className={styles.post}>
        <header>
            <div className={styles.author}>
                <Avatar hasBorder image={author.avatarUrl} />
                <div className={styles.authorInfo}>
                    <strong>{author.name}</strong>
                    <span>{author.role}</span>
                </div>
            </div>

            <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDaterelativeToNow}</time>
        </header>

        <div className={styles.content}>
            {content.map(line => {
                if(line.type === 'paragraph') {
                    return <p key={line.content}>{line.content}</p>
                } else if (line.type === 'link') {
                    return <p key={line.content}><a href='#'>{line.content}</a></p>
                }
            })}
        </div>

        <form onSubmit={handleCreateNewComment} className={styles.comentForm}>
            <strong>Deixe seu feedback</strong>

            <textarea
                name="comment"
                placeholder="Deixe um comentário"
                required
                onInvalid={handleNewCommentInvalid}
                value={newCommentText}
                onChange={handleNewCommentChange}
            />

            <footer>
                <button disabled={isNewCommentEmpty} type="submit">Publicar</button>
            </footer>
        </form>

        <div className={styles.commetList}>
            {comments.map(comment => (
                <Comment key={comment} onDeleteComment={deleteComment} content={comment} />
            ))}
        </div>
    </article>
  );
}

export default Post;