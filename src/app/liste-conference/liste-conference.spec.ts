import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeConference } from './liste-conference';

describe('ListeConference', () => {
  let component: ListeConference;
  let fixture: ComponentFixture<ListeConference>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeConference],
    }).compileComponents();

    fixture = TestBed.createComponent(ListeConference);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
