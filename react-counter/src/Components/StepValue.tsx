import type { stepValueProps } from '../App'

export default function StepValue({ handleChange, currentStep }: stepValueProps) {
  return (
    <div>
     <div style={{ margin: '15px 0' }}>
      <label htmlFor="step-input" style={{ marginRight: '10px' }}>
        Step Value:
      </label>
      <input
        id="step-input"
        type="number"
        min="1" // Prevents users from inputting steps less than 1
        // This makes it a controlled component, displaying the state value
        value={currentStep} 
        onChange={handleChange}
        style={{ padding: '5px', width: '60px', textAlign: 'center' }}
      />
    </div>

    </div>
  )
}
