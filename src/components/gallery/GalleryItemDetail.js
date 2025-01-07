import React, { Component } from 'react';
import GalleryItem from './GalleryItem';
import axios from 'axios';

export class GalleryItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hit: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    console.log(this.props);

  
    axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&id=${id}`)
      .then(response => {
        this.setState({
          hit: response.data.hits[0]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <GalleryItem hit={this.state.hit} details={true} />
      </div>
    );
  }
}

export default GalleryItemDetail;