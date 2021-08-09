import { useState } from 'react';

function useInput(initialState) {
  const [value, setValue] = useState(initialState);

  return {
    value,
    onChange: (e) => {
      setValue(e.target.value)
    }
  }
}

export default useInput;