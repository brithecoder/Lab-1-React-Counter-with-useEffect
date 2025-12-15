import type { stepValueProps } from '../App'

export default function StepValue({ handleChange, currentStep, setStep }: stepValueProps) {
  


    const handleButtonClick = (adjustment: number) => {
        setStep(currentStep + adjustment);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault(); 
        }
    };
  
  
  
    return (
        <div style={{ margin: '15px 0' }}>
            <label htmlFor="step-input" style={{ marginRight: '10px' }}>
                Step Value:
            </label>

            <button onClick={() => handleButtonClick(-1)} style={{ marginRight: '5px' }}>
                -
            </button>

            <input
                id="step-input"
                type="number"
                min="1" 
                value={currentStep} 
                onChange={handleChange}
                onKeyDown={handleInputKeyDown} // Still useful to stop keyboard steps
                style={{ padding: '5px', width: '60px', textAlign: 'center' }}
            />

          
            <button onClick={() => handleButtonClick(1)} style={{ marginLeft: '5px' }}>
                +
            </button>
        </div>
  )
}
