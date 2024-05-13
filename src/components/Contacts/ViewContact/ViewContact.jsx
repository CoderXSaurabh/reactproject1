import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../Spinner/Spinner";

let ViewContact = () => {
    let { contactId } = useParams();
    let [state, setState] = useState({
        loading: false,
        contact: {},
        errorMessage: '',
        group:{}
    });

    useEffect(() => {
        setState({ ...state, loading: true });
    
        ContactService.getContact(contactId)
            .then(response => {
                // Assuming getGroup returns a promise
                return ContactService.getGroup(response.data)
                    .then(groupResponse => {
                        setState({
                            ...state,
                            loading: false,
                            contact: response.data,
                            group: groupResponse.data
                        });
                    });
            })
            .catch(error => {
                setState({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                });
            });
    }, [contactId]);
    

    let { loading, contact, errorMessage ,group } = state;

    return (
        <React.Fragment>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quod, nemo non ad veritatis delectus fugit soluta eaque a eos magnam illo nobis dolores ipsa voluptas minima maxime. Dicta, ducimus.</p>
                        </div>
                    </div>
                </div>
            </section>
            {loading ? (
                <Spinner />
            ) : (
                <React.Fragment>
                    {
                    contact && Object.keys(contact).length > 0 && Object.keys(group).length >0 && (
                        <section className="view-contact mt-3">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <img src={contact.photo} className="contact-img" alt="Contact" />
                                    </div>
                                    <div className="col-md-8">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-action"> Name: <span className="fw-bold">{contact.name}</span></li>
                                            <li className="list-group-item list-group-item-action"> Mobile: <span className="fw-bold">{contact.mobile}</span></li>
                                            <li className="list-group-item list-group-item-action"> Email: <span className="fw-bold">{contact.email}</span></li>
                                            <li className="list-group-item list-group-item-action"> Company: <span className="fw-bold">{contact.company}</span></li>
                                            <li className="list-group-item list-group-item-action"> Title: <span className="fw-bold">{contact.title}</span></li>
                                            <li className="list-group-item list-group-item-action"> Group: <span className="fw-bold">{group.name}</span></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Link to={'/contacts/list'} className="btn btn-warning">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    )
};

export default ViewContact;
