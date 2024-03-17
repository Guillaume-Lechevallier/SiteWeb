import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationscolaireComponent } from './formationscolaire.component';

describe('FormationscolaireComponent', () => {
  let component: FormationscolaireComponent;
  let fixture: ComponentFixture<FormationscolaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormationscolaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormationscolaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
