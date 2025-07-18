import { useState, useEffect } from 'react'
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
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const saved = localStorage.getItem('waketabe-participants');
    return saved ? JSON.parse(saved) : [];
  });
  const [dishes, setDishes] = useState<Dish[]>(() => {
    const saved = localStorage.getItem('waketabe-dishes');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentStep, setCurrentStep] = useState<'participants' | 'dishes' | 'result'>(() => {
    const saved = localStorage.getItem('waketabe-currentStep');
    return saved ? JSON.parse(saved) : 'participants';
  });

  const handleBackToDishInput = () => {
    setCurrentStep('dishes');
  };

  const handleBackToParticipantInput = () => {
    setCurrentStep('participants');
  };

  const handleParticipantsComplete = (newParticipants: Participant[]) => {
    setParticipants(newParticipants);
    setCurrentStep('dishes');
  };

  const handleDishesComplete = (newDishes: Dish[]) => {
    setDishes(newDishes);
    setCurrentStep('result');
  };

  // LocalStorageにデータを保存
  useEffect(() => {
    localStorage.setItem('waketabe-participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('waketabe-dishes', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('waketabe-currentStep', JSON.stringify(currentStep));
  }, [currentStep]);





  return (
    <Background>
      <Header />
      {currentStep === 'participants' ? (
        <ParticipantInput onComplete={handleParticipantsComplete} initialParticipants={participants} />
      ) : currentStep === 'dishes' ? (
        <DishInput 
          participants={participants} 
          onComplete={handleDishesComplete}
          onBack={handleBackToParticipantInput}
          initialDishes={dishes}
        />
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
