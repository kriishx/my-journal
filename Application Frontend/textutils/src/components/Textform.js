import {useEffect, useState} from 'react'
import axiosInstance from '../api/axiosInstance';
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Textform(props) {

    const [entry, setEntry] = useState({title:"", content:""});
    const[message, setMessage] = useState("");
    const[data,setData] = useState("");

    const handleUpClick = ()=>{
        let newText = entry.content.toUpperCase();
        let newTitle = entry.title.toUpperCase();
        setEntry({title:newTitle, content:newText });
    }

    const handleLoClick = ()=>{
        let newText = entry.content.toLowerCase();
        let newTitle = entry.title.toLowerCase();
        setEntry({title:newTitle, content:newText });
    }


    const handleChange = (e)=>{
        setEntry({...entry, [e.target.name]:e.target.value});
    }

    const speak = ()=>{
        let msg = new SpeechSynthesisUtterance();
        msg.text = "Title" + entry.title + "Content" + entry.content;
        window.speechSynthesis.speak(msg);

    }

    const handleSubmit = async (e)=>{

        e.preventDefault();
        console.log("Button Clicked");
        try {
            await axiosInstance.post('/journal',entry);
            setEntry({title:"",content:""});
            toast.success(" Entry Added successfully!");
        }catch(error){
            console.error("Error saving journal entry");
            setMessage("Failed to save Journal Entry");
            toast.error("Failed to delete entry. Please try again.");
        }

    }

        const navigate = useNavigate();
    

    useEffect(()=>{
        axiosInstance.get('journal')
            .then(res=>setData(res.data.username))
            .catch(err=> console.error(err));

    },[])

    return (
        <>
        <div className='container my-4' style={{color: props.mode ==='dark'?'white':'black'}}>
            <h1 className='my-2'> {props.title}</h1>
            <div className="mb-1">
                {/* <input type="text" name='title' className={`container ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} value={entry.title} style={{backgroundColor: props.mode==="light"?"white":"#2b2b40"}} onChange={handleChange} placeholder='Enter Title' /> */}
                <input type="text" name='title' className={`container ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} value={entry.title} style={{backgroundColor: props.mode==="light"?"white":"#2b2b40", color: props.mode ==='dark'?'white':'black'}} onChange={handleChange} placeholder='Enter Title' />

            </div>
        </div>
        <div className='container' style={{color: props.mode ==='dark'?'white':'black'}}>
            <h1 className='my-2 '>{props.content}</h1>
            <div className="mb-2">
                <textarea name='content' className={`form-control ${props.mode === "dark"?"dark-placeholder": "light-placeholder"} mb-2`} value={entry.content} onChange={handleChange} style={{backgroundColor: props.mode==="light"?"white":"#2b2b40", color: props.mode ==='dark'?'white':'black'}} id="myBox" rows="3" placeholder='Enter your content'></textarea>
                <button disabled = {entry.content.length + entry.title.length ===0} className={`btn mx-2 my-2`} style={{backgroundColor: '#7a23b5'}} onClick={handleUpClick}>Convert to upper case</button>
                <button disabled = {entry.content.length + entry.title.length ===0} className={`btn mx-2 my-1`} style={{backgroundColor: '#7a23b5'}} onClick={handleLoClick} >Convert to lower case</button>
                <button disabled = {entry.content.length + entry.title.length ===0} className={`btn mx-2 my-1`} style={{backgroundColor: '#7a23b5'}} onClick={speak} >Speak</button>
            </div>
        </div>
        <button type='button' disabled = {entry.content.length ===0} className={`btn mx-4 my-1`} onClick = {handleSubmit} style={{backgroundColor: '#7a23b5'}} >Log</button>
        <div className="container" style={{color: props.mode ==='dark'?'white':'black'}}>
            <h1>Your text summary</h1>
            <p>{(entry.content.trim().split(/\s+/).filter(word=>word.length>0)).length} words and {entry.content.length} characters.</p>
            <p>{0.008 * ((entry.content.trim().split(/\s+/).filter(word=>word.length>0)).length)} minutes to read. </p>
        </div>
        <button className={`btn mx-2 my-1`} style={{backgroundColor: '#7a23b5'}} onClick={() => navigate("/")} >Go Back</button>

        
        </>
  );
}
