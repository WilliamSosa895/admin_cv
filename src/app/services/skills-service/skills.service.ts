import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Skills } from '../../models/skills/skills.model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private dbPath = '/skills';
  skillsRef: AngularFirestoreCollection<Skills>;

  constructor(private db: AngularFirestore) {
    this.skillsRef = db.collection(this.dbPath);
  }

  getSkills(): AngularFirestoreCollection<Skills> {
    return this.skillsRef;
  }

  createSkill(skill: Skills): any {
    return this.skillsRef.add({ ...skill });
  }

  deleteSkill(id?: string): Promise<void> {
    return this.skillsRef.doc(id).delete();
  }

  updateSkill(id: string, data: Partial<Skills>): Promise<void> {
    return this.skillsRef.doc(id).update(data);
  }
}
