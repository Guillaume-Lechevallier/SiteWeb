import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DefispersonnelComponent } from './defispersonnel.component';

describe('DefispersonnelComponent', () => {
  let component: DefispersonnelComponent;
  let fixture: ComponentFixture<DefispersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefispersonnelComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefispersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
