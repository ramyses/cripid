import { Link } from 'react-router-dom'
import styles from './header.module.css'
import logoimg from '../../assets/logo.png'

export function Header(){
  return(
    <header className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
        <img src={logoimg} alt="Logo Pagina" />
        </Link>
      </div>
    </header>
  )
}