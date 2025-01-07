import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaComment, FaDownload, FaThumbsUp, FaStar } from 'react-icons/fa';
import './GalleryItem.css';

function GalleryItem(props) {
  let hit = props.hit;
  let details = props.details;

  return (
    <div className="card mt-3">
      <div className="card-header">
        {hit.tags} {hit.imageWidth} x {hit.imageHeight}
      </div>
      {details ? (
        <img
          className="card-img-top"
          src={hit.webformatURL}
          alt={hit.tags || "Image de galerie"}
        />
      ) : (
        <img
          height="200"
          className="card-img-top"
          src={hit.webformatURL}
          alt={hit.tags || "Image de galerie"}
        />
      )}
      <div className="card-body">
        {details ? (
          <div className="row">
            <div className="col-auto">
              <img
                className="img-thumbnail"
                src={hit.userImageURL}
                alt={hit.user || "Image de l'utilisateur"}
              />
            </div>
            <div className="col">
              <div className="info-container">
                <div className="info-card">
                  <FaEye className="icon" />
                  <div>
                    <b>Views:</b> {hit.views}
                  </div>
                </div>
                <div className="info-card">
                  <FaComment className="icon" />
                  <div>
                    <b>Comments:</b> {hit.comments}
                  </div>
                </div>
                <div className="info-card">
                  <FaDownload className="icon" />
                  <div>
                    <b>Downloads:</b> {hit.downloads}
                  </div>
                </div>
                <div className="info-card">
                  <FaThumbsUp className="icon" />
                  <div>
                    <b>Likes:</b> {hit.likes}
                  </div>
                </div>
                <div className="info-card">
                  <FaStar className="icon" />
                  <div>
                    <b>Favorites:</b> {hit.favorites}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p />
        )}
        <div className="mt-3">
          {!details ? (
            <Link
              to={'/galleryDetails/' + hit.id}
              className="btn btn-gallery"
            >
              More Details
            </Link>
          ) : (
            <Link to="/gallery" className="btn btn-gallery">Back</Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default GalleryItem;