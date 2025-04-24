import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Languages } from '../../models/languages/languages.model';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {
  private dbPath = '/languages';
  languagesRef: AngularFirestoreCollection<Languages>;

  constructor(private db: AngularFirestore) {
    this.languagesRef = db.collection(this.dbPath);
  }

  getLanguages(): AngularFirestoreCollection<Languages> {
    return this.languagesRef;
  }

  createLanguage(lang: Languages): any {
    return this.languagesRef.add({ ...lang });
  }

  deleteLanguage(id?: string): Promise<void> {
    return this.languagesRef.doc(id).delete();
  }

  updateLanguage(id: string, data: Partial<Languages>): Promise<void> {
    return this.languagesRef.doc(id).update(data);
  }
}
