import React from 'react';
import axios from 'axios';
import ReactDom from 'react-dom';
import { api_header_config } from '../../include/api_headers';

import './events.styles.scss';
// ---- notes on doing async await in componentDidMount
// https://www.valentinog.com/blog/await-react/
class Events extends React.Component {
    constructor() {
        super();
        this.state = { data: [], posts: [] };
    }
    async componentDidMount() {
        // const res = await fetch(
        //     `https://jsonplaceholder.typicode.com/posts`
        // );
        //------------------------------------
        let obj = {
            operation: 'getActiveEvents'
        };
        let body = JSON.stringify(obj);

        // let api2use = process.env.REACT_APP_PATE_API + '/events';
        // api2use = 'https://jsonplaceholder.typicode.com/posts';
        // let res = await axios
        //     .post(api2use, body, api_header_config)
        //     .catch((error) => {
        //         if (error.response) {
        //             console.log(error.response.data);
        //             console.log(error.response.status);
        //             console.log(error.response.headers);
        //         } else if (error.response) {
        //             console.log(error.response);
        //         } else {
        //             console.log('Error', error.message);
        //         }
        //     });

        //this.setState({ data: res });
    //}

        let endPoint = process.env.REACT_APP_PATE_API + '/events';
        endPoint = 'https://j7qty6ijwg.execute-api.us-east-1.amazonaws.com/QA/events';
        //0000000000000000000000000000000000000000000000000000000
        axios.post(endPoint, body, api_header_config)
            .then(res => {
                const posts = res.data;
            this.setState({ posts });
        })
        //0000000000000000000000000000000000000000000000000000000

        //1111111111111111111111111111111111111111111111111111111
        // endPoint = 'https://jsonplaceholder.typicode.com/posts';
        // axios.get(endPoint)
        //     .then(res => {
        //         const posts = res.data;
        //     this.setState({ posts });
        // })
        //1111111111111111111111111111111111111111111111111111111
        
        //2222222222222222222222222222222222222222222222222222222
        // endPoint = 'https://jsonplaceholder.typicode.com/posts';
        // fetch(endPoint)
        //     .then((res) => res.json())
        //     .then((json) => this.setState({ posts: json }));
        //2222222222222222222222222222222222222222222222222222222
    }
    render() {
        return (
            <div className='events'>
                <h2 className='title'>Principle 8 Rally Events</h2>
                <span>Below you will find the current events</span>
                <ul>
                    {this.state.posts.map((el) => (
                        <li>
                            {el.id}: {el.title}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Events;
