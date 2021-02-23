import React from 'react';
import ReactDom from 'react-dom';
import './events.styles.scss';
// ---- notes on doing async await in componentDidMount
// https://www.valentinog.com/blog/await-react/
class Events extends React.Component {
    constructor() {
        super();
        this.state = { data: [] };
    }
    async componentDidMount() {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts`
        );
        const json = await response.json();
        this.setState({ data: json });
    }

    //     let endPoint = process.env.REACT_APP_PATE_API + '/events';
    //     endPoint = 'https://jsonplaceholder.typicode.com/posts';
    //     fetch(`https://jsonplaceholder.typicode.com/posts`)
    //         .then((res) => res.json())
    //         .then((json) => this.setState({ events: json }));
    // }
    render() {
        return (
            <div className='events'>
                <h2 className='title'>Principle 8 Rally Events</h2>
                <span>Below you will find the current events</span>
                <uL>
                    {this.state.data.map((el) => (
                        <li>
                            {el.id}: {el.title}
                        </li>
                    ))}
                </uL>
            </div>
        );
    }
}

export default Events;
