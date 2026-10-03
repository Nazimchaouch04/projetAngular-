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

  it('should show only upcoming conferences with formatted values', () => {
    const page: HTMLElement = fixture.nativeElement;
    const text = page.textContent ?? '';

    expect(text).toContain('ANGULAR ET LES APPLICATIONS RÉACTIVES');
    expect(text).toContain('12/11/2026');
    expect(text).not.toContain('CONFÉRENCE PASSÉE');
  });

  it('should update the available-seat count when registering', () => {
    const conference = component.upcomingConferences()[0];
    const seatsBefore = component.remainingSeats(conference);

    component.register(conference);

    const updated = component
      .upcomingConferences()
      .find((item) => item.title === conference.title);

    expect(updated?.nbParticipants).toBe(conference.nbParticipants + 1);
    expect(updated && component.remainingSeats(updated)).toBe(seatsBefore - 1);
  });

  it('should apply the availability color and disable full conferences', () => {
    const buttons: NodeListOf<HTMLButtonElement> =
      fixture.nativeElement.querySelectorAll('button');

    expect(buttons[0].classList.contains('seats-green')).toBe(true);
    expect(buttons[1].classList.contains('seats-orange')).toBe(true);
    expect(buttons[2].classList.contains('seats-red')).toBe(true);
    expect(buttons[2].disabled).toBe(true);
    expect(buttons[2].textContent).toContain('Complet');
  });

  it('should show an empty-state message when there are no upcoming conferences', () => {
    component.conferences.set([]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'Aucune conférence à venir pour le moment.',
    );
  });
});
