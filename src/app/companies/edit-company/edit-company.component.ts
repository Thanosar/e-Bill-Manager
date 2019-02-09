import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  id: string;
  form: FormGroup;
  defaultValues: any = [];

  constructor(private route: ActivatedRoute,
              public fb: FormBuilder,
              private companies: CompanyService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      this.form = this.fb.group({
        name: ['', Validators.required],
        type: ['', Validators.required],
      });

      this.id = params.id;

      this.companies.getService(this.id).then(function (doc) {
        if (doc.exists) {
          const company = doc.data();
          for (const attr in company) {
            if (this.form.get(attr) !== undefined) {
              this.defaultValues[attr] = company[attr];
            }
          }
          this.form.patchValue(this.defaultValues);
        }
      }.bind(this)).catch(function (error) {
        console.log('Error getting document:', error);
      });
    });
  }


  save() {
    if (this.form.valid) {
      const data = this.form.value;
      this.companies.updateService(this.id, data).then((res: any) => {
       if (res.success) {
         this.router.navigate(['/']);
         console.log('Document successfully updated!');
       } else {}
       console.log(res);
      });
    }
  }

}
