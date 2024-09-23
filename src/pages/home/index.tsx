import {FormEvent, useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import styles from './home.module.css'
import { BiSearch } from 'react-icons/bi'
import key from '../../key/coinlibKey';

//https://coinlib.io/api/v1/coinlist?key=37078a77fbe8e2b7&pref=EUR

interface CoinProps {
  name: string;
  delta_24h: string;
  price: string;
  symbol: string;
  volume_24h: string;
  market_Cap: string;
  formatedPrice: string;
  formatedMarket: string;
}

interface DataProps{
  coins: CoinProps[];
}

export function Home(){
  const [coins, setCoins] = useState<CoinProps[]>([])
  const [inputValue, setInputValue] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    function getData(){
      //coinlib não ta permitindo consumir a api direto do front
      fetch(`https://coinlib.io/api/v1/coinlist?key=${key}&pref=BRL`)
      .then(response => response.json())
      .then((data: DataProps) => {
        //a requisicao deu certo
        const coinsData = data.coins.slice(0, 15) // limitando as moedas a 15

        const price = Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL"
        })

        const formatResult = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: price.format(Number(item.price)),
            formatedMarket: price.format(Number(item.market_Cap))
          }
          return formated
        })
        setCoins(formatResult)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  
    getData();
  })

  function handleSearch(e: FormEvent){
    e.preventDefault();
    if( inputValue === "") return;
    
    navigate(`/detail/${inputValue}`)
  }

  return(
    <main className={styles.container}>
      <form action="" className={styles.form} onSubmit={handleSearch}>
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Digite o simbolo  da moeda: BTC..' />
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
          {coins.map( coin => (
            <tr key={coin.name} className={styles.tr}>
              <td className={styles.tdLabel} data-label="Moeda">
                <Link className={styles.link} to={`/detail/${coin.symbol}`}>
                  <span >{coin.name}</span> | {coin.symbol}
                </Link>
              </td>
              <td className={styles.tdLabel} data-label="Mercado"> 
                {coin.formatedMarket}
              </td>
              <td className={styles.tdLabel} data-label="Preço"> 
                {coin.formatedPrice}
              </td>
              <td className={Number(coin?.delta_24h) >= 0 ? styles.tdProft : styles.tdLoss}  data-label="Volume"> 
                <span>{coin.delta_24h}</span>
              </td>
            </tr>
          ) )}
        </tbody>
      </table>
    </main>
  )
}