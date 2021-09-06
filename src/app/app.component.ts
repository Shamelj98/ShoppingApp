import { Component, OnInit } from '@angular/core';
import { LoggingService } from './auth/logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import *  as AuhtActions from './auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>, private loggingService: LoggingService) {}


  ngOnInit() {
    this.store.dispatch(new AuhtActions.AutoLogin());
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
 
}
