import React, { useState} from 'react';
import { connect } from 'react-redux';
import { SubmitForm } from './action';

const Card = ({ SubmitForm }) => {
    const [userType, setUserType] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

    const validateForm = () => {
        const newErrors = {};
        if (!userType) newErrors.userType = "User type is required";
        if (!firstName) newErrors.firstName = "First name is required";
        if (!lastName) newErrors.lastName = "Last name is required";
        if (!username) newErrors.username = "Username is required";
        if (!email) newErrors.email = "Email is required";
        else if (!isValidEmail(email)) newErrors.email = "Invalid email format";
        if (!password) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        await SubmitForm({
            user_type: userType,
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            password, 
        });
        

        
        setUserType("");
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setErrors({});
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <h5 className="card-title">Sign Up Form</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={submitHandler}>
                                
                                <div className="form-group mb-2">
                                    <select className="form-control" value={userType} onChange={e => setUserType(e.target.value)} required>
                                        <option value="">Select User Type</option>
                                        <option value="researcher">Researcher</option>
                                        <option value="investor">Investor</option>
                                        <option value="institution_staff">Institution Staff</option>
                                        <option value="service_provider">Service Provider</option>
                                    </select>
                                    {errors.userType && <div className="text-danger">{errors.userType}</div>}
                                </div>
                                
                                <div className="form-group mb-2">
                                    <input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                                </div>
                                
                                <div className="form-group mb-2">
                                    <input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                                </div>
                               
                                <div className="form-group mb-2">
                                    <input type="text" className="form-control" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
                                    {errors.username && <div className="text-danger">{errors.username}</div>}
                                </div>
                                
                                <div className="form-group mb-2">
                                    <input type="email" className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                               
                                <div className="form-group mb-3">
                                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
                                    {errors.password && <div className="text-danger">{errors.password}</div>}
                                </div>
                                
                                <button type="submit" className="btn btn-success w-100">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { SubmitForm })(Card);
