import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOrganelleComponent } from './search-organelle.component';

describe('SearchOrganelleComponent', () => {
  let component: SearchOrganelleComponent;
  let fixture: ComponentFixture<SearchOrganelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchOrganelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOrganelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
