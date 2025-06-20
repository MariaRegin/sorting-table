import { Component } from '@angular/core';
import { SortingTable } from './sorting-table/sorting-table';

@Component({
  selector: 'app-root',
  imports: [SortingTable],
  templateUrl: './app.html',
  // styleUrl: './app.css',
})
export class App {
  protected title = 'sorting-table';
}
