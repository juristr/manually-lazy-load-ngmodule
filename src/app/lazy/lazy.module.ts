import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class LazyModule {
  constructor() {
    console.log('lazy loaded: 🔥');
  }
}
