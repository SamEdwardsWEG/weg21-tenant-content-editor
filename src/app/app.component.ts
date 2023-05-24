import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  content: Content | undefined;
  form = this.fb.group({});
  constructor(private http: HttpClient, private fb: FormBuilder, private title: Title) {
    this.title.setTitle('WEG21 Tenant Content Editor');
  }

  ngOnInit() {
    this.http.get<Content>('../assets/Content.json').subscribe(json => {
      this.content = json;
      this.createForm();
    });
  }

  submit() {
    navigator.clipboard.writeText(JSON.stringify(this.form.value))
    alert('Content copied to clipboard')
    console.log(this.form.value);
  }

  createForm() {
    for (var key in this.content) {
      if (this.content.hasOwnProperty(key)) {
        this.form?.addControl(key, new FormControl(this.content[key]));
      }
    }
  }
}


export interface Content {
  [key: string]: string;
}
