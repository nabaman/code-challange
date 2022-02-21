import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/react-fontawesome';
import AddReview from './AddReview/AddReview';
import PostReview from './AddReview/postReview';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AddReview/>}/>
        <Route path='/post-review' element={<PostReview/>}/>
      </Routes>
    </Router> 
  );
}


export default App;
