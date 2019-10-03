

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import 'chartjs-plugin-annotation';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @ViewChild('myCanvas', {static: false})
  public canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = 'line';
  public chartData: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;

  ngOnInit() {

    this.chartData = [{
      data: [1, 22, 22,22, 33],
      label: 'With Medicare',
      fill: false
      
    },
    {
      data: [1, 30, 100,23, 90],
      label: 'Without Medicare',
      fill: false
    }
  
  ];
    this.chartLabels = ['2011', '2012', '2013', '2014', '2015','2016', '2017'];
    this.chartColors = [{
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
         borderColor: 'rgba(0, 0, 0, 1)'
    }];
    this.chartOptions = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 50
          }
        }]
      },
   
    }
  };


}
