import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { Sale } from '../../../../services/sale/sale';
import { SaleService } from '../../../../services/sale/sale.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-detail.component.html',
  styleUrl: './sales-detail.component.css'
})
export class SalesDetailComponent implements OnInit {


  public sale?: Sale; 

  constructor(

    private _route: ActivatedRoute,
    private _apiSale: SaleService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {

      this._apiSale.getSaleById(params['saleid']).subscribe((data: Sale) => {
       this.sale= data;
      })
    }); 
  }
}
