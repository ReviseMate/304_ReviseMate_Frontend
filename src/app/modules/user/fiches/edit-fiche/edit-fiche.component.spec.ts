import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFicheComponent } from './edit-fiche.component';

describe('EditFicheComponent', () => {
  let component: EditFicheComponent;
  let fixture: ComponentFixture<EditFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFicheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
