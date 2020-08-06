import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPictureComponent } from './project-picture.component';

describe('ProjectPictureComponent', () => {
  let component: ProjectPictureComponent;
  let fixture: ComponentFixture<ProjectPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
