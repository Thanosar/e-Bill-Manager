import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../company.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  form: FormGroup;

  constructor(public fb: FormBuilder,
              public company: CompanyService,
              private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  save() {
    if (this.form.valid) {
      const data = this.form.value;

      this.company.createService(data).then((res: any) => {
        if (res.success) {
          console.log('Document successfully written!');
          this.router.navigate(['/']);
        } else {
          console.log(res);
        }
      });
    }
  }

}
