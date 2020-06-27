import React,{ Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle,Breadcrumb,BreadcrumbItem } from "reactstrap";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, Label, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent'; 
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform,Stagger,Fade} from 'react-animation-components';
    function Renderdish({ dish }) 
    {
      if( dish!=null){ 
            return (

                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                <Card>
                    <CardImg width="100%" src={baseUrl+dish.image} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </FadeTransform>
            );
            }
        else{
            return null;
        } 
    }
function RenderComments({ comments ,postComment, dishId }) 
    {
        //console.log(dish);
        if (comments!= null) { 
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="list-group">
                        <Stagger in>
                        {comments.map((x) => {
                            return (
                                <Fade in>
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
                                </Fade>
                               
                            );
                        })}
                        </Stagger>
                    </ul>
                    <Commentform dishId={dishId} postComment={postComment} />
                </div>
            );
                    }
        else{
            return null;
        } 
    }
    const Dishdetail = (props)=> {
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(props.errMess){
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        } 
       else  if(props.dish!=null)
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
                    <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                    />
                </div>
            </div>
            </div>
        );
        else 
            return(
                <div></div>
            );
    }

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class Commentform extends Component {

    constructor(props) {
        super(props);
        this.state = {

            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });

    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId,values.rating,values.yourname,values.message);


    }

    render() {
        return (
            <React.Fragment>
                <div>

                    <Button outline onClick={this.toggleModal}>
                        <span className="fa fa-pencil "></span> Submit Comment

                </Button>


                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment </ModalHeader>
                        <div className="container">
                            <ModalBody>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)} >
                                    <Row className="form-group">
                                        <Label >Rating</Label>
                                        <Control.select model=".rating" name="rating"
                                            className="form-control" >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </Control.select>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="yourname" >Your Name</Label>

                                        <Control.text model=".yourname" id="yourname" name="yourname" placeholder="Yourname"

                                            className="form-control"
                                            validators={{
                                                required, minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".yourname"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />

                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="message" >Comment</Label>

                                        <Control.textarea model=".message" id="message" name="message" rows="6"
                                            className="form-control" />

                                    </Row>
                                    <Row className="form-group">
                                        <Button type="submit" color="primary">
                                            Submit
                                             </Button>
                                    </Row>
                                </LocalForm>

                            </ModalBody>
                        </div>
                    </Modal>
                </div>
            </React.Fragment>


        );
    }









}









export default Dishdetail;


