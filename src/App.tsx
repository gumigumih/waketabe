import { useState } from 'react'
import { InputForm } from './components/organisms/InputForm'
import { ResultScreen } from './components/templates/ResultScreen'
import { Header } from './components/templates/Header'
import { Footer } from './components/templates/Footer'
import { Background } from './components/templates/Background'
import { ParticipantInput } from './components/organisms/ParticipantInput'
import { DishInput } from './components/organisms/DishInput'

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
  const [showResult, setShowResult] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);

  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleBack = () => {
    setShowResult(false);
  };

  // 参加者登録が終わっていなければParticipantInputを表示
  if (participants.length === 0) {
    return (
      <Background>
        <Header />
        <ParticipantInput onComplete={setParticipants} />
        <Footer />
      </Background>
    );
  }

  // 料理入力が終わっていなければDishInputを表示
  if (dishes.length === 0) {
    return (
      <Background>
        <Header />
        <DishInput participants={participants} onComplete={setDishes} />
        <Footer />
      </Background>
    );
  }

  return (
    <Background>
      <Header />
      {showResult ? (
        <ResultScreen
          onBack={handleBack}
        />
      ) : (
        // 今後ここを計算結果画面などに差し替え予定
        <InputForm
          onShowResult={handleShowResult}
        />
      )}
      <Footer />
    </Background>
  )
}

export default App
