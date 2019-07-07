import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Start extends Component {
    /*
        Sehr einfache Sache: 3 Buttons für die unterschiedlichen Routen Create, Delete und Check. 
    */
    render() {
        return(
            <div className="section">
                <Link to={{pathname: '/createpdf/'}}>
                    <button className="button is-primary is-large">Create PDF</button>
                </Link>
                <Link to={{pathname: '/create/'}}>
                    <button className="button is-warning is-large">Publish Hash</button>
                </Link>
                <Link to={{pathname: '/delete/'}}>
                    <button className="button is-danger is-large">Delete</button>
                </Link>
                <Link to={{pathname: '/check'}}>
                    <button className="button is-info is-large">Check</button>
                </Link>
            </div>
        );
    }
}

export default Start;