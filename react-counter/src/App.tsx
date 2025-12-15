import { useState,useEffect,useCallback} from 'react'
import './App.css'
import Counter from './Components/Counter'
import StepValue from './Components/StepValue';



export interface stepValueProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentStep: number;
  setStep: (value: number) => void;
}
export interface counterProps {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  stepValue?: number;
}
const getInitialState = (key: string, defaultValue: string) => 
  localStorage.getItem(key) || defaultValue;

const initialCount = parseInt(localStorage.getItem('count') || '0', 10);
const initialStepValue = parseInt(getInitialState('stepValue', '1'), 10);
const initialHistory = JSON.parse(localStorage.getItem('history') || `[${initialCount}]`);
function App() {

  const [count, setCount] = useState(initialCount);
  const [stepValue, setStepValue] = useState(initialStepValue);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [countHistory, setCountHistory] = useState<number[]>(initialHistory);



  useEffect(() => {

    if (countHistory.length === 0) return; // Prevent saving if history is empty (e.g., initial state check)
  // 1. Trigger the "Saving" message
    const messageSetTimer = setTimeout(() => {
        setSaveMessage("Saving to local host...");
    }, 0);
    // 2. Simulate a delay for saving (e.g., 1 second)
    let clearTimer: number;
    const saveTimeout = setTimeout(() => {
      // 3. After the delay, update the message to "Saved"
      try{
        localStorage.setItem('count', count.toString());
        localStorage.setItem('stepValue', stepValue.toString());
        localStorage.setItem('history', JSON.stringify(countHistory));
           setSaveMessage("Saved!");
      }catch (error) {
        setSaveMessage("Error saving data.");
        console.error("Local Storage Save Error:", error);
      }
        clearTimer = setTimeout(() => {
        setSaveMessage(null);
      }, 2000); // Cleanup timeout on unmount or before next effect
  },500); // Simulated save delay of 500ms
  
    return () =>{
       clearTimeout(saveTimeout);
       clearTimeout(messageSetTimer)
     // Cleanup timeout on unmount or before next effect
     if (clearTimer) {
            clearTimeout(clearTimer);
        }
      };
  } , [count, countHistory, stepValue]); // Trigger effect on count or stepValue change
      
  

  // Use useCallback to memoize these functions, optimizing performance when passed to children
const increment = useCallback(() => {
    setCount(prevCount => {
        const newCount = prevCount + stepValue;
        // Update history synchronously within the same user action
        setCountHistory(prevHistory => {

          // Check if the NEW count is different from the LAST recorded history entry
            const lastEntry = prevHistory[prevHistory.length - 1];
            if (newCount !== lastEntry) {
                return [...prevHistory, newCount];
            }
            return prevHistory; // No change, return existing history
        });
          
        return newCount;
    });
}, [stepValue]); 


const decrement = useCallback(() => {
    setCount(prevCount => {
        const newCount = prevCount - stepValue;
        // Update history synchronously within the same user action
        setCountHistory(prevHistory =>{
          const lastEntry = prevHistory[prevHistory.length - 1];
          if (newCount !== lastEntry) {
            return [...prevHistory, newCount];
          }
          return prevHistory; // No change, return existing history 
        });
        return newCount;
    });
}, [stepValue]); 


const reset = useCallback(() => {
    setCount(0);
    setCountHistory([0]); 
    setStepValue(1);
}, []);


  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStepValue = parseInt(event.target.value, 10);
    setStepValue(isNaN(newStepValue) ? 1 : newStepValue);
  };  

  const setStepValueDirectly = useCallback((value: number) => {
    // Ensure the value is valid (at least 1)
    const newValue = Math.max(1, value);
    setStepValue(newValue);
}, [setStepValue]);

  //This code works perfectly fine but commenting out becuase  while trying to demo keyboard events it interferes with input field focus for step value.

  // Keyboard event handlers for incrementing and decrementing the counter
      useEffect(() => {
          const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        increment(); 
      } else if (event.key === "ArrowDown") {
        decrement(); 
      }
    };
    document.addEventListener('keydown', handleKeyDown);
   return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [increment, decrement]);

  return (
    <div className="App"> 
      <Counter
        count={count}
        increment={increment}
        decrement={decrement}
        reset={reset} />
        
       <StepValue 
         handleChange={handleStepChange} 
          currentStep={stepValue} 
         setStep={setStepValueDirectly} />

        {saveMessage && (
        <p 
          style={{ 
            marginTop: '10px', 
            fontWeight: 'bold',
            color: saveMessage.includes("Saving") ? 'orange' : 'green' 
          }}
        >
          {saveMessage}
        </p>
      )}
       
       <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
        <h3>History Tracking</h3>
        <p>
          Previous counts: 👉{countHistory.join(', ')}👈
        </p>
      </div>
      <p style={{ marginTop: '30px', fontSize: '12px', color: '#888' }}>
        (Use Arrow Up and Arrow Down keys to increment and decrement the counter)
      </p>

    </div>
  )
}

export default App
