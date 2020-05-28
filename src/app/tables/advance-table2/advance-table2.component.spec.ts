import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceTable2Component } from './advance-table2.component';

describe('AdvanceTable2Component', () => {
  let component: AdvanceTable2Component;
  let fixture: ComponentFixture<AdvanceTable2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceTable2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
