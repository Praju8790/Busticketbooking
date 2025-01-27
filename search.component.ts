import { Component, inject, OnInit } from '@angular/core';
import { DataserviceService } from '../../service/dataservice.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe,FormsModule,RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  locations$:Observable<any []> =new Observable<any[]>
  buslist:any[]=[]
  data =inject(DataserviceService)

  ngOnInit(): void {
   this.getAlllocation()
  }
searchobj :any ={
  fromLocation:'',
  toLocation:'',
  travelDate:''
}
  getAlllocation(){
    this.locations$ =this.data.getLocations()
  }

  onsearch() {
    const { fromLocation, toLocation, travelDate } = this.searchobj;
  
    this.data.searchbus(fromLocation, toLocation, travelDate).subscribe((res: any) => {
      if ( res.length === 0) { // Check if the response is empty
        alert('No buses found for the selected route and date.');
      } else {
        this.buslist = res; // Assign the response to the bus list
      }
    });
  }
  
}
