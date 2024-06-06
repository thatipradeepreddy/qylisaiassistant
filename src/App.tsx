import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const data = useSelector((state:any) => state.USER);
  console.log(data,"data");
  

  return (
    <div className="App">
    Hello
    </div>
  );
}

export default App;
