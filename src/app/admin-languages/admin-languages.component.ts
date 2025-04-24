import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages-service/languages.service';
import { Languages } from '../models/languages/languages.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-languages',
  templateUrl: './admin-languages.component.html',
  styleUrls: ['./admin-languages.component.css']
})
export class AdminLanguagesComponent {
  btntxt: string = "Agregar";
  languages: Languages[] = [];
  myLanguage: Languages = new Languages();

  constructor(private languagesService: LanguagesService) {
    this.languagesService.getLanguages().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.languages = data;
    });
  }

  agregarLenguaje() {
    this.languagesService.createLanguage(this.myLanguage).then(() => {
      this.myLanguage = new Languages();
    });
  }

  deleteLenguaje(id?: string) {
    this.languagesService.deleteLanguage(id);
  }

  updateLenguaje(item: Languages) {
    if (item.id) {
      this.languagesService.updateLanguage(item.id, { ...item });
    }
  }
}

