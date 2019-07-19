import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinCENSubmissionComponent } from './fin-cen-submission.component';

describe('FinCENSubmissionComponent', () => {
  let component: FinCENSubmissionComponent;
  let fixture: ComponentFixture<FinCENSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinCENSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinCENSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
