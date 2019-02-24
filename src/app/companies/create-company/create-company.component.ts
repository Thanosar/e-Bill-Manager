import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CompanyService} from '../company.service';
import {Router} from '@angular/router';
import {DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-new-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;


  form: FormGroup;
  constructor(public fb: FormBuilder,
              public company: CompanyService,
              private router: Router,
              private storage: AngularFireStorage, private db: AngularFirestore) { }

  public config: DropzoneConfigInterface = {
    dictDefaultMessage: 'Κάνε κλίκ ή σύρε τις φωτογραφίες εδώ για ανέβασμα.',
    dictRemoveFile: 'Αφαίρεση αρχείου',
    url: '/',
    uploadMultiple: false,
    autoProcessQueue: false,
    clickable: true,
    parallelUploads: 100,
    acceptedFiles: 'image/*',
    addRemoveLinks: true,
  };


  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges();

    // The file's download URL
    // this.downloadURL = this.task.downloadURL();
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
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
