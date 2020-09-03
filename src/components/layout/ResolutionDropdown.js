import React from 'react';
import './Dropdown.css';


class Dropdown extends React.Component {
    constructor(){
        super();

        this.state = {
            displayMenu: false,
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

    };

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }

    render() {
        return (
            <div  className="dropdown" style = {{width:"200px"}} >
                <div className="button" onClick={this.showDropdownMenu}> Resolution </div>

                { this.state.displayMenu ? (
                        <ul>
                            <li><a href="/">Create Page</a></li>
                            <li><a href="/">Manage Pages</a></li>
                            <li><a href="/">Create Ads</a></li>
                        </ul>
                    ):
                    null
                }
            </div>
        );
    }
}

export default Dropdown;