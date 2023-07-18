import { useState } from 'react';
import './App.css'
import * as Icons from 'iconsax-react';
import { useEffect } from 'react';

function App() {
  const iconKeys = Object.keys(Icons);
  const [inputState, setInputState] = useState()
  const [filteredList, setFilteredList] = useState(iconKeys)
  const label = document.getElementById('iconLabel')

  const handleChange = (e) => {
    setInputState(e.target.value)
  }

  useEffect(() => {
    const filteredIcons = iconKeys.filter((icon) => icon.includes(`${inputState}`));
    setFilteredList(filteredIcons);
  }, [inputState]);

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(`<${e} />`)
      .then(() => {
        console.log('Text copied to clipboard', `<${e} />`);
      })
      .catch((error) => {
        console.error('Failed to copy text to clipboard:', error);
      });
  }

  return (
    <div>
      <h4 style={{ position: 'absolute', left: '3rem', top: '1rem' }}>Vuesax icon finder v1</h4>
      <div style={{
        position: 'fixed',
        top: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'fit-content',
        backgroundColor: 'white',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        zIndex: '1001'
      }}>
        <input type="text" placeholder='Search icon' onChange={handleChange}
          style={
            {
              marginTop: '1rem',
              padding: '1rem',
              zIndex: '1001',
              borderRadius: '100px'
            }
          } />
      </div>

      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: '5rem' }}>
        {filteredList.map((iconKey) => {
          const IconComponent = Icons[iconKey];
          return <div className='iconComp'>
            <IconComponent key={iconKey} />
            <span id='iconLabel' onClick={() => copyToClipboard(iconKey)}>{iconKey}</span>
          </div>
        })}
      </div >
    </div>

  );
}

export default App



