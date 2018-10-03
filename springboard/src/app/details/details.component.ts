import { Component, OnInit, Inject } from '@angular/core';
import { BookingService } from '../services/booking.service';
import { FormControl } from '@angular/forms';
import { DatepickerOptions } from 'ng2-datepicker';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  timeSlots = ['slot0900to0930', 'slot0900to0930', 'slot0930to1000', 'slot1000to1030', 'slot1030to1100', 'slot1100to1130']

  constructor(private dataService: BookingService,
    @Inject('BaseURL') private BaseURL,
  ) {
    this.status();
  }

  ngOnInit() {

  }
  slotGaps = ['30', '60'];
  arrayOfAllSlots = [];
  statusOfAllSlots = [];
  responseForSlots = false;
  arrayOfAvailableSlots = [];
  responseForAvailability = false;
  timeSlot: string;
  startTime: String;
  slotGap: number;
  room: String;
  roomName = { name: "packman", weekDay: "tuesday" }
  roomInfo = { name: "spartan", timeSlot: "slot1000to1030", slotGap: 1, weekDay: "tuesday" }
  infoForAvailability = { timeSlot: "", slotGap: 1, weekDay: "tuesday" }

  startTimeConversion() {

    if (this.startTime == "09:00") {
      this.timeSlot = "0";
    }
    else if (this.startTime == "09:30") {
      this.timeSlot = "1";
    }
    else if (this.startTime == "10:00") {
      this.timeSlot = "2";
    }
    else if (this.startTime == "10:30") {
      this.timeSlot = "3";
    }
    else if (this.startTime == "11:00") {
      this.timeSlot = "4";
    }
    else if (this.startTime == "11:30") {
      this.timeSlot = "5";
    }
    else if (this.startTime == "12:00") {
      this.timeSlot = "6";
    }
    else if (this.startTime == "12:30") {
      this.timeSlot = "7";
    }

  }

  roomAvailability() {
    this.startTimeConversion();
    console.log(this.infoForAvailability.timeSlot);
    // this.infoForAvailability["timeSlot"] = this.timeSlot;
    this.infoForAvailability.slotGap = this.slotGap / 30;
    this.infoForAvailability.timeSlot = this.timeSlot;
    console.log(this.infoForAvailability);
    this.arrayOfAvailableSlots = [];
    this.dataService.roomAvailability(this.infoForAvailability)
      .then(response => response.json())
      .then(res => {
        if (res.length != null) {
          res.forEach(element => {
            // console.log(this.arrayOfAvailableSlots);
            this.arrayOfAvailableSlots.push(element);
          });
          this.responseForAvailability = true
        }
        console.log(this.arrayOfAvailableSlots);
      })
  }


  status() {
    this.dataService.getRoomStatus(this.roomName)
      .then(response => response.json())
      .then(res => {
        let obj = res[0];
        console.log(res);
        let keys = Object.keys(obj);
        this.arrayOfAllSlots.push("slots");
        this.arrayOfAllSlots.push("weekday");
        this.arrayOfAllSlots.push("09:00-09:30");
        this.arrayOfAllSlots.push("09:30-10:00");
        this.arrayOfAllSlots.push("10:00-10:30");
        this.arrayOfAllSlots.push("10:30-11:00");
        this.arrayOfAllSlots.push("11:00-11:30");
        this.arrayOfAllSlots.push("11:30-12:00");
        this.arrayOfAllSlots.push("12:00-12:30");
        this.arrayOfAllSlots.push("12:30-13:00");

        this.statusOfAllSlots.push("packman")
       
        for (let i = 0; i < keys.length; i++) {
          // console.log(result[0][keys[i]]);
          if (keys[i] != "weekDay") {
          
            this.statusOfAllSlots.push(res[0][keys[i]])
          }
        }
        console.log(this.arrayOfAllSlots);
        console.log(this.statusOfAllSlots);
     

        // console.log(this.arrayOfAllSlots);
        // console.log(this.statusOfAllSlots);
      })
  }
  bookRoom(roomname) {
    console.log(roomname);
    this.startTimeConversion();
    this.roomInfo.name = roomname;
    this.roomInfo.timeSlot = this.timeSlot;
    console.log(this.roomInfo)
    this.dataService.bookRoom(this.roomInfo)
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }

} 
