import { Component, OnInit } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { HttpClientModule } from '@angular/common/http';
import { Transaction } from './transaction.interface';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

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
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit {
  selectedTransaction: string | undefined;
  selectedTimeline: string | undefined;
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

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.transactionService
      .getTransactions()
      .subscribe((data) => (this.transactions = data[0]['transactions']));
  }
}
