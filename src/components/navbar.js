import React from 'react';
import './navbar.css';

class Navbar extends React.Component {
    render() {
        return (
            <div>
                <div className="navX">
                    <h2>chatsROOMS - live</h2>
                    <ul>
                        <li>about</li>
                        <li>help</li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Navbar;