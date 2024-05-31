
import { useEffect } from 'react';
import {useCallback, useState ,useRef} from 'react'



function App() {
  const [length,setlength]=useState(8);
  const [numAllowed,setnumAllowed]=useState(true);
  const[charAllowed,setcharAllowed]=useState(true);
  const[password,setPassword]=useState("");


  // useRef hook
  const passwordRef=useRef(null)  
  
  
  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRTSUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numAllowed) str+="0123456789"
    if(charAllowed) str+="@#$!%^&*()_+=-?/|\:;"
    
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);  // index will be the o/p by here,
      
      pass += str.charAt(char);  // having the value of the resulted index
    }
    
    
    setPassword(pass)  // pass the pass's value to the setPassword,
    
    
  },[length,numAllowed,charAllowed,setPassword])      //useCallback is a React Hook that lets you cache(memoize) a function definition between re-renders.and thats the what we exactly wnat in our project as we want ki kuch aisa ho ki jo hme password generate krne m madad kre ,and pehle se ho usme change kare basically,right 
  //const cachedFn = useCallback(fn, dependencies)
  // here our fn is known
  // dependencies are length,...... bcoz they depends,

 

  useEffect(()=>{
    passwordGenerator()
  },[length,charAllowed,numAllowed,passwordGenerator,passwordGenerator])


  const copyPassToClipboard=useCallback(()=>{
    passwordRef.current?.select()   //optionally selecting the current values bcoz it may be 0 also
    passwordRef.current?.setSelectionRange(0,9)  // selection will be ranged into 0 to 9
    window.navigator.clipboard.writeText(password)
  },[password])

 



  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-8 py-5 my-8 text-orange-500 bg-gray-800 ">
        <h1 className="text-white text-center my-3 ">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 ">
          <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button 
          onClick={copyPassToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-point'
            onChange={(e)=>{setlength(e.target.value)}}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={numAllowed}
            id='NumInput'
            onChange={()=>{
              setnumAllowed((prev)=> !prev)
            }}            
            />
            <label htmlFor="NumInput">Numbers</label>

            </div>
          <div className="flex items-center gap-x-1">
            <input 
            type="checkbox"
            defaultChecked={charAllowed}
            id='charInput'
            onChange={()=>{
              setcharAllowed((prev)=> !prev)  // true false ho jaega false true ho jaega
            }}            
            />
            <label htmlFor="charInput">Characters</label>

            </div>
          
        </div>
      </div>

    </>
  )
}

export default App
