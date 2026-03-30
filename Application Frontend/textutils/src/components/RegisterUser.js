import { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function RegisterUser(props) {

    const navigate = useNavigate();

    const[userData, setUserData] = useState({username:"", password:"", phone:"",address:{hno:"", city:"" , state:"", country:""}});
    


    const handleChange = (e)=>{
        const {name, value} = e.target;
        setUserData(prev=>({
            ...prev,
            [name]:value
        }));
    }

    

    const handleAddressChange = (e)=>{
        const{name,value} = e.target;
        setUserData((prev) =>({
            ...prev,
            address:{
                ...prev.address,
                [name]:value
            }
        })
        );
    }

    const handleSubmitClick = (e) => {
    e.preventDefault();
    axios
        .post("http://localhost:8080/public/create-user", userData, {
        headers: { 'Content-Type': 'application/json' }
        })
        .then((res) => {
        toast.success(res.data);
        setUserData({
            username: "",
            password: "",
            phone: "",
            address: { hno: "", city: "", state: "", country: "" }
        });

        setTimeout(() => {
            navigate('/');
        }, 2000);
        })
        .catch((err) => {
        if (err.response && err.response.data) {
            toast.error(err.response.data);
        } else {
            toast.warn("Network error or Server not Responding");
        }
        });
    };



  return (

    

    <div style={{color: props.mode ==='dark'?'white':'black'}}>
        

        <form>
        <div className="form-row">
            <div className="form-group col-md-6 mb-4">
            <label htmlFor="inputUsername4">Username:</label>
            <input name='username' style={{backgroundColor: props.mode==="light"?"white":"#2b2b40", color: props.mode==="light"?"black":"white"}}  type="username" className={`form-control ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} id="inputUsername4" value = {userData.username} onChange={handleChange} placeholder="Enter Username"/>
            </div>
            <div className="form-group col-md-6 mb-4">
            <label htmlFor="inputPassword4">Password: </label>
            <input name='password' style={{backgroundColor: props.mode==="light"?"white":"#2b2b40", color: props.mode==="light"?"black":"white"}} type="password" className={`form-control ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} id="inputPassword4" value = {userData.password} onChange={handleChange} placeholder="Set Password"/>
            </div>
            <div className="form-group col-md-2 mb-5 my-4">
            <label htmlFor="inputPhone">Phone Number: </label>
            <input name='phone'style={{backgroundColor: props.mode==="light"?"white":"#2b2b40",  color: props.mode==="light"?"black":"white"}} type="text" className={`form-control ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} id="inputPhone" value = {userData.phone} onChange={handleChange} placeholder='Enter Phone Number'/>
            </div>
        </div>
        Input Address:
        <div className="form-group my-3">
            <label htmlFor="inputHouseNumber ">House Number: </label>
            <input name='hno' style={{backgroundColor: props.mode==="light"?"white":"#2b2b40", color: props.mode==="light"?"black":"white"}} type="text" className={`form-control ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} value={userData.address.hno} onChange={handleAddressChange} id="inputHouseNumber" placeholder="Enter House Number"/>
        </div>
        <div className="form-row my-3">
            <div className="form-group col-md-6">
            <label htmlFor="inputCity">City: </label>
            <input name='city' style={{backgroundColor: props.mode==="light"?"white":"#2b2b40", color: props.mode==="light"?"black":"white"}} type="text" className={`form-control ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} id="inputCity" value={userData.address.city} onChange={handleAddressChange}placeholder='Enter City'/>
            </div>
            <div className="form-group col-md-4 my-3">
            <label htmlFor="inputState">State</label>
            <input name='state' style={{backgroundColor: props.mode==="light"?"white":"#2b2b40", color: props.mode==="light"?"black":"white"}} type='text' id="inputState" className={`form-control ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} value={userData.address.state} onChange={handleAddressChange} placeholder='Enter State'/>
            </div>
            <div className="form-group col-md-2 my-3">
            <label htmlFor="inputCountry">Country: </label>
            <input name='country' style={{backgroundColor: props.mode==="light"?"white":"#2b2b40", color: props.mode==="light"?"black":"white"}} type="text" className={`form-control ${props.mode === "dark"?"dark-placeholder": "light-placeholder"}`} id="inputCountry" value={userData.address.country} onChange={handleAddressChange} placeholder='Enter Country'/>
            </div>

        </div>
        <button
        type="button"
        onClick={handleSubmitClick}
        disabled={userData.username.length === 0 || userData.password.length === 0 || userData.phone.length === 0 || userData.address.hno.length === 0 || userData.address.city.length === 0 || userData.address.country.length === 0 || userData.address.state.length === 0}
        className="btn mx-2 my-2"
        style={{ backgroundColor: '#7a23b5' }}
        >
        Sign In
        </button>

        </form>
        <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}
