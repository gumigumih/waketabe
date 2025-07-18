import { useState } from 'react'
import { Header } from './components/templates/Header'
import { Footer } from './components/templates/Footer'
import { Background } from './components/templates/Background'
import { ParticipantInput } from './components/organisms/ParticipantInput'
import { DishInput } from './components/organisms/DishInput'
import { CalculationResultScreen } from './components/organisms/CalculationResult'

interface Participant {
  id: string;
  name: string;
}

interface Dish {
  id: string;
  name: string;
  price: string;
  eaters: string[];
}

export const App = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);

  const handleBackToDishInput = () => {
    setDishes([]);
  };





  return (
    <Background>
      <Header />
      {participants.length === 0 ? (
        <ParticipantInput onComplete={setParticipants} />
      ) : dishes.length === 0 ? (
        <DishInput participants={participants} onComplete={setDishes} />
      ) : (
        <CalculationResultScreen
          participants={participants}
          dishes={dishes}
          onBack={handleBackToDishInput}
        />
      )}
      <Footer />
    </Background>
  )
}

export default App
