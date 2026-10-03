import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the profile, friends, and notifications sections', () => {
    const page: HTMLElement = fixture.nativeElement;

    expect(page.querySelector('#profil')).toBeTruthy();
    expect(page.querySelector('#amis')).toBeTruthy();
    expect(page.querySelector('#notifications')).toBeTruthy();
  });
});
