import React, { Component } from 'react';
import BookReviews from './BookReviews';
import axios from 'axios';
class BookComments extends Component {
  constructor(props) {
    super(props);

    this.state = { comments: [{ comment: 'I loved it. Would recommend', name: 'Greg' }, { comment: 'I hated it. The book details are inaccurate', name: 'Joey' }] };
  }

  componentDidMount() {
    axios.get('/books')
      .then(results => console.log(results.data))
      .catch(err => console.log(err));
  }
  submitReview = (event) => {
    event.preventDefault();
    console.log('What happens when I submit this form?', event.target.review.value);
    this.setState({ comments: [...this.state.comments, { comment: event.target.review.value }] });
  }


  render() {
    return (
      <div>
        <h1> The Lord of the Rings </h1>
        <h2> By Greg </h2>
        <p> Gandalf goes to Mordor to defeat the evil Yoda</p>

        <div className="comments">
          <form onSubmit={this.submitReview}>
            <textarea name="review" rows="40" cols="20"> </textarea>
            <button type="submit"> Submit Review </button>
          </form>

          <h3> Comments down below: </h3>
          {this.state.comments && this.state.comments.map(comment => (
            <p> {comment.name} said: {comment.comment} </p>
          ))
          }

          <BookReviews />

        </div>
      </div>

    );
  }

}

export default BookComments;
