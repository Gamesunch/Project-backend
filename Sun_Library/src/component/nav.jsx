import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Button from '@mui/material/Button';
import Modal from './model';

const options = ['The Godfather', 'Pulp Fiction'];
const top100books = [
  { tags: 'Horror' },
  { tags: 'Fantasy' },
  { tags: 'Sci-fi' }]

function nav() {
  const [showModal, setShowModal] = React.useState(false);
  
  return (
    <>
      <nav className='w-full flex justify-around p-5 pl-10 pr-10 items-center'>
        <div className = 'flex w-full'>
          <Autocomplete className='mr-5'
            disablePortal
            id="combo-box-demo"
            options={options}
            sx={{ width: '25%' }}
            renderInput={(params) => <TextField {...params} label="Books" />}
          />
          <Autocomplete
            disablePortal
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={top100books}
            getOptionLabel={(top100books) => top100books.tags}
            renderInput={(params) => (<TextField {...params} label="Search Tags" placeholder="tags" />)}
            sx={{ width: '25%' }}
          />
        </div>
        
        <Button
          variant="outlined"
          startIcon={<AddCircleIcon />}
          className='h-10 bg-white' 
          onClick={() => setShowModal(true)}
        >
          Book
        </Button>
      </nav>
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default nav