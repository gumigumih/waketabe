import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
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

const AppRoutes = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [restoring, setRestoring] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // クエリパラメータからデータ復元
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dataParam = params.get('data');
    if (dataParam) {
      setRestoring(true);
      try {
        const decoded = decodeURIComponent(atob(dataParam));
        const parsed = JSON.parse(decoded);
        if (parsed.participants && Array.isArray(parsed.participants)) {
          setParticipants(parsed.participants);
        }
        if (parsed.dishes && Array.isArray(parsed.dishes)) {
          setDishes(parsed.dishes);
        }
      } catch {
        // 無効なデータの場合は何もしない
      }
      setTimeout(() => setRestoring(false), 0); // 次のtickで解除
    }
  }, [location.search]);

  // 参加者入力完了→料理入力へ
  const handleParticipantsComplete = (newParticipants: Participant[]) => {
    setParticipants(newParticipants);
    navigate('/dishes');
  };

  // 料理入力完了→結果画面へ
  const handleDishesComplete = (newDishes: Dish[]) => {
    setDishes(newDishes);
    navigate('/result');
  };

  // 戻る（料理→参加者）
  const handleBackToParticipantInput = () => {
    navigate('/participants');
  };

  // 戻る（結果→料理）
  const handleBackToDishInput = () => {
    navigate('/dishes');
  };

  return (
    <Background>
      <Header />
      {restoring ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-lg text-gray-600">データ復元中...</div>
      ) : (
        <Routes>
          <Route path="/participants" element={
            <ParticipantInput onComplete={handleParticipantsComplete} initialParticipants={participants} />
          } />
          <Route path="/dishes" element={
            participants.length === 0 && !location.search.includes('data=') ? <Navigate to="/participants" /> :
            <DishInput 
              participants={participants} 
              onComplete={handleDishesComplete}
              onBack={handleBackToParticipantInput}
              initialDishes={dishes}
            />
          } />
          <Route path="/result" element={
            (participants.length === 0 || dishes.length === 0) && !location.search.includes('data=') ? <Navigate to="/participants" /> :
            <CalculationResultScreen
              participants={participants}
              dishes={dishes}
              onBack={handleBackToDishInput}
            />
          } />
          <Route path="*" element={<Navigate to="/participants" />} />
        </Routes>
      )}
      <Footer />
    </Background>
  );
};

export const App = () => (
  <HashRouter>
    <AppRoutes />
  </HashRouter>
);

export default App; 
