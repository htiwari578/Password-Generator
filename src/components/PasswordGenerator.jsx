import React , {useState, useEffect} from 'react';
import './PasswordGenerator.css';
import copyIcon from '../assets/copy.svg';
import { ToastContainer, toast } from 'react-toastify';



const lowerCaseList = 'abcdefghijklmnopqrstuvwxyz';
const upperCaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList ='0123456789';
const symbolsList='!@#$%&*()?';



function PasswordGenerator() {
    const [password , setPassword] = useState('');
    const [lowerCase , setLowerCase] = useState(true);
    const [upperCase , setUpperCase] = useState(true);
    const [numbers , setNumbers] = useState(true);
    const [symbols , setSymbols] = useState(true);
    const [passwordLength , setPasswordLength] = useState(8);

    useEffect(()=> {
        generatePassword();
    },[passwordLength]);


    const generatePassword = ()=> {
        let characterList = '';

        if(lowerCase){
            characterList += lowerCaseList;
        }
        if(upperCase){
            characterList += upperCaseList;
        }
        if(numbers){
            characterList += numbersList;
        }
        if(symbols){
            characterList += symbolsList;
        }
        let tempPassword = '';
        const characterListLength = characterList.length;

        for(let i=0;i<passwordLength; i++){
            const characterIndex = Math.floor(Math.random() * characterListLength);
            tempPassword += characterList.charAt(characterIndex);
        }
        setPassword(tempPassword);

    }
    const copyPassword = async () => {
        const copiedText = await navigator.clipboard.readText();
        if(password.length){
            navigator.clipboard.writeText(password);
            toast.success('Password copied to clipboard!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
    }
}

  return (
    <>
    <div className ="container">
        <h2 className="title">Password Generator</h2>    
        <div className="password-wrapper">
            <div className="password-area">
                <div className="password">
                    <input type="text"  class="password" placeholder="Generate password" value={password} readOnly />
                    <img src={copyIcon} alt="copyicon" className="copyIcon" onClick={copyPassword} /> 
                </div>  
                </div>    
        </div>
        <div className="setting">
            <h3>Customize your password</h3>
            <div className="checkbox">
                <div className="left">
                    <div className="checkbox-field">
                        <input type="checkbox" name="lower" id="lower" checked={lowerCase} onChange={()=>setLowerCase(!lowerCase)} />
                        <label htmlFor="lower">Include LowerCase(a-z)</label>
                    </div>
                    <div className="checkbox-field">
                        <input type="checkbox" name="upper" id="upper" checked={upperCase} onChange={()=>setUpperCase(!upperCase)} />
                        <label htmlFor="lower">Include UpperCase(A-Z)</label>
                    </div>
                </div>
                <div className="right">
                <div className="checkbox-field">
                        <input type="checkbox" name="numbers" id="numbers" checked={numbers} onChange={()=>setNumbers(!numbers)} />
                        <label htmlFor="numbers">Include Number(0-9)</label>
                    </div>
                    <div className="checkbox-field">
                        <input type="checkbox" name="sumbols" id="symbols" checked={symbols} onChange={()=>setSymbols(!symbols)} />
                        <label htmlFor="symbols">Include Symbol(&-#)</label>
                    </div>

                </div>
            </div>
        </div>
        <div className="password-length">
            <h3>Password Length</h3>
            <div className="slider">
                <p className="rangeValue">
                   {passwordLength}
                </p>
                <div className="range">
                    <input type="range" min={8} max={15} defaultValue={passwordLength} onChange={(e)=> setPasswordLength(e.currentTarget.value)}/>
                </div>
            </div>
        </div>
        <div className ="buttons">
            {/* <button type="button" onClick ={copyPassword}>Copy Password</button> */}
            <button type="button" onClick={generatePassword}>Generate Password</button>
        </div>
        <ToastContainer/>
  
    </div>
    </>
  )
    
}

export default PasswordGenerator;
