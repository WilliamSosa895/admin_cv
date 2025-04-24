import { Component } from '@angular/core';
import { CertificatesService } from '../services/certificates-service/certificates.service';
import { Certificates } from '../models/certificates/certificates.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-certificates',
  templateUrl: './admin-certificates.component.html',
  styleUrls: ['./admin-certificates.component.css']
})
export class AdminCertificatesComponent {
  btntxt: string = "Agregar";
  certificates: Certificates[] = [];
  myCertificate: Certificates = new Certificates();

  constructor(private certificatesService: CertificatesService) {
    this.certificatesService.getCertificates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.certificates = data;
    });
  }

  agregarCertificado() {
    this.certificatesService.createCertificate(this.myCertificate).then(() => {
      this.myCertificate = new Certificates();
    });
  }

  deleteCertificado(id?: string) {
    this.certificatesService.deleteCertificate(id);
  }

  updateCertificado(item: Certificates) {
    if (item.id) {
      this.certificatesService.updateCertificate(item.id, { ...item });
    }
  }
}

