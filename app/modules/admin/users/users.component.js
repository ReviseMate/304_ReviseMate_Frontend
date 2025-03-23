import { __decorate } from "tslib";
import { UowService } from './../../../services/uow.service';
import { CommonModule, CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Subject } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatModule } from "../../../mat.modules";
let UsersComponent = class UsersComponent {
    constructor() {
        this.uow = inject(UowService);
        this._unsubscribeAll = new Subject();
        this.user = JSON.parse(localStorage.getItem("user"));
        this.paginatorEvent = new Subject();
        this.list = [];
        this.isSearchBarOpened = false;
        this.recentTransactionsDataSource = new MatTableDataSource();
        this.recentTransactionsTableColumns = ['name', 'email', 'role', "actions"];
        this.roles = [];
        this.nom = '';
        this.prenom = '';
        this.email = '';
        this.choosenRole = '';
    }
    openSearchBar() {
        this.isSearchBarOpened = !this.isSearchBarOpened;
        if (!this.isSearchBarOpened)
            this.ngOnInit();
    }
    delete(id) {
        this.uow.users.delete(id).subscribe((response) => {
            response ? this.ngOnInit() : console.error("Error while deleting");
        });
    }
    choosingRole(id) {
        this.choosenRole = id;
    }
    ngOnInit() {
        this.uow.users.getAll().subscribe((res) => {
            if (res.success) {
                this.data = res.data;
                this.recentTransactionsDataSource.data = this.data.reverse();
                this.recentTransactionsDataSource.paginator = this.paginator;
            }
            else {
                console.log("erreur lors de recuperation des donnees ");
            }
        });
        this.roles = ['Admin', 'Employee'];
    }
    ngAfterViewInit() {
        this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
    }
    ngOnDestroy() {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
    submit() {
        const searchEmail = this.email || '*';
        const searchPrenom = this.prenom || '*';
        const searchNom = this.nom || '*';
        const role = this.choosenRole || '*';
    }
};
__decorate([
    ViewChild('recentTransactionsTable', { read: MatSort })
], UsersComponent.prototype, "recentTransactionsTableMatSort", void 0);
__decorate([
    ViewChild(MatPaginator)
], UsersComponent.prototype, "paginator", void 0);
UsersComponent = __decorate([
    Component({
        selector: 'app-users',
        standalone: true,
        imports: [CommonModule,
            MatButtonModule,
            MatIconModule,
            MatPaginatorModule,
            MatModule,
            MatMenuModule,
            MatDividerModule,
            NgApexchartsModule,
            MatTableModule,
            MatSortModule,
            NgClass,
            RouterModule,
            FormsModule,
            MatProgressBarModule,
            CurrencyPipe,
            DatePipe,],
        templateUrl: './users.component.html',
        styleUrl: './users.component.scss'
    })
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map