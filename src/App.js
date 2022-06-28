import './App.css';
import axios from 'axios';
import React, { Profiler } from 'react';
import { Component, useEffect, useState } from 'react';
//boostrap
import 'bootstrap/dist/css/bootstrap.min.css';
//fontawesone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// reactstrap
import { Modal, ModalBody, ModalHeader, ModalFooter, Form, Button, } from 'reactstrap';
import { text } from '@fortawesome/fontawesome-svg-core';
import moment from "moment"; 
import logo from './logo.svg';
import './App.css';


function App() { 
  let url = "http://localhost:8080"  

  var now = new Date();
  var month = (now.getMonth() + 1);               
  var day = now.getDate();
  if (month < 10) 
      month = "0" + month;
  if (day < 10) 
      day = "0" + day;
  var today = now.getFullYear() + '-' + month + '-' + day;
  
  // login ---------------------------------------------------------------
  const [bodyParameters, setBodyParameters] = useState({
    email: "",
    password: ""
 });
 const [isLog, setIsLog] = useState("");
 const [lenghtToken, setlenghtToken] = useState("")

 const handleChangeBodyParameters = (e) => {
   setBodyParameters({
     ...bodyParameters,
     [e.target.name]: e.target.value})
 }  

  const requestLogin = (bodyParm) => {
    const body = bodyParm;
   axios.post(url  + "/auth/login", body)
   .then(response=>{
    // console.log(response)
    // console.log(response.data.access_Token)
    setIsLog(true)
    localStorage.setItem("userToken", JSON.stringify(response.data.access_Token));
    setAuthToken("Bearer "+ JSON.parse(localStorage.getItem("userToken")))    
    requestGet(); 
  })}

  function setAuthToken(token) {
    axios.defaults.headers.common['Authorization'] = '';
    delete axios.defaults.headers.common['Authorization'];    
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
    }
  } 

  const [modalLogin, setmodalLogin] = useState(false);
  

  const updateEstadeModalLogin = ()=>{
    if(modalLogin===false){ 
      setTimeout(async function(){
        setmodalLogin(true);
      }, 300)
    }else{
      setmodalLogin(false)    
    }
  }

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    axios.defaults.headers.common['Authorization'] = ""
    setIsLog(false)    
  }

  const [modalLogout, setmodalLogout] = useState(false);
  

  const updateEstadeModalLogout = ()=>{
    if(modalLogout===false){ 
      setTimeout(async function(){
        setmodalLogout(true);
      }, 300)
    }else{
      setmodalLogout(false)    
    }
  }

  // }}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
// --------------------------------------------------------------
  // get general que siempre traera los cambios y cuando se inicia la web
  const [getProfil, setGetProfil] = useState([]);   

  const requestGet= async ()=>{       
      await axios.get(url + "/person/get")
    .then(response=>{          
        setGetProfil(response.data);
        // console.log(response.data) 
        // console.log(localStorage.getItem("userToken"))
        
    }).catch(error=>{     
      console.log(error)
    })
  }  
    useEffect(()=>{
      requestGet()    
    },[]);  
// -------------------------------------------------------------
// TITULO
const [profil, setProfil] = useState({
  imageProfileUrl: null,
  firstName: null,
  lastName: null,
  typeProgramerName: null,
  toolsName: null,
  profileDescription: null
});
const handleChangeProfil = (e) => {
  setProfil({
    ...profil,
    [e.target.name]: e.target.value})
} 


const [modalModifeTitle, setmodalModifeTitle] = useState(false);

const updateEstadeModalModifeTitle = ()=>{
  if(modalModifeTitle===false){ 
    setTimeout(async function(){
      setmodalModifeTitle(true);
    }, 300)
  }else{
    setmodalModifeTitle(false)    
  }
}

const requestPut = async (id, user)=>{
  const newProfil = profil;
  await axios.put(url + "/person", newProfil).then(response=>{
    // console.log(response.data);
    requestGet();
  })    
}
// TITULO -----------------------------------END

// PERFIL -------------------------------------------------

const [modalModifeProfile, setmodalModifeProfile] = useState(false);

const updateEstadeModalModifeProfile = ()=>{
  if(modalModifeProfile===false){ 
    setTimeout(async function(){
      setmodalModifeProfile(true);
    }, 300)
  }else{
    setmodalModifeProfile(false)    
  }
}
// PERFIL ------------------------------------------------- END

// HABILIDADES ------------------------------- CRUD START

const [skills, setSkills] = useState({
  id: "",
  name: "",
  description: ""
}); 

const handleChangeSkill = (e) => {
  setSkills({
    ...skills,
    [e.target.name]: e.target.value})
} 

const [modalModifeSkill, setmodalModifeSkill] = useState(false);


const updateEstadeModalModifeSkill = ()=>{
  if(modalModifeSkill===false){ 
    setTimeout(async function(){
      setmodalModifeSkill(true);
    }, 300)
  }else{
    setmodalModifeSkill(false)    
  }
}



const requestPutSkill = async (id, skill)=>{
  const newSkill = skill;
  await axios.put(url + "/skill/" + id, newSkill).then(response=>{
    // console.log(response.data);
    requestGet();
  })    
}

const [modalPostSkill, setmodalPostSkill] = useState(false);


const updateEstadeModalPostSkill = ()=>{
  if(modalPostSkill===false){ 
    setTimeout(async function(){
      setmodalPostSkill(true);
    }, 300)
  }else{
    setmodalPostSkill(false)    
  }
}

const requestPostSkill = async (skill)=>{
  const newSkill = skill;
  await axios.post(url + "/skill", newSkill).then(response=>{
    // console.log(response.data);
    requestGet();
  })    
}

const requestGetSkill = async (id)=>{  
  await axios.get(url + "/skill/"+ id).then(response=>{
    
    setSkills(response.data);
    
    requestGet();
  }).catch(error=>{
    console.log(error)
  })    
}


const [modalDeleteSkill, setmodalDeleteSkill] = useState(false);


const updateEstadeModalDeleteSkill = ()=>{
  if(modalDeleteSkill===false){ 
    setTimeout(async function(){
      setmodalDeleteSkill(true);
    }, 300)
  }else{
    setmodalDeleteSkill(false)    
  }
}
const requestDeleteSkill = async (id)=>{  
  await axios.delete(url + "/skill/"+ id).then(response=>{    
    requestGet();
  }).catch(error=>{
    console.log(error)
  })    
}


// HABILIDADES ------------------------------- CRUD END

// EXPERIENCIA ------------------------------- CRUD start
const [experience, setExperience] = useState({
  id: "",
  title: "",
  description: ""
}); 

const handleChangeExperience = (e) => {
  setExperience({
    ...experience,
    [e.target.name]: e.target.value})
} 

const [modalModifeExperience, setmodalModifeExperience] = useState(false);


const updateEstadeModalModifeExperience = ()=>{
  if(modalModifeExperience===false){ 
    setTimeout(async function(){
      setmodalModifeExperience(true);
    }, 300)
  }else{
    setmodalModifeExperience(false)    
  }
}



const requestPutExperience = async (id, exp)=>{
  const newExperience = exp;
  await axios.put(url + "/experience/" + id, newExperience).then(response=>{
    // console.log(response.data);
    requestGet();
  })    
}

const [modalPostExperience, setmodalPostExperience] = useState(false);


const updateEstadeModalPostExperience = ()=>{
  if(modalPostExperience===false){ 
    setTimeout(async function(){
      setmodalPostExperience(true);
    }, 300)
  }else{
    setmodalPostExperience(false)    
  }
}

const requestPostExperience = async (ex)=>{
  const newExp = ex;
  await axios.post(url + "/experience", newExp).then(response=>{
    // console.log(response.data);
    requestGet();
  })    
}

const requestGetExperience = async (id)=>{  
  await axios.get(url + "/experience/"+ id).then(response=>{
    // console.log(response.data);
    setExperience(response.data);
    // console.log(response.data.content)
    requestGet();
  }).catch(error=>{
    console.log(error)
  })    
}


const [modalDeleteExperience, setmodalDeleteExperience] = useState(false);


const updateEstadeModalDeleteExperience = ()=>{
  if(modalDeleteExperience===false){ 
    setTimeout(async function(){
      setmodalDeleteExperience(true);
    }, 300)
  }else{
    setmodalDeleteExperience(false)    
  }
}
const requestDeleteExperience = async (id)=>{  
  await axios.delete(url + "/experience/"+ id).then(response=>{    
    requestGet();
  }).catch(error=>{
    console.log(error)
  })    
}


// EXPERIENCIA ------------------------------- CRUD END
// CONTACT ------------------------------- CRUD START

const [contact, setContact] = useState({
  id: "",
  logoUrl: "",
 contactName: "",
 contactUrl: ""
}); 

const handleChangeContact = (e) => {
  setContact({
    ...contact,
    [e.target.name]: e.target.value})
} 

const [modalModifeContact, setmodalModifeContact] = useState(false);


const updateEstadeModalModifeContact = ()=>{
  if(modalModifeContact===false){ 
    setTimeout(async function(){
      setmodalModifeContact(true);
    }, 300)
  }else{
    setmodalModifeContact(false)    
  }
}



const requestPutContact = async (id, cont)=>{
  const newContact = cont;
  await axios.put(url + "/contact/" + id, newContact).then(response=>{
    // console.log(response.data);
    requestGet();
  })    
}

const [modalPostContact, setmodalPostContact] = useState(false);


const updateEstadeModalPostContact = ()=>{
  if(modalPostContact===false){ 
    setTimeout(async function(){
      setmodalPostContact(true);
    }, 300)
  }else{
    setmodalPostContact(false)    
  }
}

const requestPostContact = async (cont)=>{
  const newCont = cont;
  await axios.post(url + "/contact", newCont).then(response=>{
    // console.log(response.data);
    requestGet();
  })    
}

const requestGetContact = async (id)=>{  
  await axios.get(url + "/contact/"+ id).then(response=>{
    // console.log(response.data);
    setContact(response.data);
    // console.log(response.data.content)
    requestGet();
  }).catch(error=>{
    console.log(error)
  })    
}


const [modalDeleteContact, setmodalDeleteContact] = useState(false);


const updateEstadeModalDeleteContact = ()=>{
  if(modalDeleteContact===false){ 
    setTimeout(async function(){
      setmodalDeleteContact(true);
    }, 300)
  }else{
    setmodalDeleteContact(false)    
  }
}
const requestDeleteContact = async (id)=>{  
  await axios.delete(url + "/contact/"+ id).then(response=>{    
    requestGet();
  }).catch(error=>{
    console.log(error)
  })    
}



// CONTACTO ------------------------------- CRUD END

// EDUCACION ------------------------------- CRUD START


const [education, setEducation] = useState({
  id: "",
  title: "",
  description: "",
  state: "",
  startDate: null,
  finishDate: null
}); 

const handleChangeEducation = (e) => {
  setEducation({
    ...education,
    [e.target.name]: e.target.value})
} 

const [modalModifeEducation, setmodalModifeEducation] = useState(false);


const updateEstadeModalModifeEducation = ()=>{
  if(modalModifeEducation===false){ 
    setTimeout(async function(){
      setmodalModifeEducation(true);
    }, 1300)
  }else{
    setmodalModifeEducation(false)    
  }
}



const requestPutEducation = async (id, educ)=>{
  const newEducation = educ;
  await axios.put(url + "/education/" + id, newEducation).then(response=>{
    // console.log(response.data);
    requestGet();
  })    
}

const [modalPostEducation, setmodalPostEducation] = useState(false);


const updateEstadeModalPostEducation = ()=>{
  if(modalPostEducation===false){ 
    setTimeout(async function(){
      setmodalPostEducation(true);
    }, 1300)
  }else{
    setmodalPostEducation(false)    
  }
}

const requestPostEducation = async (cont)=>{
  const newEducation = cont;
  await axios.post(url + "/education", newEducation).then(response=>{
    // console.log(response.data);
    requestGet();
  })    
}

const requestGetEducation = async (id)=>{  
  await axios.get(url + "/education/"+ id).then(response=>{
    console.log(response);
    // console.log(response.data);    
    // console.log(response.data.content)
    setEducation(response.data);
    requestGet();
  }).catch(error=>{
    console.log(error)
  })    
}


const [modalDeleteEducation, setmodalDeleteEducation] = useState(false);


const updateEstadeModalDeleteEducation = ()=>{
  if(modalDeleteEducation===false){ 
    setTimeout(async function(){
      setmodalDeleteEducation(true);
    }, 300)
  }else{
    setmodalDeleteEducation(false)    
  }
}
const requestDeleteEducation = async (idEd)=>{  
  await axios.delete(url + "/education/"+ idEd).then(response=>{    
    requestGet();
  }).catch(error=>{
    console.log(error)
  })    
}

// EDUCACION------------------------------- CRUD END

// --------------------------------------------------------------
 
  return (
    <div className="App" >
{/* modal login start */}


<Modal isOpen={modalLogin} >
     <ModalHeader style={{display: 'float'}}>
       <button className='btn btn-outline-outline btn-sm-primary  ' style={{float: 'right'}} onClick={()=>{updateEstadeModalLogin()}} >x
         </button>
     </ModalHeader>
     <ModalBody>      
       
       <div key={profil.id} className='form-group'>
          
         <label htmlFor="title">Email</label>
         <input className='form-control' type="email"name="email" id="email" rows={5}    onChange={(p)=>handleChangeBodyParameters(p)} />
         <br/> 
         <label htmlFor="title">Password</label>
         <input className='form-control' type="password"name="password" id="email" rows={5}    onChange={(p)=>handleChangeBodyParameters(p)} />
         <br/> 
         </div>             
       
     </ModalBody> 
     <ModalFooter>
    
      <button className='btn btn-outline-success btn-sm' onClick={()=>{requestLogin(bodyParameters); updateEstadeModalLogin(bodyParameters)}}> Ingresar</button>      
       <button className='btn btn-outline-danger btn-sm'  onClick={()=>{updateEstadeModalLogin()}}>Cancelar</button>
        
     </ModalFooter>
  
   </Modal>


   {/* modal login finish- --------------------------------------- */}
  {/* modal logout start - --------------------------------------- */}

   <Modal isOpen={modalLogout}>       
       <ModalBody>
             <p>¿Estas seguro que quieres desloguearte?</p>
              
           </ModalBody><ModalFooter>
               <button className="btn btn-danger" onClick={() =>{logout();updateEstadeModalLogout()}}>Si</button>
               <button className="btn btn-primary" onClick={() => {updateEstadeModalLogout()}}>No</button>
            </ModalFooter>
     </Modal>
        
{/* modal logout finish - --------------------------------------- */}
      {/* // start modal TITLE -------------------------------------- */}
      <Modal isOpen={modalModifeTitle} >
     <ModalHeader style={{display: 'float'}}>
       <button className='btn btn-outline-outline btn-sm-primary  ' style={{float: 'right'}} onClick={()=>{updateEstadeModalModifeTitle()}} >x
         </button>
     </ModalHeader>
     <ModalBody>      
       <div className='form-group'>
         <br/>
         <label htmlFor="id">Id</label>
         <input className='form-control' type="text" name="id" id="id"  defaultValue={getProfil.id} readOnly/>
         <br/> 
         <label htmlFor="firstName">First Name</label>
         <input className='form-control' type="text" name="firstName" id="firstName"   defaultValue={getProfil.firstName}  onChange={(p)=>handleChangeProfil(p)} />
         <br/>
         <label htmlFor="lastName">Last Name</label>
         <input className='form-control' type="text" name="lastName" id="lastName"  defaultValue={getProfil.lastName}  onChange={(p)=>handleChangeProfil(p)}/>
         <br/>  
              
         <label htmlFor="typeProgramerName">Type of Programer</label>
         <input className='form-control' type="text" name="typeProgramerName" id="typeProgramerName"   defaultValue={getProfil.typeProgramerName}  onChange={(p)=>handleChangeProfil(p)} />
         <br/>

         <label htmlFor="toolsName">Tools Name</label>
         <input className='form-control' type="text" name="toolsName" id="toolsName"   defaultValue={getProfil.toolsName}  onChange={(p)=>handleChangeProfil(p)} />
         <br/>  
         <label htmlFor="imageProfileUrl">Perfil Image Url</label>
         <input className='form-control' type="text" name="imageProfileUrl" id="imageProfileUrl"  defaultValue={getProfil.imageProfileUrl}  onChange={(p)=>handleChangeProfil(p)}/>
         <br/>           
         </div> 

        
         <br/>  
     </ModalBody>
     <ModalFooter>
       
      <button className='btn btn-outline-success btn-sm' onClick={()=>{requestPut (getProfil.id, profil); updateEstadeModalModifeTitle()}}> Actualizar</button>
       {/* <button className='btn btn-outline-primary btn-sm' onClick>Insertar</button>           */}
      
       <button className='btn btn-outline-danger btn-sm'  onClick={()=>{updateEstadeModalModifeTitle()}}>Cancelar</button>
        
     </ModalFooter>
   </Modal>
      {/* //finish  modal TITLE -------------------------------------- */}

    {/* // start modal PERFIL -------------------------------------- */}

      <Modal isOpen={modalModifeProfile} >
     <ModalHeader style={{display: 'float'}}>
       <button className='btn btn-outline-outline btn-sm-primary  ' style={{float: 'right'}} onClick={()=>{updateEstadeModalModifeProfile()}} >x
         </button>
     </ModalHeader>
     <ModalBody>      
       <div className='form-group'>
        
         <label htmlFor="profileDescription">Perfil Description</label>
         <textarea class="form-control" type="text"  name="profileDescription" id="profileDescription" rows={5}  defaultValue={getProfil.profileDescription}  onChange={(p)=>handleChangeProfil(p)} />
         <br/> 
         </div>             
         <br/>  
     </ModalBody>
     <ModalFooter>
       
      <button className='btn btn-outline-success btn-sm' onClick={()=>{requestPut (getProfil.id, profil); updateEstadeModalModifeProfile()}}> Actualizar</button>
       {/* <button className='btn btn-outline-primary btn-sm' onClick>Insertar</button>           */}
      
       <button className='btn btn-outline-danger btn-sm'  onClick={()=>{updateEstadeModalModifeProfile()}}>Cancelar</button>
        
     </ModalFooter>
   </Modal>
      {/* // finish modal PERFIL -------------------------------------- */}

       {/* // start modal HABILIDADES -------------------------------------- */}

       <Modal isOpen={modalModifeSkill || modalPostSkill} >
     <ModalHeader style={{display: 'float'}}>
       <button className='btn btn-outline-outline btn-sm-primary  ' style={{float: 'right'}} onClick={()=>{modalModifeSkill? updateEstadeModalModifeSkill(): updateEstadeModalPostSkill()}} >x
         </button>
     </ModalHeader>
     <ModalBody>      
       
       <div key={skills.id} className='form-group'>
          <br/>
         <label  htmlFor="id">Id</label>
         <input className='form-control' type="text" name="id" id="id"  defaultValue={modalModifeSkill? skills.id: ""} readOnly/>
         <br/> 
         <label htmlFor="name">Hability name</label>
         <input className='form-control' type="text"name="name" id="name" rows={5}  defaultValue={modalModifeSkill? skills.name: ""}  onChange={(p)=>handleChangeSkill(p)} />
         <br/> 
         <label htmlFor="description">description</label>
         <textarea class="form-control" type="text"  name="description" id="description" rows={5}  defaultValue={modalModifeSkill? skills.description : ""}  onChange={(p)=>handleChangeSkill(p)} />
         <br/> 
         
         </div>             
       
     </ModalBody> 
     <ModalFooter>
      {modalModifeSkill?
      <button className='btn btn-outline-success btn-sm' onClick={()=>{requestPutSkill (skills.id, skills); updateEstadeModalModifeSkill()}}> Actualizar</button>
      :
      <button className='btn btn-outline-primary btn-sm' onClick={()=>{requestPostSkill(skills); updateEstadeModalPostSkill()}}>Insertar</button>           
    }
       <button className='btn btn-outline-danger btn-sm'  onClick={()=>{modalModifeSkill? updateEstadeModalModifeSkill(): updateEstadeModalPostSkill()}}>Cancelar</button>
        
     </ModalFooter>
  
   </Modal>


   {/* eliminar habilidad */}

   <Modal isOpen={modalDeleteSkill}>       
     {/* devolverEstadoEliminar() */}
       <ModalBody>
             <p>¿Estas seguro que quieres eliminar el skill "{skills.name}"?</p>
              
           </ModalBody><ModalFooter>
               <button className="btn btn-danger" onClick={() =>{requestDeleteSkill(skills.id);updateEstadeModalDeleteSkill()}}>Si</button>
               <button className="btn btn-primary" onClick={() => {updateEstadeModalDeleteSkill()}}>No</button>
            </ModalFooter>
     </Modal>
        

      {/* // finish modal HABILIDADES -------------------------------------- */}

      {/* start modal EXPERIENCIA  --------------------------------------*/}


      <Modal isOpen={modalModifeExperience || modalPostExperience} >
     <ModalHeader style={{display: 'float'}}>
       <button className='btn btn-outline-outline btn-sm-primary  ' style={{float: 'right'}} onClick={()=>{modalModifeExperience? updateEstadeModalModifeExperience(): updateEstadeModalPostExperience()}} >x
         </button>
     </ModalHeader>
     <ModalBody>      
       
       <div key={experience.id} className='form-group'>
          <br/>
         <label  htmlFor="id">Id</label>
         <input className='form-control' type="text" name="id" id="id"  defaultValue={modalModifeExperience? experience.id: ""} readOnly/>
         <br/> 
         <label htmlFor="title">title</label>
         <input className='form-control' type="text"name="title" id="title" rows={5}  defaultValue={modalModifeExperience? experience.title: ""}  onChange={(p)=>handleChangeExperience(p)} />
         <br/> 
         <label htmlFor="description">description</label>
         <textarea class="form-control" type="text"  name="description" id="description" rows={5}  defaultValue={modalModifeExperience? experience.description : ""}  onChange={(p)=>handleChangeExperience(p)} />
         <br/> 
         
         </div>             
       
     </ModalBody> 
     <ModalFooter>
      {modalModifeExperience?
      <button className='btn btn-outline-success btn-sm' onClick={()=>{requestPutExperience(experience.id, experience); updateEstadeModalModifeExperience()}}> Actualizar</button>
      :
      <button className='btn btn-outline-primary btn-sm' onClick={()=>{requestPostExperience(experience); updateEstadeModalPostExperience()}}>Insertar</button>           
    }
       <button className='btn btn-outline-danger btn-sm'  onClick={()=>{modalModifeExperience? updateEstadeModalModifeExperience(): updateEstadeModalPostExperience()}}>Cancelar</button>
        
     </ModalFooter>
  
   </Modal>
 

{/* eliminar experiencia */}
     <Modal isOpen={modalDeleteExperience}>       
     {/* devolverEstadoEliminar() */}
       <ModalBody>
             <p>¿Estas seguro que quieres eliminar el skill "{experience.title}"?</p>
              
           </ModalBody><ModalFooter>
               <button className="btn btn-danger" onClick={() =>{requestDeleteExperience(experience.id);updateEstadeModalDeleteExperience()}}>Si</button>
               <button className="btn btn-primary" onClick={() => {updateEstadeModalDeleteExperience()}}>No</button>
            </ModalFooter>
     </Modal>
        

      {/* finish modal EXPERIENCIA--------------------------------------------------  */}

       {/* start modal CONTACTO --------------------------------------------------  */}


       <Modal isOpen={modalModifeContact || modalPostContact} >
     <ModalHeader style={{display: 'float'}}>
       <button className='btn btn-outline-outline btn-sm-primary  ' style={{float: 'right'}} onClick={()=>{modalModifeContact? updateEstadeModalModifeContact(): updateEstadeModalPostContact()}} >x
         </button>
     </ModalHeader>
     <ModalBody>      
       
       <div key={contact.id} className='form-group'>
          <br/>
         <label  htmlFor="id">Id</label>
         <input className='form-control' type="text" name="id" id="id"  defaultValue={modalModifeContact? contact.id: ""} readOnly/>
         <br/> 
         <label htmlFor="contactName">Contact Name</label>
         <input className='form-control' type="text"name="contactName" id="contactName" rows={5}  defaultValue={modalModifeContact? contact.contactName: ""}  onChange={(p)=>handleChangeContact(p)} />
         <br/> 
         <label htmlFor="contactUrl">Contact Url</label>
         <input class="form-control" type="text"  name="contactUrl" id="contactUrl" rows={5}  defaultValue={modalModifeContact? contact.contactUrl : ""}  onChange={(p)=>handleChangeContact(p)} />
         <br/> 
         <label htmlFor="logoUrl">Contact Logo Url</label>
         <input class="form-control" type="text"  name="logoUrl" id="logoUrl" rows={5}  defaultValue={modalModifeContact? contact.logoUrl: ""}  onChange={(p)=>handleChangeContact(p)} />
         <br/> 
         
         </div>             
       
     </ModalBody> 
     <ModalFooter>
      {modalModifeContact?
      <button className='btn btn-outline-success btn-sm' onClick={()=>{requestPutContact(contact.id, contact); updateEstadeModalModifeContact()}}> Actualizar</button>
      :
      <button className='btn btn-outline-primary btn-sm' onClick={()=>{requestPostContact(contact); updateEstadeModalPostContact()}}>Insertar</button>           
    }
       <button className='btn btn-outline-danger btn-sm'  onClick={()=>{modalModifeContact? updateEstadeModalModifeContact(): updateEstadeModalPostContact()}}>Cancelar</button>
        
     </ModalFooter>
  
   </Modal>
 

{/* eliminar contacto */}
     <Modal isOpen={modalDeleteContact}>       
     {/* devolverEstadoEliminar() */}
       <ModalBody>
             <p>¿Estas seguro que quieres eliminar el skill "{contact.contactName}"?</p>
              
           </ModalBody><ModalFooter>
               <button className="btn btn-danger" onClick={() =>{requestDeleteContact(contact.id);updateEstadeModalDeleteContact()}}>Si</button>
               <button className="btn btn-primary" onClick={() => {updateEstadeModalDeleteContact()}}>No</button>
            </ModalFooter>
     </Modal>


        {/* finish modal CONTACTO--------------------------------------------------  */}

        
  {/* finish modal EDUCACION--------------------------------------------------  */}


        <Modal isOpen={modalModifeEducation|| modalPostEducation} >
     <ModalHeader style={{display: 'float'}}>
       <button className='btn btn-outline-outline btn-sm-primary  ' style={{float: 'right'}} onClick={()=>{modalModifeEducation? updateEstadeModalModifeEducation(): updateEstadeModalPostEducation()}} >x
         </button>
     </ModalHeader>
     <ModalBody>      
       
       <div key={education.id} className='form-group'>
          <br/>
         <label  htmlFor="id">Id</label>
         <input className='form-control' type="text" name="id" id="id"  defaultValue={modalModifeEducation? education.id: ""} readOnly/>
         <br/> 
         <label htmlFor="title">title</label>
         <input className='form-control' type="text"name="title" id="title" rows={5}  defaultValue={modalModifeEducation? education.title: ""}  onChange={(p)=>handleChangeEducation(p)} />
         <br/> 
         <label htmlFor="description">description</label>
         <textarea class="form-control" type="text"  name="description" id="description" rows={5}  defaultValue={modalModifeEducation? education.description : ""}  onChange={(p)=>handleChangeEducation(p)} />
         <br/> 
         <label>state</label>
          <select htmlFor="state" name="state" id="state" className="form-select" defaultValue={modalModifeEducation? education.state: ""} onChange={(e)=>handleChangeEducation(e)} >
              <option >Choice an option</option>
              <option  value="CONTINUA">CONTINUA</option>
              <option value="FINALIZADO">FINALIZADO</option>
            </select>
            <br/>             
            <label htmlFor='startDate'>start date</label><br/>         
            <input type="date" name="startDate" id="startDate" defaultValue={modalModifeEducation? education.startDate: "2002-01-01"}  min="2002-01-01" onChange={(e) => handleChangeEducation(e)}/>                             
            
              <br/>
              {education.state == "FINALIZADO"
              ?
              <div>
               
              <label htmlFor='finishDate'>finish date</label><br/> 
                <input type="date" name="finishDate" id="finishDate" defaultValue={modalModifeEducation? education.finishDate : today} min="2017-01-01" max={today} onChange={(e) => handleChangeEducation(e)}/>
              </div>
              :""
              } 
        
         </div>    
          
       
     </ModalBody> 
     <ModalFooter>
      {modalModifeEducation?
      <button className='btn btn-outline-success btn-sm' onClick={()=>{requestPutEducation(education.id, education); updateEstadeModalModifeEducation()}}> Actualizar</button>
      :
      <button className='btn btn-outline-primary btn-sm' onClick={()=>{requestPostEducation(education); updateEstadeModalPostEducation()}}>Insertar</button>           
    }
       <button className='btn btn-outline-danger btn-sm'  onClick={()=>{modalModifeEducation? updateEstadeModalModifeEducation(): updateEstadeModalPostEducation()}}>Cancelar</button>
        
     </ModalFooter>
  
   </Modal>
 

{/* eliminar educacion */}
     <Modal isOpen={modalDeleteEducation}>       
     {/* devolverEstadoEliminar() */}
       <ModalBody>
             <p>¿Estas seguro que quieres eliminar el educacion "{education.title}"?</p>
              
           </ModalBody><ModalFooter>
               <button className="btn btn-danger" onClick={() =>{requestDeleteEducation(education.id);updateEstadeModalDeleteEducation()}}>Si</button>
               <button className="btn btn-primary" onClick={() => {updateEstadeModalDeleteEducation()}}>No</button>
            </ModalFooter>
     </Modal>
        


{/* finish modal EDUCACION--------------------------------------------------  */}



{/* // start html -------------------------------------- */}

    <nav class="div-nav"> 
        <ul class="menu">
            <li class="logo"><a class="link" href="#">{getProfil.firstName} {getProfil.lastName} - CV</a></li>
            {isLog
            ?<li class="item button secondary"><a class="link" href="#" onClick={()=>{updateEstadeModalLogout()}}>Log out</a></li>
            :<li class="item button secondary"><a class="link" href="#" onClick={()=>{updateEstadeModalLogin()}}>Login</a></li>
            
          }
          
        </ul>
    </nav>
<div class="div-margin">
    <div class="div-head">            
        <div class="div-img-back-title">
            <div class="cont-title"> 
                <img class="div-image" src={getProfil.imageProfileUrl}></img>                
                <div class="div-title">
                    <h2 id="h2">{getProfil.firstName} {getProfil.lastName}&nbsp;&nbsp;&nbsp;
                    {isLog?
                    <button className='btn btn-outline-primary btn-sm' onClick={()=>{updateEstadeModalModifeTitle()}}><FontAwesomeIcon icon={faEdit} /></button>
                  :""}
                    </h2>
                    <h3 id="h3">{getProfil.typeProgramerName}</h3>                    
                    <h4 id="h4">{getProfil.toolsName}
                    </h4>
                    <i data-fa-symbol="delete" class="fas fa-trash fa-fw"></i>
                    <i data-fa-symbol="edit" class="fas fa-pencil fa-fw"></i>
                    <i data-fa-symbol="favorite" class="fas fa-star fa-fw"></i>
                    <i class="fas icon-kiwi-bird"></i>
              
                {/* <button className='btn btn-outline-primary btn-sm'><FontAwesomeIcon icon={faSave} /></button>
                {" "}               */}
              {/* {" "}
              <button className="btn btn-outline-danger btn-sm" ><FontAwesomeIcon icon={faTrashAlt} /></button>     */}
                  
                </div>
            </div>
            <img class="line-title" src="./large-line.png"></img>
        </div>        
    </div>

    <div id="div-body">     
        <div id="col-1">
            <div id="div-1">
              <h5 id="h5">P E R F I L  </h5>
                <img class="short-line" src="./short-line.png"></img>
                <div class="text-cent">
                    {getProfil.profileDescription}
                    {/* {" "}<button className='btn btn-outline-primary btn-sm'><FontAwesomeIcon icon={faSave} /></button>
                    {" "} */}
                    &nbsp;&nbsp;&nbsp;
                       {isLog?
                    <button className='btn btn-outline-primary btn-sm' onClick={()=>updateEstadeModalModifeProfile()}><FontAwesomeIcon icon={faEdit} /></button>
                    :""}
                    {/* {" "}
                    <button className="btn btn-outline-danger btn-sm" ><FontAwesomeIcon icon={faTrashAlt} /></button>   */}
                </div> 
            </div>
            <div id="div-2">
                <h5 id="h5">C O N T A C T O &nbsp; Y <br></br> P O R T F O L I O 
                {" "}&nbsp;&nbsp;&nbsp;
                {isLog?
                <button className='btn btn-outline-primary btn-sm'><FontAwesomeIcon icon={faSave} onClick={()=>{updateEstadeModalPostContact()}}/></button>
                :""}
                </h5>
                <img class="short-line" src="./short-line.png"></img>
                {getProfil.contactAndPortfolio && getProfil.contactAndPortfolio.map(cont=>{return(
                  <div key={cont.id} class="div-cont">                                                       
              {" "}
              {isLog?
              <button className='btn btn-outline-primary btn-outline-sm btn-sm'><FontAwesomeIcon icon={faEdit} onClick={()=>{requestGetContact(cont.id); updateEstadeModalModifeContact()}}/></button>
              :""}
              {" "} 
              {isLog?
              <button className="btn btn-outline-danger btn-sm" onClick={()=>{requestGetContact(cont.id); updateEstadeModalDeleteContact()}}><FontAwesomeIcon icon={faTrashAlt} /></button> 
                :""}
              {" "} &nbsp;&nbsp;
                    <img class="cont-img" src={cont.logoUrl}></img>
                    <div class="text-left">                        
                        <a id="links" href={cont.contactUrl} target="_blank">{cont.contactName}</a>
                    </div>                            
                </div>                           
                  )})}
          
            </div>
        </div>
        <div id="col-2">            
            <div id="div-3">
                <h5 id="h5">H A B I L I D A D E S &nbsp;  Y  &nbsp; C O M P E T E N C I A     &nbsp;&nbsp;&nbsp; {" "}
                {isLog?
                <button className='btn btn-outline-primary btn-sm' onClick={()=>{updateEstadeModalPostSkill()}}><FontAwesomeIcon icon={faSave} /></button>
                :""}
                </h5>                    
                <img class="short-line" src="./short-line.png"></img>
                
                  {getProfil.skills && getProfil.skills.map(skill=>{return(
                    <div key={skill.id} class="text-just"><strong>. {skill.name}: </strong> {skill.description} 
         
              {" "}
              {isLog?
              <button className='btn btn-outline-primary btn-sm' onClick={()=>{requestGetSkill(skill.id);updateEstadeModalModifeSkill()}}><FontAwesomeIcon icon={faEdit} /></button>
              :""}
              {" "}
              {isLog?
              <button className="btn btn-outline-danger btn-sm" onClick={()=>{requestGetSkill(skill.id);updateEstadeModalDeleteSkill()}}><FontAwesomeIcon icon={faTrashAlt} /></button>  
                  :""}
                    </div>
                 )})} 

            </div>
            <div id="div-4">                
                <h5 id="h5">E X P E R I E N C I A &nbsp;&nbsp;&nbsp;{" "}
                {isLog?
                <button className='btn btn-outline-primary btn-sm' onClick={()=>{updateEstadeModalPostExperience()}}><FontAwesomeIcon icon={faSave} /></button>
                 :""}
                </h5>
                <img class="short-line" src="./short-line.png"></img>
                {getProfil.experiences && getProfil.experiences.map(exp=>{return(
                <div key={exp.id} class="text-just"><strong>. {exp.title}:</strong> {exp.description}
              &nbsp;&nbsp;&nbsp;{" "}
              {isLog?
              <button className='btn btn-outline-primary btn-sm' onClick={()=>{requestGetExperience(exp.id);updateEstadeModalModifeExperience()}}><FontAwesomeIcon icon={faEdit} /></button>
              :""}
              {" "}
              {isLog?
              <button className="btn btn-outline-danger btn-sm"  onClick={()=>{requestGetExperience(exp.id);updateEstadeModalDeleteExperience()}}><FontAwesomeIcon icon={faTrashAlt} /></button>  
              :""}
                </div>
                )})}
                
            </div>
            <div id="div-5">
                <h5 id="h5">E D U C A C I O N &nbsp;&nbsp;&nbsp;{" "}
                {isLog?
                <button className='btn btn-outline-primary btn-sm' onClick={()=>{updateEstadeModalPostEducation()}}><FontAwesomeIcon icon={faSave} /></button>
                :""}
                </h5>
                <img class="short-line" src="./short-line.png"></img>
                {getProfil.education && getProfil.education.map(ed=>{return(
                    <div>
                    <div key={ed.id} class="text-just"><strong>. {ed.startDate? ed.startDate.substr(0, 4): ""} - {ed.title} ({ed.state}):</strong>
                    </div>
                    <ul class="ul-text">
                      <li class="li-text"> {ed.description} -  {ed.state}: {ed.finishDate ? moment(ed.finishDate).format("MMM Do YY"): ""}.</li>                    
                      &nbsp;&nbsp;&nbsp;{" "}
                      {isLog?
              <button className='btn btn-outline-primary btn-sm' onClick={()=>{requestGetEducation(ed.id);updateEstadeModalModifeEducation()}}><FontAwesomeIcon icon={faEdit} /></button>
                     : ""}
              {" "}
              {isLog?
              <button className="btn btn-outline-danger btn-sm"  onClick={()=>{requestGetEducation(ed.id);updateEstadeModalDeleteEducation()}}><FontAwesomeIcon icon={faTrashAlt} /></button>     
              : ""}                           
                    </ul>
                  </div>
                 )})}
            </div>
                
            </div>
        </div>
    </div>   
    <footer id="div-foot">
        <p>Hecho por Andres Rodriguez - <a class="p" href="https://github.com/AndrRod?tab=repositories" target="_blank">GitHub</a> - 2022 </p>
    </footer>

    </div>
  );
}

export default App;
