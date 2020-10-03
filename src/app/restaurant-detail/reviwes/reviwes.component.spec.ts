import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviwesComponent } from './reviwes.component';

describe('ReviwesComponent', () => {
  let component: ReviwesComponent;
  let fixture: ComponentFixture<ReviwesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviwesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviwesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
