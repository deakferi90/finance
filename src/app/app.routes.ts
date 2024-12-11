import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { PotsComponent } from './pots/pots.component';
import { RecurringBillsComponent } from './recurring-bills/recurring-bills.component';

export const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'budgets', component: BudgetsComponent },
  { path: 'pots', component: PotsComponent },
  { path: 'recurring-bills', component: RecurringBillsComponent },
];
