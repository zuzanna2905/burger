import React, { useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from  '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    }
    const sideDrawerOpenHandler = () => {
        setShowSideDrawer(true);
    }

    return (
    <Aux>
        <Toolbar isAuth={props.isAuthenticated} 
                    opend={sideDrawerOpenHandler}/>
        <SideDrawer isAuth={props.isAuthenticated}
                    open={showSideDrawer} 
                    closed={sideDrawerCloseHandler}/>
        <main className={classes.Content}>{props.children}</main>
    </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);