import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactezmoiComponent } from './contactezmoi.component';

describe('ContactezmoiComponent', () => {
  let component: ContactezmoiComponent;
  let fixture: ComponentFixture<ContactezmoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactezmoiComponent]
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
