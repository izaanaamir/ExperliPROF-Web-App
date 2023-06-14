import { Component } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent {
  feedback = {
    name: '',
    email: '',
    rating: 0,
    ratingStars: [1, 2, 3, 4, 5],
    comment: ''
  };
  selectedStar = 0;

  selectStar(star: number) {
    this.selectedStar = star;
    this.feedback.rating = star;
  }

  submitFeedback() {
    console.log('Submitted feedback:', this.feedback);
    // Add your submission logic here
  }
}
