import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { BittrexService } from '../services/bittrex.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  priceData = [] as any;
  public isLoading = false;

  chartOption: EChartsOption = {
    title: {
      text: 'Evolución Precio Diario Bitcoin',
      left: 'center',
    },
    xAxis: {
      type: 'time'
    },
    yAxis: {
      type : 'value',
      name : 'Precio USD'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
          type: 'line'
      },
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      extraCssText: 'width: 170px',
      formatter: function (params: any) {
        console.log(params);
        return `<strong>${params[0].axisValueLabel}</strong> <br/>
                <strong>Precio (USD)</strong>: $${params[0].data[1]} <br/>`;
      },
      position: function(point, params, dom, rect, size){
        var x = point[0];//
        var y = point[1];
        var boxWidth = size.contentSize[0];
        var boxHeight = size.contentSize[1];
        var posX = 0;
        var posY = 0;

        if (x <boxWidth) {
          posX = 5;
                } else {
          posX = x-boxWidth;
        }

        if (y <boxHeight) {
          posY = 5;
                } else {
          posY = y-boxHeight;
        }

        return [posX,posY];

      }
    },
    series: [
      {
        type: 'line',
        symbol : 'circle',
        symbolSize : 1,
        data: this.priceData
      },
    ],
  };

  echartsInstance : any;

  constructor(private bittrexService: BittrexService) { }

  ngOnInit(): void {
    this.loadPrices();
   }

  onChartInit(ec : any) {
    this.echartsInstance = ec;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  loadPrices(){

    this.isLoading = true;

    this.bittrexService.getPrices().subscribe(

      (data: any) => {

        var result = data.result;
        this.priceData = [];

        for (var i = 0; i < result.length; i++){
          var tmp = [] as any;
          tmp.push(result[i].T);
          tmp.push((result[i].C).toFixed(0));
          this.priceData.push(tmp);
        }

      }, err => {

        this.isLoading = false;

      }, () => {

        this.echartsInstance.setOption({
          series : [{ data : this.priceData }]
        });

        this.isLoading = false;

      });

  }

}
