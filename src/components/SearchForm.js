import React, { Component } from 'react';
import './SearchForm.css';

export class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: '' };
  }

  render() {
    return (
      <form onSubmit={this.onSearch}>
        <div className="row">
          <div className="col">
            <input
              onChange={this.onChangeKeyWord}
              value={this.state.keyword}
              type="text"
              className="form-control form-control-lg search-input"
              placeholder="Search..."
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-search">
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>
      </form>
    );
  }

  onChangeKeyWord = (event) => {
    this.setState({ keyword: event.target.value });
  };

  onSearch = (event) => {
    event.preventDefault();
    this.props.searchHits(this.state.keyword);
  };
}

export default SearchForm;