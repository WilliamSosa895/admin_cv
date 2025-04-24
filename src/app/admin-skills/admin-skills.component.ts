import { Component } from '@angular/core';
import { SkillsService } from '../services/skills-service/skills.service';
import { Skills } from '../models/skills/skills.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})
export class AdminSkillsComponent {
  btntxt: string = 'Agregar';
  mySkill: Skills = new Skills();
  skills: Skills[] = [];

  constructor(public skillsService: SkillsService) {
    this.skillsService.getSkills().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.skills = data;
    });
  }

  addSkill() {
    this.skillsService.createSkill(this.mySkill).then(() => {
      this.mySkill = new Skills();
    });
  }

  deleteSkill(id?: string) {
    this.skillsService.deleteSkill(id);
  }

  updateSkill(skill: Skills) {
    if (skill.id) {
      this.skillsService.updateSkill(skill.id, {
        lenguajes: skill.lenguajes
      });
    }
  }
}
