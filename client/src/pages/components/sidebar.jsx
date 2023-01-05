import {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URI } from "../../utils";
import "./sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const [workspace, setWorkspace] = useState([]);
    const [workspace_field, setWorkspace_field] = useState("");
    const [workspace_limit, setWorkspace_limit] = useState(6);
    const [workspace_class, setWorkspace_class] = useState("");
    useEffect(() => {
        axios.get(`${SERVER_URI}/workspace/last_workspace`).then((res) => {
            localStorage.setItem("ws", res.data.data);
        });
    }, []);
    useEffect(() => {
        axios.get(`${SERVER_URI}/workspace/all_workspace`).then((res) => {
            setWorkspace(res.data.data);
        });
    }, []);

    function add_workspace(e){
        e.preventDefault();
        axios.post(`${SERVER_URI}/workspace/add_workspace`, {name: workspace_field}).then((res) => {
            if(res.data.status){
                window.location.reload();
            }
        });
    }
    function workspace_see_more(){
        document.getElementById("workspace_see_more_btn").classList.add("d-none");
        setWorkspace_limit(workspace.length);
    }
    function workspace_handler(id){
        setWorkspace_class(id);
        localStorage.setItem("ws", id);
        document.getElementById("workspace_"+workspace_class).classList.remove("text-danger");
        document.getElementById("workspace_"+id).classList.add("text-danger");
    }
    return (
    <div>
        <div className="d-flex align-items-baseline justify-content-center py-5">
            <h4 className="font-weight-bold mr-3">STR4IN</h4>
            <i className="fas fa-bars fa-lg"></i>
        </div>
        <ul style={{listStyleType: "none"}}>
            <li className="font-weight-bold mb-3" key="dashboard"><Link to="/"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li>
            <li className="font-weight-bold mb-3" key="workspace"><i className="fas fa-signal"></i> Workspace <i className="fas fa-angle-down rotate-icon align-middle" data-toggle="collapse" data-target="#workspace_list"></i>
            <span id="add_workspace_modal_btn" data-toggle="modal" data-target="#add_workspace_modal"><i className="fas fa-plus ml-4"></i></span>
            <div className="collapse show mt-2" id="workspace_list">
            {workspace.slice(0, workspace_limit).map((list) => {
                return(
                    <h6 className={(localStorage.getItem("ws") === list._id)?"workspace_list workspace_list_h m-0 text-danger":"workspace_list workspace_list_h m-0"} id={"workspace_"+list._id} key={list._id} onClick={() => workspace_handler(list._id)}><i className="fas fa-circle" style={{color: list.color}}></i> {list.name}</h6>
                )
            })}
            {(workspace.length>6) ? <small id="workspace_see_more_btn" onClick={workspace_see_more}>See more workspace...</small> : <div className="d-none"></div>}
            </div>
            </li>
            <li className="font-weight-bold mb-3" key="about"><Link to="/about"><i className="fas fa-users"></i> About Us</Link></li>
            <li className="text-center mt-5"><button type="button" className="btn btn-sm logout_btn py-1 px-3" onClick={() => {localStorage.removeItem("token");localStorage.removeItem("un");localStorage.removeItem("up");localStorage.removeItem("ws"); navigate("/login")}}>Log out</button></li>
        </ul>

<div className="modal fade" id="add_workspace_modal" tabIndex="-1" role="dialog">
  <div className="modal-dialog modal-dialog-centered modal-sm" role="document">
    <div className="modal-content">
      <div className="modal-body p-1">
        <input type="text" id="workspace_field" className="form-control" placeholder="Workspace name" value={workspace_field} onChange={(e) => setWorkspace_field(e.target.value)} />
      </div>
      <div className="modal-footer d-flex justify-content-between p-0">
        <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success btn-sm" onClick={add_workspace}>Add</button>
      </div>
    </div>
  </div>
</div>
    </div>
    );
}

export default Sidebar;