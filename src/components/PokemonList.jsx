import React, {use} from 'react'


async function fetchData(url) {
  const res = await fetch(url)
  return res.json()
}

export default function PokemonList(props) {
    const {selectedPokemon, clearHandler, pokemonUrl} = props
  

    const data = use(fetchData(pokemonUrl))
    

    return (
      <div className={`flex flex-col gap-[4px] w-full max-w-[700px] mx-auto my-0 ${data.types[0].type.name} rounded-xl p-10`}>
          <div className='flex items-center justify-between align-middle gap-2 mb-5'>
            <h1 className='uppercase text-black font-semibold text-3xl sm:text-6xl '>
              {selectedPokemon}
            </h1>
            <div className='cursor-pointer bg-black text-white p-3 text-2xl rounded-full hover:bg-red-400 duration-200' onClick={clearHandler}>X</div>
          </div>
          
          <img src={data.sprites.other.dream_world.front_default} />
          
          <h2 className='text-black text-center text-4xl mb-5'>Stats</h2>
          <div className='flex items-center justify-between align-middle  gap-2 sm:gap-4'>
            {data.stats.map((stat, statIndex) =>{
              return (
                <div key={statIndex}>
                    <p className='text-[rgb(255,255,255)] uppercase text-[10px] break-words  sm:text-lg'><b className='text-black'>{stat.stat.name}</b>  {stat.base_stat}</p>
                </div>
              )
            })}
          </div>

          <h3 className='text-black text-center text-4xl mb-5 mt-5'>Types</h3>
          {data.types.map((type, typeIndex) =>{
            return (
              <div key={typeIndex}>
                  <p className='text-black uppercase'><b>{type.type.name}</b></p>
              </div>
            )
          })}

          <h3 className='text-black text-center text-4xl mb-5 mt-5'>Abilities</h3>
          <p className='text-black uppercase font-semibold'>{data.abilities[0].ability.name}</p>
          <p className='text-black uppercase font-semibold'>{data.abilities[1] ? data.abilities[1].ability.name : <p></p>}</p>
          
      </div>
    )
}
