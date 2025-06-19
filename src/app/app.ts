import { Component } from '@angular/core';
import { SortingTable } from './sorting-table/sorting-table';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SortingTable],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'sorting-table';
}
