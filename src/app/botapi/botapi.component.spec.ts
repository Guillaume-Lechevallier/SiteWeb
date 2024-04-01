import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotapiComponent } from './botapi.component';

describe('BotapiComponent', () => {
  let component: BotapiComponent;
  let fixture: ComponentFixture<BotapiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotapiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotapiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
