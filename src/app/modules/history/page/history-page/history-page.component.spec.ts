import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'

import { HistoryPageComponent } from './history-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '@shared/shared.module';
import { SearchComponent } from '@modules/history/components/search/search.component';
import { FormsModule } from '@angular/forms';

describe('HistoryPageComponent', () => {
  let component: HistoryPageComponent;
  let fixture: ComponentFixture<HistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule, FormsModule],
      declarations: [ HistoryPageComponent, SearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
