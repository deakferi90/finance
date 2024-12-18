import { Component, OnInit, ViewChild } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { HttpClientModule } from '@angular/common/http';
import { Transaction } from './transaction.interface';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit {
  selectedTransaction: string | undefined;
  selectedTimeline: string | undefined;
  pages: number[] = [];
  timeLines: { id: number; value: string }[] = [
    {
      id: 1,
      value: 'Latest',
    },
    {
      id: 2,
      value: 'Oldest',
    },
  ];

  categories: { id: number; value: string }[] = [
    {
      id: 1,
      value: 'All Transactions',
    },
    {
      id: 2,
      value: 'Small Transactions',
    },
    {
      id: 2,
      value: 'Large Transactions',
    },
  ];
  sidenavOpen: boolean = false;
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionsService) {}

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.updatePageData(event.pageIndex);
  }

  updatePageData(pageIndex = 0) {
    const startIndex = pageIndex * this.pageSize;
    this.paginatedData = this.transactions.slice(
      startIndex,
      startIndex + this.pageSize
    );
    this.currentPage = pageIndex;
  }

  paginatedData: any = [];
  pageSize = 10;
  totalPages = Math.ceil(this.transactions.length / this.pageSize);
  currentPage = 0;

  onPrevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePageData(this.currentPage);
    }
  }

  onNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePageData(this.currentPage);
    }
  }

  ngOnInit(): void {
    this.updatePageData();
    this.showData();
  }

  showData() {
    this.transactionService.getTransactions().subscribe((data) => {
      this.transactions = data[0]['transactions'];
      this.totalPages = Math.ceil(this.transactions.length / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePageData();
    });
  }
}
