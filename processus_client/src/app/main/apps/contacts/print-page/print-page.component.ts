import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OnInit } from '@angular/core';


@Component({
    selector     : 'print-page',
    templateUrl  : './print-page.component.html',
    styleUrls    : ['./print-page.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PrintComponent implements OnInit{
    constructor() { }

    ngOnInit() {
    }
   

}