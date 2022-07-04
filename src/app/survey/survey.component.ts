import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  surveyResponse: any = {};
  questions: any[] = [];
  id: any = '';
  email: any = '';
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.email = this.route.snapshot.paramMap.get('email');
  }
  ngOnInit(): void {
    this.http
      .get(`http://13.41.83.79/api-survey/survey/${this.id}/${this.email}`)
      .subscribe((response: any) => {
        this.surveyResponse = response;
        if (response.data) {
          this.questions = response.data.questions;
          for (const ques of this.questions) {
            if (ques.type == 'checkbox') {
              ques.answer = [];
            }
          }
        }
      });
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  radioChange(index: number, event: any) {
    this.questions[index].answer = event.value;
  }

  checkboxChange(ind: number, value: any) {
    let index = this.questions[ind].answer.indexOf(value);
    if (index < 0) {
      this.questions[ind].answer.push(value);
    } else {
      this.questions[ind].answer.splice(index, 1);
    }
  }

  inputBlur(index: number, value: string) {
    this.questions[index].answer = value;
  }

  submit() {
    let surveyResponse = {
      surveyId: this.id,
      email: this.email,
      questions: this.questions,
    };
    this.http
      .post(`http://13.41.83.79/api-survey/survey/response`, surveyResponse)
      .subscribe((response: any) => {});
  }
}
