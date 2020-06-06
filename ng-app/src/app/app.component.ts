import { Component } from '@angular/core';
import { DefaultService, UserOut, UserIn } from '../client';
import { Subject, of, Observable, BehaviorSubject } from 'rxjs';
import { startWith, switchMap, map, catchError, repeatWhen, delay } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  refresh$ = new BehaviorSubject<void>(null);

  usersState$: Observable<{ loading: boolean, error: string, users: UserOut[] }> = this.refresh$.pipe(
    switchMap(() => {
      return this.defaultService.listUsersUsersGet()
        .pipe(
          map(result => {
            return {
              users: result,
              loading: false,
              error: null
            };
          }),
          catchError((err) => {
            return of({
              users: [],
              loading: false,
              error: err.toString()
            });
          }),
          delay(1000),
          startWith({
            users: [],
            loading: true,
            error: null
          })
        );
    })
  );


  userFormGroup: FormGroup;
  createError: any;


  constructor(
    private readonly defaultService: DefaultService,
    private readonly fb: FormBuilder) {

    this.userFormGroup = this.fb.group({
      email: this.fb.control('', [Validators.email]),
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      full_name: this.fb.control('', [])
    });
  }



  async createUser() {
    this.createError = null;
    if (this.userFormGroup.invalid) {
      return;
    }
    const userIn: UserIn = this.userFormGroup.value;
    try {
      const userOut = await this.defaultService.createUserUsersPost(userIn).toPromise();
      this.refresh$.next();
    } catch (e) {
      this.createError = e.message || e.toString();
    }
  }
}
