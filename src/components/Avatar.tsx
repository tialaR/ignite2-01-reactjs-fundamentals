import { ImgHTMLAttributes, useMemo } from 'react';
import styles from './Avatar.module.css';

/* 
  ImgHTMLAttributes -> extende todos os atributos que um componente <img>
  pode ter 
  HTMLImageElement -> É uma interface global e por isso eu não preciso importa-la
  de nenhum lugar 
*/
interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    image: string;
    hasBorder?: boolean;
}

const Avatar = ({ image, hasBorder = false, ...rest }: AvatarProps) => {
  const avatarBorderStyle = useMemo(() => {
    if(hasBorder) return styles.avatarWithBorder;
    return styles.avatar
  }, [hasBorder]);

  return <img {...rest} className={avatarBorderStyle} src={image} />;
}

export {Avatar};