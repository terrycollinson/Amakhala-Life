import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.html'
})
export class FileUploadComponent {

  // Main task 
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: any;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore) { }
  
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
    // The File object
    const file = event.item(0)
    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }
    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;
    // Totally optional metadata
    const customMetadata = { app: 'Amakhala Life', binomial: 'Catcus Biggs' };
    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })
    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    // let parseResult =  JSON.parse(this.percentage);
    this.snapshot   = this.task.snapshotChanges()
    // The file's download URL
    this.downloadURL = this.task.downloadURL(); 
    console.log(this.percentage);
    // console.log(this.parseResult);
    console.log(this.task);
    console.log(this.downloadURL);
    console.log(this.snapshot);
  }


  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
    
  }


  showDiv() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
  

  
}
