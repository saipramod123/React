import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle,Breadcrumb,BreadcrumbItem } from "reactstrap";

import { Link } from 'react-router-dom';
 
    function Renderdish({ dish }) 
    {
      if( dish!=null){ 
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
            }
        else{
            return null;
        } 
    }
    function RenderComments({ comments }) 
    {
        //console.log(dish);
        if (comments!= null) { 
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-group">
                        {comments.map((x) => {
                            return (
                                <li key={x.id} className="list-group mt-3">
                                    <p>{x.comment}</p>
                                    <p>
                                        {"-- " +
                                            x.author +
                                            " , " +
                                            new Intl.DateTimeFormat("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "2-digit",
                                            }).format(new Date(Date.parse(x.date)))}

                                    </p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
                    }
        else{
            return null;
        } 
    }
    const Dishdetail = (props)=> {
      
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                       
                        <BreadcrumbItem><Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}
                    </BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>


            <div className="row">
                <div className="col-12 col-md-5 m-1">
                <Renderdish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>
        );
    }

export default Dishdetail;


