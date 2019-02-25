import { Component, OnInit } from '@angular/core';
import {PaymentsService} from './payments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {CompanyService} from '../companies/company.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  company: {};
  companyId: string;
  payments: any = [];
  displayedColumns: string[] = ['amount', 'month', 'dateFrom', 'dateTo', 'paymentDate'];
  dataSource = [];

  constructor(
    private paymentService: PaymentsService,
    private router: Router,
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private companyService: CompanyService
  ) { }


  ngOnInit() {

    this.route.params.subscribe((params: any) => {
      this.companyId = params.id;
    });
    this.companyService.getService(this.companyId).then(doc => {
      if (doc.exists) {
        this.company = doc.data();
        console.log(this.company);
      }
    });

   this.paymentService.getPayments(this.companyId).subscribe(querySnapshot => {
     querySnapshot.forEach(doc => {
       const payment = doc.data();
       this.payments.push(payment);
     });
     this.dataSource = this.payments;
   });

  }

}
