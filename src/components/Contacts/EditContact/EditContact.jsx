import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams , useNavigate } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import { type } from "@testing-library/user-event/dist/type";
import Spinner from "../../Spinner/Spinner";

const EditContact = () => {
    const { contactId } = useParams();
    let navigate = useNavigate();
    const [state, setState] = useState({
        loading: false,
        contact: {
            name: '',
            photo: '',
            mobile: '',
            email: '',
            company: '',
            title: '',
            groupId: ''
        },
        groups: [],
        errorMessage: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            setState(prevState => ({ ...prevState, loading: true }));
            try {
                const [contactResponse, groupResponse] = await Promise.all([
                    ContactService.getContact(contactId),
                    ContactService.getGroups()
                ]);
                setState(prevState => ({
                    ...prevState,
                    loading: false,
                    contact: contactResponse.data,
                    groups: groupResponse.data
                }));
            } catch (error) {
                setState(prevState => ({
                    ...prevState,
                    loading: false,
                    errorMessage: error.message 

                }));
            }
        };

        fetchData();

    }, [contactId]);

    const updateInput = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            }
        });
    };

    let submitForm = async (event) => {
        event.preventDefault();
        try {
            let response = await ContactService.updateContact(state.contact,contactId);
            if (response) {
                window.location.href = '/contacts/list';
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                errorMessage: error.message 
            }));
            navigate('/contact/edit',{replace:false});
        }
    };
    
    const { loading, contact, groups, errorMessage } = state;

    return (
        <React.Fragment>
            {
                loading ? <Spinner/> : <React.Fragment>
                    <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-primary fw-bold">Edit Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam atque rerum commodi aliquam non numquam vitae? Dolor ducimus sunt sequi unde reiciendis? Incidunt consequuntur vel blanditiis dignissimos optio impedit dolor!</p>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <form onSubmit={submitForm}>
                                <div className="mb-2">
                                    <input
                                        required="true"
                                        name="name"
                                        value={contact.name}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="name" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required="true"
                                        name="photo"
                                        value={contact.photo}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Photo URL" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required="true"
                                        name="mobile"
                                        value={contact.mobile}
                                        onChange={updateInput}
                                        type="number" className="form-control" placeholder="Mobile" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required="true"
                                        name="email"
                                        value={contact.email}
                                        onChange={updateInput}
                                        type="email" className="form-control" placeholder="Email" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required="true"
                                        name="company"
                                        value={contact.company}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Company Name" />
                                </div>
                                <div className="mb-2">
                                    <input
                                        required="true"
                                        name="title"
                                        value={contact.title}
                                        onChange={updateInput}
                                        type="text" className="form-control" placeholder="Title" />
                                </div>
                                <div className="mb-2">
                                    <select
                                        required="true"
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
                                <div className="mb-2">
                                <input type="submit" className="btn btn-primary" value="Update" />
 
                                    {/* <Link to={'/contact/list'}><input type="submit" className="btn btn-primary" value="Update" /></Link> */}
                                    <Link to={'/contacts/list'} className="btn btn-dark ms-2">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img src={contact.photo} className="contact-img" />
                        </div>
                    </div>
                </div>
            </section>
                </React.Fragment>
            }
            
        </React.Fragment>
    )
};
export default EditContact;