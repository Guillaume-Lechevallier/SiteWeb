import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ContactezmoiComponent } from './contactezmoi.component';

describe('ContactezmoiComponent', () => {
  let component: ContactezmoiComponent;
  let fixture: ComponentFixture<ContactezmoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactezmoiComponent, NoopAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactezmoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
