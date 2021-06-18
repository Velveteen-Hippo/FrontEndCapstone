import React, { useContext, useEffect, useState} from 'react';
import axios from 'axios';
import ProductIdContext from '../../../context/ProductIdContext.jsx';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactStars from 'react-stars';

let emptyState = {
  // eslint-disable-next-line camelcase
  product_id: 0,
  rating: 0,
  summary: 'This is Kirk testing',
  body: null,
  recommend: null,
  name: null,
  email: null,
  photo: [],
  characteristics: {}
};

// eslint-disable-next-line camelcase
export default function WriteReview ({ postReview, handleCloseModal, showWriteReview, productInfo, product_id, productName }) {
  var {productId, updateProductId} = useContext(ProductIdContext);
  var [postFormData, setPostFormData] = useState(emptyState);
  var [ratingLabel, setRatingLabel] = useState('');

  const revertState = (event) => {
    event.preventDefault(event);
    setPostFormData(emptyState);
    setRatingLabel('');
  };

  const handlePostReview = (event) => {
    event.preventDefault(event);
    postReview(postFormData, (err) => {
      if (err) {
        console.log('err in handlePostReview', err);
      }
      console.log('posted review', postFormData);
    });
  };

  const ratingChanged = (newRating) => {
    event.preventDefault(newRating);
    postFormData.rating = newRating;
    setPostFormData(postFormData);
    console.log('rating', postFormData.rating);
  };

  const onRatingSelected = (rating) => {
    event.preventDefault(rating);
    console.log('rating in onRatingSelected', rating);
    rating === 1 ? setRatingLabel('Poor') : '';
    rating === 2 ? setRatingLabel('Fair') : '';
    rating === 3 ? setRatingLabel('Average') : '';
    rating === 4 ? setRatingLabel('Good') : '';
    rating === 5 ? setRatingLabel('Great') : '';
  };


  return (
    <div>
      <Modal
        show={showWriteReview}
        onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h3>Write Your Review</h3>
            <h5>About the {productName}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="reviewForm.ControlInputRating">
              <Form.Label>
                Overall Rating
                <ReactStars
                  count={5}
                  onChange={e => { ratingChanged(e); onRatingSelected(e); }}
                  size={24}
                  color2={'#ffd700'}
                  half={false}
                />
                <div>{ratingLabel}</div>
              </Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={e => { handlePostReview(e); revertState(e); }}>
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
