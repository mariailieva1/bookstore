import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IDepartment } from '@common/interfaces/department.interface';
import { convertImagesToUrls } from 'src/app/helpers/image-to-url';
import { DepartmentService } from 'src/app/services/department/department.service';
import { RecommendedComponent } from 'src/app/components/recommended/recommended.component';

@Component({
  selector: 'app-main',
  imports: [CommonModule, RouterModule, RecommendedComponent],
  providers: [DepartmentService],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  departments: IDepartment[] = [];
  filteredDepartments: IDepartment[] = [];
  selectedDepartmentIndex?: number;

  departmentsObservable?: Observable<IDepartment[] | null>;

  departmentsSub?: Subscription;
  queryParamsSub?: Subscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.getDepartments();

    this.queryParamsSub = this.route.queryParams.subscribe(async (params) => {
      const departmentId = params['dep'];

      await firstValueFrom(this.departmentsObservable!);

      if (!departmentId) this.selectDepartment();
      else this.selectDepartmentById(departmentId);
    });
  }

  selectDepartment(departmentIndex?: number) {
    this.selectedDepartmentIndex = departmentIndex;
    if (departmentIndex === undefined)
      this.filteredDepartments = this.departments;
    else this.filteredDepartments = [this.departments[departmentIndex]];
  }

  selectDepartmentById(departmentId: number) {
    const departmentIndex = this.departments.findIndex(
      (dep) => dep.id == departmentId
    );
    this.selectDepartment(departmentIndex);
  }

  getDepartments() {
    this.departmentsObservable = this.departmentService.getDepartments();

    this.departmentsSub = this.departmentsObservable.subscribe(
      (departments: IDepartment[] | null) => {
        if (!departments) return;

        departments.forEach((dep) => {
          dep.categories?.forEach((cat) => {
            cat.products?.forEach((prod) => {
              convertImagesToUrls(prod.images);
            });
          });
        });

        this.departments = departments;
        this.filteredDepartments = departments;
      }
    );
  }

  ngOnDestroy(): void {
    this.departmentsSub?.unsubscribe();
    this.queryParamsSub?.unsubscribe();
  }
}
