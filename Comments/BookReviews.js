import React, { Component } from 'react';
import './BookReviews.css';

class BookReviews extends Component {
  constructor(props) {
    super(props);

    this.state = { reviews: 0 };
  }


  submitReview = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    this.setState({ reviews: event.target.value });
  }

  render() {
    return (
      <div>

        <h1>Star Rating</h1>
        <form>
          <fieldset>
            <div onChange={this.submitReview}>
              <span className="star-cb-group">
                <input type="radio" id="rating-5" name="rating" value="5" /><label for="rating-5">5</label>
                <input type="radio" id="rating-4" name="rating" value="4" checked="checked" /><label for="rating-4">4</label>
                <input type="radio" id="rating-3" name="rating" value="3" /><label for="rating-3">3</label>
                <input type="radio" id="rating-2" name="rating" value="2" /><label for="rating-2">2</label>
                <input type="radio" id="rating-1" name="rating" value="1" /><label for="rating-1">1</label>
                <input type="radio" id="rating-0" name="rating" value="0" className="star-cb-clear" /><label for="rating-0">0</label>
              </span>
            </div>
          </fieldset>
        </form>

        <div> I left a review of what: {this.state.reviews} </div>

      </div>

    );
  }

}

export default BookReviews;