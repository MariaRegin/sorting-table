import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Route {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

@Component({
  selector: 'app-sorting-table',
  imports: [CommonModule],
  templateUrl: './sorting-table.html',
  styleUrl: './sorting-table.css',
})
export class SortingTable {
  private routesSubject = new BehaviorSubject<Route[]>([
    {
      uuid: '1',
      address: '2.2.2.2',
      mask: '32',
      gateway: '193.0.174.1',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '2',
      address: '10.0.0.1',
      mask: '32',
      gateway: '0.0.0.0',
      interface: 'Гостевая сеть',
    },
    {
      uuid: '3',
      address: '10.0.0.10',
      mask: '32',
      gateway: '0.0.0.0',
      interface: 'Домашняя сеть',
    },
    {
      uuid: '4',
      address: '192.168.1.1',
      mask: '32',
      gateway: '0.0.0.0',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '5',
      address: '193.0.175.0',
      mask: '25',
      gateway: '193.0.174.10',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '6',
      address: '193.0.175.22',
      mask: '32',
      gateway: '193.0.174.1',
      interface: 'Подключение Ethernet',
    },
    {
      uuid: '7',
      address: '172.16.0.0',
      mask: '16',
      gateway: '0.0.0.0',
      interface: 'Внутренняя сеть',
    },
    {
      uuid: '8',
      address: '192.0.2.0',
      mask: '24',
      gateway: '192.0.2.1',
      interface: 'Тестовая сеть',
    },
    {
      uuid: '9',
      address: '10.10.10.10',
      mask: '32',
      gateway: '0.0.0.0',
      interface: 'Тестовая сеть',
    },
  ]);

  routes$: Observable<Route[]> = this.routesSubject.asObservable();

  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  private ipToNumber(ip: string): number {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some((n) => isNaN(n))) return 0;
    return (
      ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
    );
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    const sorted = [...this.routesSubject.value].sort((a, b) => {
      const valueA = a[column as keyof Route];
      const valueB = b[column as keyof Route];

      if (column === 'address' || column === 'gateway') {
        const numA = this.ipToNumber(valueA as string);
        const numB = this.ipToNumber(valueB as string);
        if (numA < numB) return this.sortDirection === 'asc' ? -1 : 1;
        if (numA > numB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      }

      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.routesSubject.next(sorted);
  }
}
