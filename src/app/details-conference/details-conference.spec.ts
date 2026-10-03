import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsConference } from './details-conference';

describe('DetailsConference', () => {
  let component: DetailsConference;
  let fixture: ComponentFixture<DetailsConference>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsConference],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsConference);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
