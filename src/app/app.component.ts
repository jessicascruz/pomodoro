import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public clock = '';
  public clockHandle;
  public color: ThemePalette = 'primary';
  public mode: ProgressSpinnerMode = 'determinate';
  public value = 50;

  public timeSeconds: number = 0;
  public timeMinutes: number = 25;
  public interval;
  public subscribeTimer: any;
  public zeroSegundos: boolean = true;
  public pausado: boolean = false;
  public disabled: boolean = false;
  public count: number = 0;
  public countValue: boolean = false;


  constructor() {}

  public iniciarTarefa(): void {
    this.countValue = false;

    if (!this.pausado) {
      this.zeroSegundos = !this.zeroSegundos;
      this.timeSeconds = 59;
      this.timeMinutes = 24;
      this.disabled = !this.disabled;
    }

    this.interval = setInterval(() => {
      if (this.timeSeconds > 0) {
        this.timeSeconds--;
      } else if (this.timeSeconds === 0 && this.timeMinutes > 0) {
        this.timeMinutes--;
        this.timeSeconds = 60;
      } else if (this.timeSeconds === 0 && this.timeMinutes === 0) {
        this.countValue = true;
        this.stopTimer();
        this.zeroSegundos = !this.zeroSegundos;
        this.count++;
      }
    }, 1000);
  }

  public hora(): void {
    this.clockHandle = setInterval(() => {
      this.clock = new Date().toLocaleString();
    }, 1000);
  }

  pauseTimer() {
    this.pausado = !this.pausado;
    clearInterval(this.interval);
  }

  stopTimer() {
    this.zeroSegundos = false;
    this.timeSeconds = 59;
    this.timeMinutes = 24;
    this.disabled = !this.disabled;
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.hora();
  }

}
