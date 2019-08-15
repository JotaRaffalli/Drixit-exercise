import React from 'react';

class Statistics extends React.Component {
    constructor() {
        super();
        this.state = {
            Statistics: []
        }
    }

    componentDidMount() {
        fetch('/statistics')
        .then(res => res.json())
        .then(statistics => this.setState({statistics}, () => console.log('Here are the statistics: ',statistics)))
        .catch(err => console.log('There was an error getting data from API'))
    }

    render() {
        return (
            <h1>Hola Mundo</h1>
        )
    }
}

export default Statistics;
