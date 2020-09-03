import React from 'react';
import { Dropdown } from 'reactjs-dropdown-component';


/*class ParentDropdown extends React.Component {
    constructor() {
        super();

        this.state = {
            resolution: [
                {
                    id: 0,
                    title: '1920x1080',
                    selected:false,
                    key:'resolution'
                },
                {
                    id: 1,
                    title: '1680x1050',
                    selected:false,
                    key:'resolution'
                },
                {
                    id: 2,
                    title: '1280x720',
                    selected:false,
                    key:'resolution'
                }
            ],
            color: [
                {
                    id: 0,
                    title: 'red',
                    selected:false,
                    key:'color'
                },
                {
                    id: 1,
                    title: 'black',
                    selected:false,
                    key:'color'
                },
                {
                    id: 2,
                    title: 'blue',
                    selected:false,
                    key:'color'
                }
            ]
        }
    }

    componentDidMount() {
        window.addEventListener("keydown", this.tabKeyPressed);
        window.addEventListener("mousedown", this.mouseClicked);
    }

    tabKeyPressed = (e) => {
        if (e.keyCode === 9) {
            document.querySelector('body').classList.remove("noFocus")
            window.removeEventListener('keydown', this.tabKeyPressed);
            window.addEventListener('mousedown', this.mouseClicked);
        }
    }

    mouseClicked = (e) => {
        document.querySelector('body').classList.add("noFocus")
        window.removeEventListener('mousedown', this.mouseClicked);
        window.addEventListener('keydown', this.tabKeyPressed);
    }

    resetThenSet = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state[key]))
        temp.forEach(item => item.selected = false);
        temp[id].selected = true;
        this.setState({
            [key]: temp
        })
        console.log(this.state[key][id].title)
    }

    render() {
        return(
            <div className="Dropdown">

                <div className="wrapper">
                    <Dropdown
                        title="Select resolution"
                        list={this.state.resolution}
                        resetThenSet={this.resetThenSet}
                    />

                    <Dropdown
                        title="Select color"
                        list={this.state.color}
                        resetThenSet={this.resetThenSet}
                    />
                </div>
            </div>
        )
    }


}
    export default ParentDropdown;*/


class ParentDropdown extends React.Component {


    constructor(props) {
        super(props);
        this.state = { value: "something" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        let result = this.state.value;
        alert("Your selected resolution is: " + result);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    render() {
        return (
            <div className="Dropdown">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Select resolution:
                        <select value={this.state.value} onChange={this.handleChange}>
                            <option value="1920x1080">1920x1080</option>
                            <option value="1680x1050">1680x1050</option>
                            <option value="1280x720">1280x720</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default ParentDropdown;