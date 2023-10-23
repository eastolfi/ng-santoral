import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiHealthcheckComponent } from './api-healthcheck.component';

describe('ApiHealthcheckComponent', () => {
    let component: ApiHealthcheckComponent;
    let fixture: ComponentFixture<ApiHealthcheckComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ApiHealthcheckComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ApiHealthcheckComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
