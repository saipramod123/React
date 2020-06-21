import React, { Component } from 'react';
//import logo from './logo.svg';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import { Switch,Route,Redirect } from 'react-router-dom';



class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS

        };

    }
    

    render() {
        const HomePage = () => {
            return (
              <Home  dish = { this.state.dishes.filter((dish) => dish.featured)[0] }
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        const DishwithId = ({match}) => {
            return(
                <Dishdetail dish={this.state.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10) )}
                
                />

            );
        }
        const AboutPage = () => {
            return(
                <About leaders={this.state.leaders}/>
            );
        }

        return (
            <div>

              <Header /> 
                <Switch>
                    <Route path="/home" component={HomePage}/>
                    <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />}/>
                    <Route path="/menu/:dishId" component={DishwithId}/>
                    <Route exact path="/contactus" component={Contact}/>
                    <Route exact path="/aboutus" component={AboutPage}/>
                    <Redirect to="/home"/>

                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Main;