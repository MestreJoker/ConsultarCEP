'use client'
import Image from "next/image";
import { use, useState } from "react";
import '@/app/css/style.css'
export default function Home() {
  const [getCepValue, setCepValue] = useState('')
  const [getA, setA] = useState(<></>)

  async function consultarCep() {
    try {
      const response = await fetch(`https://cep.awesomeapi.com.br/json/${getCepValue}`)
      const dados = await response.json()
      console.log(dados)

      if (!response.ok) {
        setA(
          <div>CEP não encontrado</div>
        )
      }
      else {
        setA(
          <div>
            <h1 className="text-center font-bold text-xl mb-3">{dados.address}</h1>
            <p><b>Cidade: </b> {dados.city} - {dados.state}</p>
            <p><b>Bairro: </b> {dados.district}</p>
          </div>
        )
        setCepValue('')
      }

    }
    catch (erro) {
      setA(
        <div>
          eiwufehfjhjsdhfsjhfsjhfdjkdshf
        </div>
      )
    }
  }
  return (
    <main className="bg-white h-98 w-139 max-w-[90%] rounded-3xl p-7">
      <h1 className="font-bold text-2xl text-center">Consultar CEP</h1>
      <br />

      <label htmlFor="inputCep" className="text-sm font-bold">CEP</label>
      <input id="inputCep" type="text" inputMode="numeric" value={getCepValue} placeholder="99999-999"
        onChange={(e) => setCepValue(e.target.value)}
        className="border-gray-800 w-full hover:outline-0 focus:outline-0 border h-11"
      />


      <br />
      <button onClick={consultarCep}
        className="bg-blue-600 rounded-3xl p-3 text-center font-bold text-white w-full mt-7 hover:cursor-pointer hover:bg-blue-800 transition-all hover:scale-102">
        VER CEP
      </button>

      <div className="mt-7">
        {getA}
      </div>

    </main>
  );
}
