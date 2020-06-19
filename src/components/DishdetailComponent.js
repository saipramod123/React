import React from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";


 
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
    function RenderComments({ dish }) 
    {
        //console.log(dish);
        if (dish != null) { 
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-group">
                        {dish.comments.map((x) => {
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
                <div className="col-12 col-md-5 m-1">
                <Renderdish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments dish={props.dish} />
                </div>
            </div>
            </div>
        );
    }

export default Dishdetail;


