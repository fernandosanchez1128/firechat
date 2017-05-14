/**
 * Created by big-data on 11/05/17.
 */
import React, { Component } from 'react'
import  {Col,Glyphicon, FormControl,Button} from 'react-bootstrap/lib/';

export default class Contacts extends Component {

    render () {
        return (
            <Col>
                <ul className="nav in" id="side-menu">
                    <li className="sidebar-search">
                        <div className="input-group custom-search-form">
                            <input type="text" className="form-control" placeholder="Search..." />
                            <span className="input-group-btn">
                        <Button ><Glyphicon glyph="search" /> </Button>
                            </span>
                        </div>
                    </li>
                </ul>


            </Col>

        );

    }
}
