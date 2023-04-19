import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';
import { filter, map, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'queltemps';
  constructor(private updates: SwUpdate, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.updates.versionUpdates.pipe(
      switchMap(() => this.snackbar.open('Nouvelle Version disponible!', 'Mise à jour').afterDismissed()),
      filter(result => result.dismissedByAction),
      map(() => this.updates.activateUpdate().then(() =>
        location.reload()))
    ).subscribe();
  }
  }


