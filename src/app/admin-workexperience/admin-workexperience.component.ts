import { Component } from '@angular/core';
import { WorkExperienceService } from '../services/work-experience-service/work-experience.service';
import { WorkExperience } from '../models/work-experience/work-experience.models';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-workexperience',
  templateUrl: './admin-workexperience.component.html',
  styleUrls: ['./admin-workexperience.component.css']
})
export class AdminWorkexperienceComponent {
  itemCount: number = 0;
  btntxt: string = "Agregar";
  goalText: string = "";
  workExperience: WorkExperience[] = [];
  myWorkExperience: WorkExperience = new WorkExperience();

  constructor(public workExperienceService: WorkExperienceService) {
    this.workExperienceService.getWorkExperience().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.workExperience = data;
    });
  }

  AgregarJob() {
    this.workExperienceService.createWorkExperience(this.myWorkExperience).then(() => {
      this.myWorkExperience = new WorkExperience();
    });
  }

  deleteJob(id?: string) {
    this.workExperienceService.deleteWorkExperience(id);
  }

  updateJob(job: WorkExperience) {
    if (job.id) {
      this.workExperienceService.updateWorkExperience(job.id, { ...job });
    }
  }
}
