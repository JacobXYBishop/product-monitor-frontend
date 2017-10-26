import {Component} from '@angular/core';


@Component({
  templateUrl: './treemap.component.html',
  styleUrls: ['./treemap.component.css']
})
export class TreemapComponent {
  innerTreemapActive = false;
  outerTreemapActive = false;

  constructor() {
  }

  activateChart(chartType: string) {
    switch (chartType) {
      case 'inner':
        this.innerTreemapActive = true;
        break;
      case 'outer':
        this.outerTreemapActive = true;
        break;
    }
  }

  goBack() {
    this.innerTreemapActive = false;
    this.outerTreemapActive = false;
  }

}
