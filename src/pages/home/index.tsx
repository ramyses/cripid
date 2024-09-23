import { Link } from 'react-router-dom'
import styles from './home.module.css'
import { BiSearch } from 'react-icons/bi'

export function Home(){
  return(
    <main className={styles.container}>
      <form action="" className={styles.form}>
        <input type="text" placeholder='Digite o simbolo  da moeda: BTC..' />
        <button type='submit'>
          <BiSearch size={30} color="#fff"/>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th scope='col'>Mode</th>
            <th scope='col'>Valor mercado</th>
            <th scope='col'>Preço</th>
            <th scope='col'>Volume</th>
          </tr>
        </thead>
        <tbody id='tbody'>
          <tr className={styles.tr}>
            <td className={styles.tdLabel} data-label="Moeda">
              <Link className={styles.link} to='/detail/btc'>
                <span >Bitcoin</span> | BTC
              </Link>
            </td>
            <td className={styles.tdLabel} data-label="Mercado"> 
              R$ 9999,99
            </td>
            <td className={styles.tdLabel} data-label="Preço"> 
              R$ 999,99
            </td>
            <td className={styles.tdProfit} data-label="Volume"> 
              <span>-5.3</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}