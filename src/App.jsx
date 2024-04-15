import { useState, Suspense,} from 'react'
import PokemonList from './components/PokemonList'
import ErrorBoundary from './components/ErrorBoundary'
import PokemonGrid from './components/PokemonGrid'


function App() {
  
  const [selectedPokemon, setSelectedPokemon] = useState(null)
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
  
  
  const pokemonUrl = url + selectedPokemon

  function handleSelectPokemon(pokemon) {
      return () => {
        setSelectedPokemon(pokemon)
        
      }
  }

 


  return (
    <ErrorBoundary fallback={<div className='flex flex-col justify-between align-middle items-center  text-white rounded-xl text-6xl max-w-[400px] w-full p-3  bg-error-loading'><div className='max-w-[400px] w-full mx-auto'>Error...</div></div>}>
      <Suspense fallback={<div className='flex flex-col justify-between align-middle items-center  text-white rounded-xl text-6xl max-w-[400px] w-full p-3  bg-error-loading'><div className='max-w-[400px] w-full mx-auto'>Loading...</div></div>}>
        <div>
          {selectedPokemon 
          ? (<PokemonList selectedPokemon={selectedPokemon} clearHandler={() => setSelectedPokemon(null)} parentUrl={url} pokemonUrl={pokemonUrl} />)
          : ( <PokemonGrid handleSelectPokemon={handleSelectPokemon} />
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
