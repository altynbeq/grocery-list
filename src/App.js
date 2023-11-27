import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Alert from './components/Alert.jsx';
import List from './components/List';

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show:false, msg:'', type:''});

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name){
    } else if(name && isEditing){
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      }
      setList([...list, newItem]);
      setName('');
    }

  }
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input type="text" placeholder='add items..' className='grocery' value={name} 
            onChange={(e) => setName(e.target.value)}>
          </input>
          <button type='submit' className='submit-btn'>{isEditing ? 'Submit' : 'Edit'}</button>
        </div>
      </form>
      <div className='grocery-container'>
        <List items={list}/>
      <button type='submit' className='clear-btn'>Remove items</button>
      </div>
    </section>
  );
}

export default App;
