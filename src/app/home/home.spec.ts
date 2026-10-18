import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home } from './home';
import { routes } from '../app.routes';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the dashboard sections and a link to the conference catalog', () => {
    const page: HTMLElement = fixture.nativeElement;

    expect(page.querySelector('#profil')).toBeTruthy();
    expect(page.querySelector('#amis')).toBeTruthy();
    expect(page.querySelector('#notifications')).toBeTruthy();
    expect(page.querySelector('a[href="/conferences"]')).toBeTruthy();
    expect(page.querySelector('app-liste-conference')).toBeNull();
  });
});
