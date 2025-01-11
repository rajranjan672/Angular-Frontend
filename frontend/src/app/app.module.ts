import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Ensure HttpClientModule is imported
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component'; // TaskComponent should be added here if needed
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    // TaskComponent, // Declare your TaskComponent if you're not using standalone mode
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // RouterModule // Make sure HttpClientModule is here if not standalone
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
