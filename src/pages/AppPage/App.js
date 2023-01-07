import { useState, useEffect } from 'react';
import AuthPage from '../AuthPage/AuthPage';
import ExercisePage from '../ExercisePage/ExercisePage';
import NavBar from '../../components/NavBar/NavBar';
import { Routes, Route} from 'react-router-dom'

function App() {
    const [state, setState] = useState(null)
    const [user, setUser ] = useState(null)
  
    const fetchState = async () => {
      try {
        const response = await fetch('/api/test')
        const data = await response.json()
        setState(data)
      } catch (error) {
        console.error(error)
      }
    }
  
    useEffect(() => {
      fetchState()
    }, [])
    
    return (
      <main className="App">
        {
          user ?
          <>
            <ExercisePage />
            <Routes>
              <Route path="/" element={<ExercisePage />} />
              {/* <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage/>} />
              <Route path="/" element={<NewOrderPage />}/> */}
            </Routes>
          </>
           :
          <AuthPage setUser={setUser}/>
        }
      </main>
    );
  }
  
  export default App;