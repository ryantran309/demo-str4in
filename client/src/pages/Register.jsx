import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URI } from "../utils";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [gender, setGender] = useState("");

    function gender_m(){
        if(document.getElementById("gender_male").checked === true){
            setGender("Male");
            document.getElementById("gender_female").checked = false;
        }else{
            setGender("");
        }
    }
    function gender_f(){
        if(document.getElementById("gender_female").checked === true){
            setGender("Female");
            document.getElementById("gender_male").checked = false;
        }else{
            setGender("");
        }
    }

    function register(e){
        e.preventDefault();
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let gender_male = document.getElementById("gender_male").checked;
        let gender_female = document.getElementById("gender_female").checked;
        let firstName_error = document.getElementById("firstName_error").classList;
        let lastName_error = document.getElementById("lastName_error").classList;
        let email_error = document.getElementById("email_error").classList;
        let password_error = document.getElementById("password_error").classList;
        let confirmPassword_error = document.getElementById("confirmPassword_error").classList;
        let gender_error = document.getElementById("gender_error").classList;

        if(firstName === null || firstName === ""){
            firstName_error.remove("d-none");
        }else{
            firstName_error.add("d-none");
        }
        if(lastName === null || lastName === ""){
            lastName_error.remove("d-none");
        }else{
            lastName_error.add("d-none");
        }
        if(email === null || email === ""){
            email_error.remove("d-none");
        }else{
            email_error.add("d-none");
        }
        if(password === null || password === ""){
            password_error.remove("d-none");
        }else{
            password_error.add("d-none");
        }
        if(confirmPassword === null || confirmPassword === ""){
            confirmPassword_error.remove("d-none");
        }else{
            confirmPassword_error.add("d-none");
        }
        if(gender_male === false && gender_female === false){
            gender_error.remove("d-none");
        }else{
            gender_error.add("d-none");
        }
        if(password !== confirmPassword){
            password_error.innerHTML = "Password & Confirm password should be same";
            password_error.remove("d-none");
        }
        axios.post(`${SERVER_URI}/user/register`, {
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            email: email,
            password: password
        }).then((res) => {
            if(res.data.status === "success"){
                document.getElementById("reg_success_msg").classList.remove("d-none");
                document.getElementById("gender_female").checked = false;
                document.getElementById("gender_male").checked = false;
                setFirstName("");
                setLastName("");
                setEmail("");
                setGender("");
                setPassword("");
                setConfirmPassword("");
            }else{
                document.getElementById("reg_failed_msg").classList.remove("d-none");
            }
        });
    }
    const style = {
        background: "#f2f2f2",
        border: "0"
    }
    return (
        <>
            <div className="container pt-5">
                <div className="row mt-5">
                    <div className="col-md-6">
                        <img src="assets/auth_image.png" alt="register cover img" className="w-100" />
                    </div>
                    <div className="col-md-6 mt-auto mb-auto">
                        <h2 className="font-weight-bold mb-3">Sign Up</h2>
                        <div className="row mb-3">
                        <div className="col-12 d-none" id="reg_success_msg">
                        <div className="alert alert-success alert-dismissible fade show" role="alert">Registration completed successfully.Please login to continue<button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button></div>
                        </div>
                        <div className="col-12 d-none" id="reg_failed_msg">
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">Registration failed! Please try again later...<button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button></div>
                        </div>
                        <div className="col-6">
                            <small className="text-danger font-weight-bold d-none" id="firstName_error">First name cannot be empty</small>
                            <label className="font-weight-bold mb-0" htmlFor="firstName">First name</label>
                            <input type="text" id="firstName" className="form-control" style={style} onChange={(e) => {setFirstName(e.target.value);}} value={firstName} />
                        </div>
                        <div className="col-6">
                            <small className="text-danger font-weight-bold d-none" id="lastName_error">Last name cannot be empty</small>
                            <label className="font-weight-bold mb-0" htmlFor="lastName">Last name</label>
                            <input type="text" id="lastName" className="form-control" style={style} onChange={(e) => {setLastName(e.target.value);}} value={lastName} />
                        </div>
                        </div>
                        <div className="mb-3">
                            <label className="font-weight-bold mb-0" htmlFor="email">Email</label>
                            <small className="ml-2 text-danger font-weight-bold d-none" id="email_error">Email cannot be empty</small>
                            <input type="email" id="email" className="form-control" style={style} onChange={(e) => {setEmail(e.target.value);}} value={email} />
                        </div>
                        <div className="mb-3">
                            <label className="font-weight-bold mb-0" htmlFor="password">Password</label>
                            <small className="ml-2 text-danger font-weight-bold d-none" id="password_error">Password cannot be empty</small>
                            <input type="password" id="password" className="form-control" style={style} onChange={(e) => {setPassword(e.target.value);}} value={password} />
                        </div>
                        <div className="mb-3">
                            <label className="font-weight-bold mb-0" htmlFor="confirmPassword">Confirm password</label>
                            <small className="ml-2 text-danger font-weight-bold d-none" id="confirmPassword_error">Confirm password cannot be empty</small>
                            <input type="password" id="confirmPassword" className="form-control" style={style} onChange={(e) => {setConfirmPassword(e.target.value);}} value={confirmPassword} />
                        </div>
                        <div className="row mb-3">
                        <div className="col-12 d-none" id="gender_error"><small className="text-danger font-weight-bold">There is no select gender</small></div>
                        <div className="col-3"><span className="font-weight-bold">Gender:</span></div>
                        <div className="col-3">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="gender_male" onClick={gender_m} />
                            <label className="form-check-label font-weight-bold" htmlFor="gender_male">Male</label>
                        </div>
                        </div>
                        <div className="col-3">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="gender_female" onClick={gender_f} />
                            <label className="form-check-label font-weight-bold" htmlFor="gender_female">Female</label>
                        </div>
                        </div>
                        </div>
                        <button type="button" onClick={register} className="btn btn-sm w-100 mb-2" style={{backgroundColor: "#646fd4", color: "#ffffff"}}>Register</button>
                        <Link to="/login" className="btn btn-sm font-weight-bold w-100" style={{backgroundColor: "#d9d9d9"}}>Already have an account ? Login here</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;