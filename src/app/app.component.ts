import { Component } from '@angular/core';
import { DexieCrudService } from './database/services/dexieCrud.service';
import { IDocument } from './database/interfaces/IDocument';
import { Document } from './database/classes/Document';
import { AppDatabase } from './database/idb-context';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pwa-demo';
  deferredPrompt: any;
  documents: IDocument[] = [];

  constructor(public dexieCrudService: AppDatabase) {
    localStorage.setItem('test', 'testing ofline');
    this.getAllDocuments();
    // window.addEventListener('beforeinstallprompt', (event) => {
    //   event.preventDefault();
    //   this.deferredPrompt = event;
    //   console.log('this.deferredPrompt', this.deferredPrompt)
    // });
  }

  // isInstalled(): boolean {
  //   return window.matchMedia('(display-mode: standalone)').matches;
  // }

  // install(): void {
  //   console.log('this.deferredPrompt', this.deferredPrompt)
  //   if (this.deferredPrompt) {
  //     this.deferredPrompt.prompt();
  //     this.deferredPrompt.userChoice.then((choiceResult: any) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         console.log('User accepted the install prompt');
  //       } else {
  //         console.log('User dismissed the install prompt');
  //       }
  //       this.deferredPrompt = null;
  //     });
  //   }
  // }

  public getAllDocuments(): void {
    this.dexieCrudService.getAllDocuments().subscribe(
      (documents) => {
        this.documents = documents;
      },
      (error) => {
        console.error('Error fetching documents:', error);
      }
    );
  }

  public addfile(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e['target']?.result as string;
        // Now you can store or use the base64Data
        const body = new Document();
        body.name = file.name;
        body.id = Math.random();
        body.dataUrl = base64Data;
        this.dexieCrudService.addData(body);
        this.getAllDocuments();
      };
      reader.readAsDataURL(file);
    }
  }

  downLoad(doc: IDocument): void {
    const link = document.createElement('a');
        link.href = doc.dataUrl;
        link.download = doc.name; // Set the desired file name
        link.click();
  }

}
