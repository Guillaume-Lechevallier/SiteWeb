import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ExperienceproComponent } from './experiencepro.component';

describe('ExperienceproComponent', () => {
  let component: ExperienceproComponent;
  let fixture: ComponentFixture<ExperienceproComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceproComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExperienceproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
