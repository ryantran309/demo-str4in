import { Link } from "react-router-dom";

function About() {
    return (
        <div className="container">
        <div className="row d-flex align-items-center" style={{height: "100vh"}}>
        <div className="col-12">
        <div className="card card-body d-flex flex-column" style={{borderRadius: "20px"}}>
            <div className="d-flex justify-content-end"><Link to="/"><i className="fas fa-times"></i></Link></div>
            <h4 className="text-center">About us</h4>
            <hr className="mt-0" />
            <p>render about us text here... Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, ratione? Facere eaque at consequuntur qui quis officia corporis laboriosam, quia perferendis asperiores quisquam tempore eveniet quasi illum neque deserunt. Quae aliquid dolores assumenda error. Accusantium, in rerum! Quisquam, quo voluptatem amet obcaecati quae sed maiores ratione enim ipsa fugit! Illo hic consequatur doloremque possimus accusantium maiores ducimus sit blanditiis nesciunt eveniet cumque, magni tempora nemo perspiciatis quos, dolore corporis fugit assumenda eaque consectetur accusamus quisquam eligendi! Facilis ipsum sequi culpa delectus consectetur nesciunt asperiores, commodi dolor, facere dolorum minus assumenda! Quis illo deleniti fugiat et ex repellat rem nulla? Excepturi.</p>
        </div>
        </div>
        </div>
        </div>
    );
}

export default About;