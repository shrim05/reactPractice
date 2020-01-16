import React, { useState } from 'react';
import Info from './Info';
import Counter from './Counter';
import Average from './Average';


const App = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Info/>
      <Average />
      <button onClick={()=>{
        setVisible(!visible);
      }}
      >{visible ? '숨기기':'보이기'}
      </button>
      <hr />
      {visible && <Counter />}
    </div>
  );
}
export default App;
