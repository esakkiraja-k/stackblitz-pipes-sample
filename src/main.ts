import { Component, OnDestroy, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { from, Subscription, map, of, tap, filter, timer, take } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
})
export class App implements OnInit, OnDestroy {
  name = 'Angular';

  subApples!: Subscription;
  num!: Subscription;
  subTimer!: Subscription;

  ngOnInit() {
    const apples$ = from([
      { id: 1, type: 'gala' },
      { id: 2, type: 'macintosh' },
    ]);

    this.subApples = apples$
      .pipe(
        map((a) => ({ ...a, color: 'red' })),
        tap((a) => console.log('Apple :', a))
      )
      .subscribe();

    const numbers$ = of([1, 2, 3]);

    this.num = of(1, 2, 3)
      .pipe(
        filter((item) => item % 2 === 0),
        tap((i) => console.log('number', i))
      )
      .subscribe();

    this.subTimer = timer(0, 1000)
      .pipe(take(5))
      .subscribe({
        next: (item) => console.log('Timer:', item),
        error: (err) => console.error('Timer error occurred:', err),
        complete: () => console.log('completed'),
      });
  }

  ngOnDestroy() {
    this.subApples.unsubscribe();
    this.num.unsubscribe();
    this.subTimer.unsubscribe();
  }
}

bootstrapApplication(App);
