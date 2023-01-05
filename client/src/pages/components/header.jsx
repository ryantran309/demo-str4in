import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import { SERVER_URI } from "../../utils";
import "./header.css";

function Header() {
    const [notifications, setNotifications] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQueryList, setSearchQueryList] = useState([]);
    useEffect(() => {
        axios.get(`${SERVER_URI}/notifications`).then((res) => {
            setNotifications(res.data);
        });
    }, []);
    

useEffect(() => {
const icon = document.getElementById("notification_icon");
function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function changeColor(){
    icon.style.color = getRandomColor();
}
setInterval(changeColor, 2000);
}, []);
function notification_seen(e){
    e.preventDefault();
    axios.get(`${SERVER_URI}/notification_seen`).then((res) => {
        console.log("notifications seen");
    });
}
function searchQuery_handler(e){
    e.preventDefault();
        if(searchQuery.length > 1){
            axios.get(`${SERVER_URI}/todo/search_todo`, {params: {query: searchQuery}}).then((res) => {
                if(res.data.status === "success"){
                    $("#search_result_list").removeClass("d-none");
                    setSearchQueryList(res.data.data);
                }
            });
        }else{
            $("#search_result_list").addClass("d-none");
        }
}
const statusName = {
    notStarted: "Not Started",
    inProgress: "In Progress",
    complete: "Complete",
    custom: "Custom"
}
    return (
        <div className="col-12 mt-5">
        <div className="row">
        <div className="col-10 mx-auto">
        <div className="d-flex justify-content-between">
            <div className="mb-3">
            <div className="input-group" style={{width: "400px"}}>
                <div className="input-group-prepend">
                    <span className="input-group-text header_search_field_icon"><i className="fas fa-search"></i></span>
                </div>
                <input type="text" className="form-control header_search_field" placeholder="Search your own workspaces" onKeyUp={searchQuery_handler} onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />
            </div>
            <ul className="list-group position-absolute d-none mt-2" id="search_result_list" style={{width: "400px", zIndex: "1"}}>
                {searchQueryList.map((item, index) => {
                    return (
                        <Link to="/view" state={item} key={index}>
                        <li className="list-group-item d-flex flex-column">
                            <div className="text-center mb-2">{item.title}</div>
                            <div className="d-flex justify-content-between">
                            <small>{statusName[item.status]}</small>
                            <small>{item.due_date}</small>
                            </div>
                        </li>
                        </Link>
                    )
                })}
            </ul>
            </div>
            
            <div>
                {(notifications.length>0)?<i className="fas fa-stopwatch fa-lg vertical-align-middle mr-3" data-toggle="collapse" href="#notification_bar" id="notification_icon" onClick={notification_seen} style={{cursor: "pointer"}}></i>:<i className="fas fa-bell-slash fa-lg vertical-align-middle mr-3" title="you have no reminder right now!"></i>}
                <div className="collapse" style={{width: "400px", position: "absolute", zIndex: "1", right: "0"}} id="notification_bar">
                    <ul className="list-group">
                        {notifications.map((notify, index) => {
                            return(
                                <li className="list-group-item d-flex align-items-baseline" key={index}><i className="fas fa-stopwatch text-info"></i>&nbsp;<small>You have reached the day <span className="text-warning">{notify.todo.due_date}</span>! please complete your task: <span className="text-danger">{notify.todo.title}</span></small></li>
                            )
                        })}
                    </ul>
                </div>
                <img src={localStorage.getItem("up")?localStorage.getItem("up"):""} alt="profile img" style={{width: "30px", height: "30px", borderRadius: "50%"}} />
                <Link to="/my-profile" className="font-weight-bold ml-2">{localStorage.getItem("un")?localStorage.getItem("un"):"Anonymous"} <i className="fas fa-angle-down rotate-icon align-middle"></i></Link>
            </div>
        </div>
        </div>
        </div>
        <hr className="mt-4 mb-5" style={{backgroundColor: "#fcfcfc"}} />
        </div>
    );
}

export default Header;