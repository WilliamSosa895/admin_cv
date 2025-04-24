import { Component } from '@angular/core';
import { EducationService } from '../services/education-service/education.service';
import { Education } from '../models/education/education.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-education',
  templateUrl: './admin-education.component.html',
  styleUrls: ['./admin-education.component.css']
})
export class AdminEducationComponent {
  btntxt: string = "Agregar";
  educations: Education[] = [];
  myEducation: Education = new Education();

  constructor(private educationService: EducationService) {
    this.educationService.getEducation().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.educations = data;
    });
  }

  agregarEducation() {
    this.educationService.createEducation(this.myEducation).then(() => {
      this.myEducation = new Education();
    });
  }

  deleteEducation(id?: string) {
    this.educationService.deleteEducation(id);
  }

  updateEducation(item: Education) {
    if (item.id) {
      this.educationService.updateEducation(item.id, { ...item });
    }
  }
}
