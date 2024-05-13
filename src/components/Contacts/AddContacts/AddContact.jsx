// import React, { useEffect, useState } from "react";
// import { Link ,useNavigate } from "react-router-dom";
// import { ContactService } from "../../../Services/ContactService";

// const AddContact = () => {

//     let navigate = useNavigate();

//     let [loading, setLoading] = useState(false);
//     let [contact, setContact] = useState({
//         name: '',
//         photo: '',
//         mobile: '',
//         email: '',
//         company: '',
//         title: '',
//         groupId: ''
//     });
//     let [groups, setGroups] = useState([]);
//     let [errorMessage, setErrorMessage] = useState('');
        

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setLoading(true);
//                 const response = await ContactService.getGroups();
//                 setGroups(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 setErrorMessage(error.message);
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const updateInput = (event) => {
//         setContact({
//             ...contact,
//             [event.target.name]: event.target.value
//         });
//     };

    
//     let submitForm = async (event) => {
//         event.preventDefault(); 
//         try {
//             let response = await ContactService.createContact(contact);
//             if (response) {
//                 navigate('/contact/list', { replace: true }); 
//             }
//         } catch (error) {
//             setErrorMessage(error.message);
//             navigate('/contacts/add', { replace: false }); 
//         }
//     };
    

//     return (
//         <React.Fragment>
//             {/* <pre>{JSON.stringify(contact)}</pre> */}
//             <section className="add-contact p-3">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col">
//                             <p className="h4 text-success fw-bold">Create Contact</p>
//                             <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque rerum commodi aliquam non numquam vitae? Dolor ducimus sunt sequi unde reiciendis? Incidunt consequuntur vel blanditiis dignissimos optio impedit dolor!</p>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="col-md-4">
//                             <form onSubmit={submitForm}>
//                                 <div className="mb-2">
//                                     <input
//                                         required={true}
//                                         name="name"
//                                         value={contact.name}
//                                         onChange={updateInput}
//                                         type="text" className="form-control" placeholder="name" />
//                                 </div>
//                                 <div className="mb-2">
//                                      <input 
//                                         required={true}
//                                         name = "photo"
//                                         value = {contact.photo}
//                                         onChange={updateInput}
//                                         type="text" className="form-control" placeholder="Photo URL" />
//                                 </div>
//                                 <div className="mb-2">
//                                     <input 
//                                         required={true}
//                                         name = "mobile"
//                                         value = {contact.mobile}
//                                         onChange={updateInput}
//                                         type="number" className="form-control" placeholder="Mobile" />
//                                 </div>
//                                 <div className="mb-2">
//                                     <input 
//                                         required={true}
//                                         name = "email"
//                                         value = {contact.email}
//                                         onChange={updateInput}
//                                         type="email" className="form-control" placeholder="Email" />
//                                 </div>
//                                 <div className="mb-2">
//                                     <input
//                                         required={true}
//                                         name = "company"
//                                         value = {contact.company}
//                                         onChange={updateInput} 
//                                         type="text" className="form-control" placeholder="Company Name" />
//                                 </div>
//                                 <div className="mb-2">
//                                     <input
//                                         required={true}
//                                         name = "title"
//                                         value = {contact.title}
//                                         onChange={updateInput} 
//                                         type="text" className="form-control" placeholder="Title" />
//                                 </div>
//                                 <div className="mb-2"></div>

//                                 <div className="mb-2">
//                                     <select
//                                         required={true}
//                                         name="groupId"
//                                         value={contact.groupId}
//                                         onChange={updateInput}
//                                         className="form-control">
//                                         <option value="">Select a Group</option>
//                                         {groups.map(group => (
//                                             <option value={group.id} key={group.id}>
//                                                 {group.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                                 <div className="mb-2">
//                                     <input type="submit" className="btn btn-success" value="Create" />
//                                     <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </React.Fragment>
//     );
// };

// export default AddContact;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";

const AddContact = () => {
    const navigate = useNavigate(); // Import useNavigate hook

    let [loading, setLoading] = useState(false);
    let [contact, setContact] = useState({
        name: '',
        photo: '',
        mobile: '',
        email: '',
        company: '',
        title: '',
        groupId: ''
    });
    let [groups, setGroups] = useState([]);
    let [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await ContactService.getGroups();
                setGroups(response.data);
                setLoading(false);
            } catch (error) {
                setErrorMessage(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateInput = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        });
    };

    let submitForm = async (event) => {
        event.preventDefault();
        try {
            let response = await ContactService.createContact(contact);
            if (response) {
                navigate('/contacts/list'); // Navigate to contact list page using navigate
            }
        } catch (error) {
            setErrorMessage(error.message);
            // Do not navigate if there is an error
        }
    };

    return (
        <React.Fragment>
            <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success fw-bold">Create Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque rerum commodi aliquam non numquam vitae? Dolor ducimus sunt sequi unde reiciendis? Incidunt consequuntur vel blanditiis dignissimos optio impedit dolor!</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                {/* Input fields */}
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name="name"
                                        value={contact.name}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="name" />
                                </div>
                                
                                <div className="mb-2">
                                      <input 
                                        required={true}
                                        name = "photo"
                                        value = {contact.photo}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Photo URL" />
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true}
                                        name = "mobile"
                                        value = {contact.mobile}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder="Mobile" />
                                </div>
                                <div className="mb-2">
                                    <input 
                                        required={true}
                                        name = "email"
                                        value = {contact.email}
                                        onChange={updateInput}
                                        type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name = "company"
                                        value = {contact.company}
                                        onChange={updateInput} 
                                        type="text" className="form-control" placeholder="Company Name" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required={true}
                                        name = "title"
                                        value = {contact.title}
                                        onChange={updateInput} 
                                        type="text" className="form-control" placeholder="Title" />
                                </div>

                                <div className="mb-2">
                                    <select
                                        required={true}
                                        name="groupId"
                                        value={contact.groupId}
                                        onChange={updateInput}
                                        className="form-control">
                                        <option value="">Select a Group</option>
                                        {groups.map(group => (
                                            <option value={group.id} key={group.id}>
                                                {group.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Submit button */}
                                <div className="mb-2">
                                    <input type="submit" className="btn btn-success" value="Create" />
                                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default AddContact;
