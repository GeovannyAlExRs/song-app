import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePageComponent } from './favorite-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedModule } from '@shared/shared.module';

describe('FavoritePageComponent', () => {
  let component: FavoritePageComponent;
  let fixture: ComponentFixture<FavoritePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      declarations: [ FavoritePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
