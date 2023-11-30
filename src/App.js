import './App.css';
import { useEffect, useState } from 'react';
import Alert from './components/Alert.jsx';
import List from './components/List';

// check for records in localStorage
const getLocalStorageList = () => {
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(list);
  } else {
    return [];
  }
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorageList);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({show:false, msg:'', type:''});

  //remove the alert message in 3 sec
  const removeAlarm = () => {
    const timeout = setTimeout( ()=> {
      setAlert({show:false, msg:'', type: ''});
    }, 3000);

    //cleaning up
    return () => clearTimeout(timeout);
  }
  
  // remove specific item on click 
  const removeItem = (id) => {
    setAlert({show:true, msg:"Item removed from the list!", type:'success'});
    setList(list.filter(item => item.id != id));

    removeAlarm();
  }

  //edit specific item info
  const editItem = (id) => {
    const currentItem = list.find( item => item.id == id);
    setName(currentItem.title);
    setIsEditing(true);
    setEditId(id);
  }

  // handleSubmit click event
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name){
      // display message on empty value adding
      setAlert({show:true, msg:"Can't add empty value to the list!", type:'danger'});
      removeAlarm();
      
    } else if(name && isEditing) {
        // find item in list, change its title, and save the list
        setList(list.map((item) => {
          if(item.id == editId){
            return {...item, title: name}
          }
          return item;
        }));
        
        setAlert({show:true, msg:"Item was successfully edited", type:'success'});
        setName('');
        setEditId('');
        setIsEditing(false);
        removeAlarm();
    } else {
      // handle new item adding
      const newItem = {
        id: new Date().getTime().toString(),
        title: name,
      };

      setAlert({show:true, msg:'New item added to the list!', type:'success'});
      setList([...list, newItem]);
      setName('');

      removeAlarm();
    }
  }

  // empty the list on click
  const clearList = () => {
    setAlert({show:true, msg: 'All items are removed from the list!', type:'success'});
    setList([]);

    removeAlarm();
  }
  // save list to the localStorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  },[list]);

  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert}/>}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input type="text" placeholder='enter items..' className='grocery' value={name} 
            onChange={(e) => setName(e.target.value)}>
          </input>
          <button type='submit' className='submit-btn'>{isEditing ? 'Edit' : 'Submit'}</button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} removeItem={removeItem} editItem={editItem}/>
          <button type='submit' className='clear-btn' onClick={clearList}>Remove items</button>
        </div>
      )}
    </section>
  );
}

export default App;
