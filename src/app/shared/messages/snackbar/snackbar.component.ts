import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { NotificationService } from '../notifications.service';
import { tap, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: "0px"
      })),
      state('visible', style({
        opacity: 1,
        bottom: "30px"
      })),
      state('visible', style({})),
      transition('hidden => visible', animate('250ms 0s ease-in')),
      transition('visible => hidden', animate('250ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  snackVisibility: string = "hidden";
  messageTipe;
  message;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notifier
      .pipe(
        tap(messageObj => {
          this.message = messageObj['message']
          this.messageTipe = messageObj['messageTipe'];
          this.checkIsVisible();
          this.snackVisibility = 'visible';
        }),
        switchMap(message => timer(5000))
      ).subscribe(timer => this.snackVisibility = 'hidden');

    this.notificationService.closeToast.subscribe(() => {
      this.close();
    })
  }

  close() {
    this.snackVisibility = 'hidden';
  }

  checkIsVisible() {
    if (this.snackVisibility === 'visible') {
    }
  }

}
