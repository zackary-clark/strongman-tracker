import React from "react";
import {Link} from "react-router-dom";
import "./navBar.scss";
import { maxRoute, demo2Route } from "../../routes";

class NavBar extends React.Component {
    public render() {
        return (
            <div className={"nav-bar"}>
                <ul>
                    <li>
                        <Link className={"max-link"} to={maxRoute}>
                            Maxes
                        </Link>
                    </li>
                    <li>
                        <Link className={"bw-link"} to={demo2Route}>
                            BodyWeight
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default NavBar;
