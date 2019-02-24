import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {CompanyService} from '../company.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  servicesList: any = [];


  constructor(private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              public companies: CompanyService) {
  }

  ngOnInit() {
    this.getServices();
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.companies.deleteService(id);
    }
  }

  getServices() {
    this.companies.getCompanies().subscribe(actionArray => {
      this.servicesList = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        };

      });
    });
  }








}
