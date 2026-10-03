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

  it('should update the displayed title when the user types', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#conference-title');

    input.value = 'Nouveau titre';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain('Nouveau titre');
    expect(component.title()).toBe('Nouveau titre');
  });

  it('should register and decrease the number of available seats', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    expect(component.availableSeats()).toBe(18);

    button.click();
    fixture.detectChanges();

    expect(component.availableSeats()).toBe(17);
    expect(fixture.nativeElement.textContent).toContain(
      'Votre inscription est prise en compte.',
    );
  });

  it('should hide the registration button when no seats remain', () => {
    component.availableSeats.set(0);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button')).toBeNull();
    expect(fixture.nativeElement.textContent).toContain('Toutes les places sont réservées.');
  });
});
