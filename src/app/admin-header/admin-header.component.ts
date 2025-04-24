import { Component } from '@angular/core';
import { Header } from '../models/header/header.model';
import { HeaderService } from '../services/header-service/header.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  myHeader: Header = new Header();

  constructor(public headerService: HeaderService) {
    this.headerService.getHeader().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      if (data.length > 0) {
        this.myHeader = data[0]; // asumimos que solo hay un documento
      }
    });
  }

  actualizarHeader() {
    if (this.myHeader.id) {
      this.headerService.updateHeader(this.myHeader.id, this.myHeader).then(() => {
        console.log("Header actualizado correctamente");
      });
    }
  }
}

