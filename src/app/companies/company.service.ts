import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,

  ) {
  }


  createService(data) {
    const id = this.afs.createId();
    return this.afs.doc(`services/` + id).set(data);
  }

  deleteService(id: string) {
    this.afs.doc('services/' + id).delete();
  }

  getCompanies() {
    return this.afs.collection(`services`).snapshotChanges();
  }

  getService(id) {
    return this.afs.collection(`services`).doc(id).ref.get();
  }

  updateService(id, data) {
    return this.afs.collection(`services`).doc(id).update(data);
  }


}



