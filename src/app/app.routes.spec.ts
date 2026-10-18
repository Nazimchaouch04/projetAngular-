import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { provideRouter } from '@angular/router';
import { ConferenceCatalogPage } from './conference-catalog/conference-catalog';
import { ConferenceDetailPage } from './conference-detail-page/conference-detail-page';
import { ContactPage } from './contact-page/contact-page';
import { RegistrationConfirmationPage } from './registration-confirmation-page/registration-confirmation-page';
import { routes } from './app.routes';
import { Home } from './home/home';
import { NotFoundPage } from './not-found-page/not-found-page';
import { ProfilePage } from './profile-page/profile-page';
import { RegistrationPage } from './registration-page/registration-page';
import { BookingService } from './services/booking.service';
import { ConferenceService } from './services/conference.service';

describe('Application routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it('should use the home page as the default route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', Home);

    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(
      'Bienvenue, Nazim',
    );
  });

  it('should open a conference directly from its parameterized URL', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/conferences/angular-reactive', ConferenceDetailPage);

    expect(harness.routeNativeElement?.textContent).toContain(
      'Angular et les applications réactives',
    );
    expect(TestBed.inject(Router).url).toBe('/conferences/angular-reactive');
  });

  it('should navigate from the catalog to the selected conference detail', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/conferences', ConferenceCatalogPage);

    const detailsButton =
      harness.routeNativeElement?.querySelector<HTMLButtonElement>('.details-button');
    expect(detailsButton).toBeTruthy();
    detailsButton?.click();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/conferences/angular-reactive');
    expect(harness.routeNativeElement?.textContent).toContain(
      'Angular et les applications réactives',
    );
  });

  it('should show a not-found state for an unknown conference id', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/conferences/unknown-id', ConferenceDetailPage);

    expect(harness.routeNativeElement?.textContent).toContain('Conférence introuvable');
    expect(harness.routeNativeElement?.querySelector('a[href="/conferences"]')).toBeTruthy();
  });

  it('should provide direct routes for profile and contact pages', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/profil', ProfilePage);
    expect(harness.routeNativeElement?.textContent).toContain('Mon profil');

    await harness.navigateByUrl('/contact', ContactPage);
    expect(harness.routeNativeElement?.textContent).toContain('Nous contacter');
  });

  it('should redirect successful registrations to the confirmation route', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/inscription', RegistrationPage);

    const registerButton =
      harness.routeNativeElement?.querySelector<HTMLButtonElement>('.conference-card button');
    expect(registerButton?.textContent).toContain('S’inscrire');
    registerButton?.click();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/inscription/confirmation/angular-reactive');
    expect(harness.routeNativeElement?.textContent).toContain('Votre place est réservée');
    expect(harness.routeNativeElement?.textContent).toContain(
      'Angular et les applications réactives',
    );
  });

  it('should redirect successful registrations from conference details', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/conferences/angular-reactive', ConferenceDetailPage);

    const registerButton =
      harness.routeNativeElement?.querySelector<HTMLButtonElement>('.conference-card button');
    expect(registerButton).toBeTruthy();
    registerButton?.click();
    await harness.fixture.whenStable();
    harness.detectChanges();

    expect(TestBed.inject(Router).url).toBe('/inscription/confirmation/angular-reactive');
    expect(harness.routeNativeElement?.textContent).toContain('Votre place est réservée');
  });

  it('should resolve confirmation from its route id and shared booking state', async () => {
    const conference = TestBed.inject(ConferenceService).upcomingConferences()[0];
    expect(TestBed.inject(BookingService).book(conference)).toBe(true);

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(
      `/inscription/confirmation/${conference.id}`,
      RegistrationConfirmationPage,
    );

    expect(harness.routeNativeElement?.textContent).toContain('Inscription validée');
    expect(harness.routeNativeElement?.textContent).toContain(conference.title);
  });

  it('should display a not-found page for an unknown URL', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/page-inconnue', NotFoundPage);

    expect(harness.routeNativeElement?.textContent).toContain('Cette page est introuvable');
    expect(harness.routeNativeElement?.querySelector('a[href="/"]')).toBeTruthy();
  });

  it('should lazy-load the administration feature and resolve its child routes', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/admin/statistiques');

    expect(harness.routeNativeElement?.textContent).toContain('Espace administrateur');
    expect(harness.routeNativeElement?.textContent).toContain('Statistiques');
    expect(harness.routeNativeElement?.querySelector('a.is-active')?.textContent).toContain(
      'Statistiques',
    );
  });
});
