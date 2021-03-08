import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultcompComponent } from './resultcomp.component';

describe('ResultcompComponent', () => {
  let component: ResultcompComponent;
  let fixture: ComponentFixture<ResultcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
