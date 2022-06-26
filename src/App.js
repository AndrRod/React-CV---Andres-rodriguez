import './App.css';
import axios from 'axios';
import React, { Profiler } from 'react';
import { Component, useEffect, useState } from 'react';
// mejor forma es la importación más que agregar el script 
// import 'bootstrap/dist/css/bootstrap.min.css';
//fontawesone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
// reactstrap
import { Modal, ModalBody, ModalHeader, ModalFooter, Table, Form, Button} from 'reactstrap';
import { text } from '@fortawesome/fontawesome-svg-core';
import moment from "moment"; 
import logo from './logo.svg';
import './App.css';



function App() {
  let url = "http://localhost:8080/person"  
  const [profil, setProfil] = useState([]);  
  const [tableUsers, setTableUsers] = useState([]);


  const requestGet= async ()=>{       
      await axios.get(url)
    .then(response=>{          
        setProfil(response.data);
        console.log(response.data)    
    }).catch(error=>{
      console.log(error)
    })
  }
  
    useEffect(()=>{
      requestGet()    
    },[]);  



  return (
    <div className="App" >
    <nav class="div-nav"> 
        <ul class="menu">
            <li class="logo"><a class="link" href="#">{profil.firstName} {profil.lastName} - CV</a></li>
       
            {/* <li class="item button"><a class="link" href="#">Login</a></li> */}
          
        </ul>
    </nav>
<div class="div-margin">
    <div class="div-head">            
        <div class="div-img-back-title">
            <div class="cont-title"> 
                <img class="div-image" src={profil.imageProfileUrl}></img>                
                <div class="div-title">
                    <h2>{profil.firstName} {profil.lastName}</h2>
                    <h3>{profil.typeProgramerName}</h3>                    
                    <h4>{profil.toolsName}</h4>
                    <i data-fa-symbol="delete" class="fas fa-trash fa-fw"></i>
                    <i data-fa-symbol="edit" class="fas fa-pencil fa-fw"></i>
                    <i data-fa-symbol="favorite" class="fas fa-star fa-fw"></i>
                    <i class="fas icon-kiwi-bird"></i>

              <button className='btn btn-primary'><FontAwesomeIcon icon={faSave} /></button>
              {" "}
              <button className='btn btn-primary'><FontAwesomeIcon icon={faEdit} /></button>
              {" "}
              <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt} /></button>    
                  
                </div>
            </div>
            <img class="line-title" src="./large-line.png"></img>
        </div>        
    </div>

    <div class="div-body">     
        <div class="col-1">
            <div class="div-1">
              <h5>P E R F I L  </h5>
                <img class="short-line" src="./short-line.png"></img>
                <div class="text-cent">
                    {profil.profileDescription}
                    {" "}<button className='btn btn-primary'><FontAwesomeIcon icon={faSave} /></button>
                    {" "}
                    <button className='btn btn-primary'><FontAwesomeIcon icon={faEdit} /></button>
                    {" "}
                    <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt} /></button>  
                </div> 
            </div>
            <div class="div-2">
                <h5>C O N T A C T O &nbsp; Y <br></br> P O R T F O L I O {" "}<button className='btn btn-primary'><FontAwesomeIcon icon={faSave} /></button></h5>
                <img class="short-line" src="./short-line.png"></img>
                {profil.contactAndPortfolio && profil.contactAndPortfolio.map(cont=>{return(
                  <div key={cont.id} class="div-cont">                                                       
              {" "}
              <button className='btn btn-primary btn-sm'><FontAwesomeIcon icon={faEdit} /></button>
              {" "} 
              <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt} /></button> 
              {" "} 
                    <img class="cont-img" src={cont.logoUrl}></img>
                    <div class="text-left">                        
                        <a class="links" href={cont.contactUrl} target="_blank">{cont.contactName}</a>
                    </div>                            
                </div>                           
                  )})}
          
            </div>
        </div>
        <div class="col-2">            
            <div class="div-3">
                <h5>H A B I L I D A D E S &nbsp;  Y  &nbsp; C O M P E T E N C I A      {" "}<button className='btn btn-primary'><FontAwesomeIcon icon={faSave} /></button></h5>                    
                <img class="short-line" src="./short-line.png"></img>
                
                  {profil.skills && profil.skills.map(skill=>{return(
                    <div key={skill.id} class="text-just"><strong>. {skill.name}: </strong> {skill.description} 
         
              {" "}
              <button className='btn btn-primary'><FontAwesomeIcon icon={faEdit} /></button>
              {" "}
              <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt} /></button>  
                    </div>
                 )})} 

            </div>
            <div class="div-4">                
                <h5>E X P E R I E N C I A{" "}<button className='btn btn-primary'><FontAwesomeIcon icon={faSave} /></button></h5>
                <img class="short-line" src="./short-line.png"></img>
                {profil.experiences && profil.experiences.map(exp=>{return(
                <div key={exp.id} class="text-just"><strong>. {exp.title}:</strong> {exp.description}
              {" "}
              <button className='btn btn-primary'><FontAwesomeIcon icon={faEdit} /></button>
              {" "}
              <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt} /></button>  
                </div>
                )})}
                
            </div>
            <div class="div-5">
                <h5>E D U C A C I O N {" "}<button className='btn btn-primary'><FontAwesomeIcon icon={faSave} /></button></h5>
                <img class="short-line" src="./short-line.png"></img>
                {profil.education && profil.education.map(ed=>{return(
                    <div>
                    <div key={ed.id} class="text-just"><strong>. {ed.finishDate? ed.finishDate.substr(-4): ed.finishDate} - {ed.title} ({ed.state}):</strong>
                    </div>
                    <ul class="ul-text">
                      <li class="li-text"> {ed.description} -  {ed.state}: {ed.finishDate ? ed.finishDate: ed.finishDate}.</li>                    
              {" "}
              <button className='btn btn-primary'><FontAwesomeIcon icon={faEdit} /></button>
              {" "}
              <button className="btn btn-danger" ><FontAwesomeIcon icon={faTrashAlt} /></button>                                    
                    </ul>
                  </div>
                 )})}
            </div>
                
            </div>
        </div>
    </div>   
    <footer class="div-foot">
        <p>Hecho por Andres Rodriguez - <a class="p" href="https://github.com/AndrRod?tab=repositories" target="_blank">GitHub</a> - 2022 </p>
    </footer>

    </div>
  );
}

export default App;
