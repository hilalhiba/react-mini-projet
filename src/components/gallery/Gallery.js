import React, { Component } from 'react';
import GalleryItem from './GalleryItem';
import SearchForm from '../SearchForm';
import './Gallery.css';

export class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: { hits: [] },
      currentPage: 1,
      pageSize: 6,
      totalPages: 0,
      currentKeyword: 'paris',
      weatherData: null,
    };

    this.pixabayApiKey = process.env.REACT_APP_PIXABAY_API_KEY;
    this.openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
  }

  fetchImages = async (query) => {
    try {
      const response = await fetch(`https://pixabay.com/api/?key=${this.pixabayApiKey}&q=${query}&page=${this.state.currentPage}&per_page=${this.state.pageSize}`);
      const data = await response.json();
      this.setState({
        gallery: data,
        totalPages: Math.ceil(data.totalHits / this.state.pageSize),
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.openWeatherApiKey}`);
      const data = await response.json();
      this.setState({
        weatherData: data,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  searchHits = (keyword) => {
    this.fetchImages(keyword);
    this.fetchWeatherData(keyword);
  };

  componentDidMount = () => {
    this.searchHits(this.state.currentKeyword);
  };

  goToPage = (pageIndex) => {
    this.setState({
      currentPage: pageIndex,
    }, () => {
      this.fetchImages(this.state.currentKeyword);
    });
  };

  getPages = () => {
    const { currentPage, totalPages } = this.state;
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages - 1, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
      endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    } else if (currentPage > totalPages - halfVisible) {
      startPage = Math.max(1, totalPages - maxVisiblePages);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button
            className="page-link"
            onClick={() => this.goToPage(i)}>
            {i}
          </button>
        </li>
      );
    }

    return pages;
  };

  goToPreviousPage = () => {
    if (this.state.currentPage > 1) {
      this.goToPage(this.state.currentPage - 1);
    }
  };

  goToNextPage = () => {
    if (this.state.currentPage < this.state.totalPages) {
      this.goToPage(this.state.currentPage + 1);
    }
  };

  render() {
    const { totalPages, currentPage, weatherData } = this.state;

    return (
      <div>
        {}
        <SearchForm searchHits={this.searchHits} />

        {}
        {weatherData && (
          <div className="weather-info">
            <div className="weather-header">
              <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt="weather icon" 
                className="weather-icon" 
              />
              <h3 className="city-name">{weatherData.name}</h3>
            </div>
            <p className="temperature">{Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p className="description">{weatherData.weather[0].description}</p>
            <div className="weather-details">
              <div className="detail">
                <i className="fas fa-tint"></i> <span>{weatherData.main.humidity}% Humidity</span>
              </div>
              <div className="detail">
                <i className="fas fa-wind"></i> <span>{weatherData.wind.speed} m/s Wind</span>
              </div>
            </div>
          </div>
        )}

        <div className="row">
          {this.state.gallery.hits.map(hit => (
            <div className="col-md-4" key={hit.id}>
              <GalleryItem hit={hit} />
            </div>
          ))}
        </div>

        {}
        <div className="pagination-container text-center">
          <ul className="pagination justify-content-center">
            {}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link pagination-nav"
                onClick={this.goToPreviousPage}>
                Previous
              </button>
            </li>

            {}
            {this.getPages()}

            {}
            {totalPages > 1 && currentPage < totalPages - 2 && (
              <li className="page-item disabled">
                <span className="page-link">...</span>
              </li>
            )}
            {totalPages > 1 && (
              <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => this.goToPage(totalPages)}>
                  {totalPages}
                </button>
              </li>
            )}

            {}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link pagination-nav"
                onClick={this.goToNextPage}>
                Next
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Gallery;