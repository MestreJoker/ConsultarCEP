'use client'
import Image from "next/image";
import { use, useState } from "react";
export default function Home() {
  const [getCepValue, setCepValue] = useState('')
  const [informacoesCep, setInformacoesCep] = useState<React.ReactNode>()

  interface CepProps {
    address: string
    city: string
    state: string
    district: string
  }

  async function consultarCep() {
    try {
      const response = await fetch(`https://cep.awesomeapi.com.br/json/${getCepValue}`)
      const dados: CepProps = await response.json()
      console.log(dados)


      if (!response.ok) {
        setInformacoesCep(
          <p className="text-center text-lg text-red-500">CEP não encontrado</p>
        )
      }
      else {
        setInformacoesCep(
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
      setInformacoesCep(
        <div>
          Erro: {`${erro}`}
        </div>
      )
    }
  }
  return (
    <div id="background" className="bg-[url('https://media.istockphoto.com/id/1628010210/photo/empty-streets-and-sidewalks-of-soho-are-eerily-quiet-during-the-2020-coronavirus-pandemic.jpg?s=612x612&w=0&k=20&c=U-ErR7AfusWWLr-BZOxZlGWaeki4Bx3jNNc2EN2xSz8=')] bg-cover w-screen h-screen relative">
      <div className="absolute bg-blue-400/80 w-full h-full flex flex-col items-center justify-center gap-6">
        <main className="h-auto w-139 max-w-[90%] rounded-3xl p-7 bg-white shadow-md">
          <h1 className="font-bold text-2xl text-center">Consultar CEP</h1>
          <br />

          <label htmlFor="inputCep" className="text-sm font-bold">CEP</label>
          <input id="inputCep" type="text" inputMode="numeric" value={getCepValue} placeholder="99999-999"
            onChange={(e) => setCepValue(e.target.value)}
            className="border-gray-800 w-full hover:outline-0 focus:outline-0 border h-11 rounded-xl p-2"
          />


          <br />
          <button onClick={consultarCep}
            className="bg-blue-400 rounded-3xl p-3 text-center font-bold text-white w-full mt-7 hover:cursor-pointer hover:bg-blue-500 transition-all hover:scale-102">
            VER CEP
          </button>
        </main>

        <div className="bg-white rounded-3xl w-139 h-40 p-7 flex flex-col justify-center">
            {informacoesCep  ? (informacoesCep) : (
              <p className="text-lg text-center">
                Informe um CEP para ver suas informações
              </p>)}
        </div>
      </div>
    </div>

  );
}
