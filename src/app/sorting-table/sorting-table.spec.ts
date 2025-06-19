import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingTable } from './sorting-table';

describe('SortingTable', () => {
  let component: SortingTable;
  let fixture: ComponentFixture<SortingTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SortingTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
