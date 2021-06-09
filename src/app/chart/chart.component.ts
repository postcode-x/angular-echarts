import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { BittrexService } from '../services/bittrex.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };

  constructor(private bittrexService : BittrexService) { }

  ngOnInit(): void {

    this.bittrexService.getPrices().subscribe(

      (data: any) => { console.log(data);},
      err => { },
      () => { }

    );

  }

}
