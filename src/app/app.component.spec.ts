import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, NoopAnimationsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('présente la recherche d’alternance et les actions essentielles', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Guillaume Lechevallier');
    expect(compiled.querySelector('.hero-chip')?.textContent).toContain('Master 2 SUPINFO');
    expect(compiled.querySelector('.hero-role')?.textContent).toContain('Python / Angular');
    expect(compiled.querySelector('.cv-button')?.getAttribute('href')).toBe('assets/Guillaume-Lechevallier-CV.pdf');
    expect(compiled.querySelector('.cv-button')?.getAttribute('download')).toBe('Guillaume-Lechevallier-CV.pdf');
  });
});
