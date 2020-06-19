import React from 'react';
//import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardTitle, } from 'reactstrap';

    function RenderMenuItem({ dish,onClick })
    {
        return(
            <Card onClick={() => onClick(dish.id)} >

                <CardImg width="100%" src={dish.image} alt={dish.name} />


                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>

                </CardImgOverlay>

            </Card>   
        );
    }
  
   //componentDidMount() {
     //  console.log('Menu components componentDidMount is invoked');
   //} 
const Menu = (props) => {
    const menu = props.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 mt-5">
                <RenderMenuItem dish={dish} onClick={props.onClick}/>
            </div>
        );

    });
    //console.log('Menu components renderis invoked');
    return (
        <div className="container">
            <div className="row">

                {menu}

            </div>
            <div className="row">

            </div>
        </div>

    );

}

  

    
        
  
export default Menu;