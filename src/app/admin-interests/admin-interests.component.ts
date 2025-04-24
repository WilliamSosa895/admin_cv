import { Component } from '@angular/core';
import { InterestsService } from '../services/interests-service/interests.service';
import { Interests } from '../models/interests/interests.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-interests',
  templateUrl: './admin-interests.component.html',
  styleUrls: ['./admin-interests.component.css']
})
export class AdminInterestsComponent {
  btntxt: string = "Agregar";
  interests: Interests[] = [];
  myInterest: Interests = new Interests();

  constructor(private interestsService: InterestsService) {
    this.interestsService.getInterests().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.interests = data;
    });
  }

  agregarInteres() {
    this.interestsService.createInterest(this.myInterest).then(() => {
      this.myInterest = new Interests();
    });
  }

  deleteInteres(id?: string) {
    this.interestsService.deleteInterest(id);
  }

  updateInteres(item: Interests) {
    if (item.id) {
      this.interestsService.updateInterest(item.id, { ...item });
    }
  }
}