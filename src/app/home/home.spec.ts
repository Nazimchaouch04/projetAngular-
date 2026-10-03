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
    expect(page.querySelector('#conferences')).toBeTruthy();
  });

  it('should display the conference details section', () => {
    const page: HTMLElement = fixture.nativeElement;

    expect(page.textContent).toContain('Détail d’une conférence');
    expect(page.querySelector('app-details-conference')).toBeTruthy();
    expect(page.querySelector('app-liste-conference')).toBeTruthy();
  });

  it('should pass a selected conference from the list to the details component', () => {
    const page: HTMLElement = fixture.nativeElement;
    const selectButton = Array.from(page.querySelectorAll<HTMLButtonElement>('button.details-button')).find((button) =>
      button.textContent?.includes('Voir les détails'),
    );

    expect(selectButton).toBeDefined();
    expect(page.textContent).toContain('Modifiez le titre ou inscrivez-vous');

    selectButton?.click();
    fixture.detectChanges();

    expect(page.textContent).toContain('Conférence sélectionnée dans la liste.');
    expect(page.textContent).toContain('Angular et les applications réactives');
    expect(page.textContent).toContain('Participants');
    expect(page.textContent).not.toContain('Modifier le titre de la conférence');

    const secondSelectButton = Array.from(
      page.querySelectorAll<HTMLButtonElement>('button.details-button'),
    ).find(
      (button) =>
        button.textContent?.includes('Voir les détails') &&
        button
          .closest('article')
          ?.textContent?.includes('CONCEVOIR DES INTERFACES ACCESSIBLES'),
    );

    secondSelectButton?.click();
    fixture.detectChanges();

    expect(page.textContent).toContain('Concevoir des interfaces accessibles');
    expect(page.textContent).toContain('Sousse');
  });
});
