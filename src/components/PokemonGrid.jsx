import React, { useState, useEffect } from 'react'
import axios from 'axios'



export default function PokemonGrid(props) {
    const {handleSelectPokemon} = props
    
    const [search, setSearch] = useState('')
    const [pokeData,setPokeData]=useState([])
    const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
    const [nextUrl,setNextUrl]=useState()
    const [prevUrl,setPrevUrl]=useState()
    const [pokeDex,setPokeDex]=useState()

    async function pokeFun() {
        const res=await axios.get(url)
        setNextUrl(res.data.next)
        setPrevUrl(res.data.previous)
        getPokemon(res.data.results)
    }
    async function getPokemon(res) {
       res.map(async (item) => {
          const result = await axios.get(item.url)
          setPokeData(state => {
              state = [...state,result.data]
              state.sort((a, b) => a.id > b.id ? 1 : -1)
              return state;
          })
       })   
    }
    useEffect(()=>{
        pokeFun();
    },[url])


    return (
        <div className='flex flex-col gap-8 max-w-[1400px] w-full mx-auto my-0'>
            <div className='flex justify-center'>
                <img className='h-[300px] w-[1000px] bg-contain' src='https://www.freepnglogos.com/uploads/pokemon-logo-transparent-png-2.png'/>
            </div>
            
            <div className='bg-gradient-to-r  from-indigo-300/55 via-purple-500/65 to-pink-400/75  p-3 flex flex-col gap-10 align-middle items-center rounded-xl'>
                <input className='bg-gradient-to-r from-[#f3ea96e3] via-[#f7d169ed] via-[#f3dd5fe7] to-[#f1e428eb] sticky top-1 z-10 mb-[50px]  border-[3px] rounded-xl outline-none focus:outline-none focus:ring focus:ring-yellow-500 focus:border-none w-full pl-2 h-[40px]' placeholder='Search' value={search} onChange={(e) => {
                    setSearch(e.target.value)
                    }}></input>
                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-9 z-0'>
                    {pokeData.filter(val => {
                    return val.name.includes(search)
                    }).map((pokemon, pokemonIndex) => {
                        const type = pokemon.types[0].type.name
                        const typeButton = pokemon.types[1] ? pokemon.types[1].type.name : false
                       
                        return (
                            <div onClick={handleSelectPokemon(pokemon.name)} className={`thumb-container ${type} relative w-[230px] z-0 h-[300px] sm:w-[300px] pb-1 hover:pl-[30px] border border-none mb-[50px] hover:shadow-2xl hover:shadow-black duration-500`} key={pokemonIndex}>
                                <div className='absolute bottom-[220px]'>
                                    <img className='bg-contain w-[150px] h-[150px] ' src={pokemon.sprites.other.showdown.front_default} />
                                </div>
                                <div className='absolute top-[150px]'>
                                    <p className=' text-white  first-letter:uppercase text-3xl'>{pokemon.name}</p>
                                </div>
                                <div className='absolute top-[200px] '>
                                    <p className='font-semibold text-gray-500/50'>#0{pokemon.id}</p>
                                </div>
                                <div className='absolute top-[230px] flex fle-col'>
                                    <p className={`${type} p-1 pl-2 pr-2 mr-2 text-lg first-letter:uppercase rounded-xl`}>{pokemon.types[0].type.name}</p>
                                    {pokemon.types[1] ? <p className={`${typeButton} bg-[#97d34a] p-1 pl-2 pr-2 text-lg first-letter:uppercase  rounded-lg`}>{pokemon.types[1].type.name}</p> : <p></p>} 
                                </div>
                            </div>
                        )
                    })}
                </div>
                
            </div>
            <div className='flex justify-center'>
                <button onClick={() => {
                setUrl(nextUrl)
                }} className='bg-white p-2 w-[500px]  border-[3px] rounded-xl font-semibold border-solid border-yellow-400 yellowShadow duration-200 '>Load More Pokemons</button>
            </div>
            
        </div>
    )
}

