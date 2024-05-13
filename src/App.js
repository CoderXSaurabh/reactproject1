import React from 'react';
import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom'
import NavBar from "./components/NavBar/NavBar";

import ContactList from "./components/Contacts/ContactList/ContactList"
import AddContacts from "./components/Contacts/AddContacts/AddContact"

import ViewContact from "./components/Contacts/ViewContact/ViewContact"

import EditContact from "./components/Contacts/EditContact/EditContact"
import Spinner from './components/Spinner/Spinner';

let App = ()=> {
  return (
    <React.Fragment>
      {/* <Spinner/> */}
      <NavBar/>
      <Routes>
        <Route path={'/'} element={<Navigate to ={'/contacts/list'}/>}/>
        <Route path={'/contacts/list'} element={<ContactList/>}/>
        <Route path={'/contacts/add'} element={<AddContacts/>}/>
        <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
        <Route path={'/contacts/edit/:contactId'} element={<EditContact/>}/>
      </Routes>
     
      
    </React.Fragment>
  );
}

export default App;
