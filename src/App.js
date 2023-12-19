import logo from './logo.svg';
import './App.css';
import {Button} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import url from './audio.wav';

function App() {
  const [hours,setHours] = useState(0);
  const [minutes,setMinutes] = useState(0);
  const [seconds,setSeconds] = useState(0);
  const [flag,setFlag] = useState(false);
  const [playing,setPlaying] = useState(false);
  const [audio] = useState(new Audio(url));
  const [isSnooze,setIsSnooze] = useState(false);
  const [snoozeCount, setSnoozeCount] = useState(11);
  const [snooze,setSnooze] = useState(false);
  const [isStart,setIsStart] = useState(false);
  

  useEffect(()=>{
    if(flag){
  setTimeout(() => {
    if(hours == 0 && minutes == 0 && seconds == 0){ 
      setIsSnooze(true);
      setSnooze(true);
      setPlaying(true);
      setFlag(false);
      return;
    }
    if(seconds - 1 < 0){
      setSeconds(59);
      if(minutes - 1 < 0){
        setMinutes(59);
        if(hours > 0) setHours(hours - 1);
      } 
      else setMinutes(minutes - 1);
    }
    else setSeconds(seconds - 1);
  }, 1000);
}
  },[seconds])

  useEffect(()=>{
     playing == true ? audio.play() : audio.pause();
  },[playing])

  useEffect(()=>{
    if(snoozeCount == 0){
      setSnoozeCount(11);
      setSnooze(false);
      return;
    }
     if(isSnooze && snooze){
      setTimeout(() => {
       setSnoozeCount(snoozeCount-1);
      }, 1000);
     }
  },[snoozeCount])


  //handles  states updates
  const handleChange = (e,setState) => {
     if(e.target.value > 59){
      let val = 60 - (e.target.value);
      setState(val);
    }else setState(e.target.value);
  }

  //on start function
  const onStart = (minutes,seconds,hours) => {
    if(hours == 0 && seconds == 0 && minutes == 0) return;
   
    if(seconds < 0) setSeconds(0);
    if(minutes < 0) setMinutes(0);
    if(hours < 0) setHours(0);
    
    if(seconds > 0) setSeconds(seconds - 1);
    if(hours > 0) {
      if(minutes > 0 && seconds == 0){
      setSeconds(59);
      setMinutes(minutes - 1);
      }
      else if(minutes == 0 && seconds == 0){
        setHours(hours-1);
        setSeconds(59);
        setMinutes(59);
       }
    }else if(minutes > 0 && seconds == 0){
        setSeconds(59);
        setMinutes(minutes - 1);
       }
    setFlag(true);
    setIsStart(true);
  }

  //reset
  const reset = () => {
    setFlag(false);
    setIsStart(false);
    setTimeout(() => {
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    }, 1000);
    setSnooze(false);
    setIsSnooze(false);
    setPlaying(false);
  }

  //pause or resume
  const pauseOrResume = (flag,hours,minutes,seconds,isStart) => {
    if(hours == 0 && seconds == 0 && minutes == 0) return;
    if(!isStart) return;
    if(flag){
      setFlag(false);
    }else{
      setFlag(true);
      seconds > 0 ? setSeconds(seconds - 1) : setSeconds(59);
    }
  
  }

  const playFunc = (sound) => {
     if(sound == 'pause') {
      setPlaying(false); 
      setIsSnooze(false);
      setIsStart(false);
     }
     if(sound == 'snooze'){
        setPlaying(false);
        setSnooze(true);
        setSnoozeCount(snoozeCount-1);
         setTimeout(() => {
            setPlaying(true);
         }, 10000);
     }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 style={{fontSize:"6rem",marginBottom:"3rem",fontWeight:"bold",color:"#ce8218"}}>Stopwatch</h2>
        <div className='stopwatch-div'>
        <h2 style={{fontSize:"4rem",color:"#abc295"}}>{hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h2>
        </div>
      <div style={{display:"flex",alignItems:"center"}}>
            <input type="number" style={{width:"60px",borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",margin:"0 0.4rem"}} value={hours} onChange={e=>handleChange(e,setHours)} />
            <input type="number" style={{width:"60px",borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",margin:"0 0.4rem"}} value={minutes} onChange={e=>handleChange(e,setMinutes)} />
            <input type="number" style={{width:"60px",borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",margin:"0 0.4rem"}} value={seconds} onChange={e=>handleChange(e,setSeconds)} />
            <Button type="button" variant="primary" size="lg"  style={{borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",margin:"0 0.4rem"}} onClick={()=>onStart(minutes,seconds,hours)}>Start</Button>
            <Button type="button" variant="secondary" size="lg" style={{borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",margin:"0 0.4rem"}} onClick={()=>pauseOrResume(flag,hours,minutes,seconds,isStart)}>Pause / Resume</Button>
            <Button type="button" variant="danger" size="lg" style={{borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",margin:"0 0.4rem"}} onClick={()=>reset()}>Reset</Button>
           { playing ?
            <Button type="button" variant="danger" size="lg" style={{borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",margin:"0 0.4rem"}} onClick={()=>playFunc('pause')}>Stop</Button>
            : null
           }
           { isSnooze ?
            <Button type="button" variant="warning" size="lg" style={{borderRadius: "0.4rem 0.4rem 0.4rem 0.4rem",margin:"0 0.4rem"}} onClick={()=>playFunc('snooze')}>{snoozeCount == 0 ? 'Snooze' : snoozeCount == 11 ? 'Snooze' : `Snooze : ${snoozeCount}`}</Button>
           : null
          }
            </div>
          
      </header>
    </div>
  );
}

export default App;
