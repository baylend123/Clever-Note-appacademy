import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addNoteBook } from '../../store/notebook.js';
import './NewNoteBook.css'
const NewNoteBookForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteBook = {
      title,
    };
    dispatch(addNoteBook(noteBook));

    let modal = document.getElementById('modal-background')
    modal.click()
  };

  return (
    <div className='new-notebook-div'>
     <div className='modal-new-notebook-text'>Create New Notebook</div>
     <div className='notebook-blurb'>Notebooks are useful for grouping notes around a common topic. They can be private or shared.</div>
     <div className='new-notebook-header'>Name</div>
     <input
     className='new-notebook-input'
     placeholder='Notebook Name'
      onChange={(e) => setTitle(e.target.value)}
      value={title}
     ></input>
     <div className='new-notebook-spacer'>

     </div>
     <div className='new-notebook-submit-area'>
      <div 
      onClick={() =>{
        let modal = document.getElementById('modal-background')
        modal.click()
      }}
      className='cancel-button'>Cancel</div>
      <div 
      onClick={handleSubmit}
      className='continue-button'>Continue</div>
     </div>
    </div>
  );
};

export default NewNoteBookForm;
