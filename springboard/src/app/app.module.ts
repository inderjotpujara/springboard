import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { baseURL } from './shared/baseURL';
import { MatListModule } from '@angular/material/list';
import { NgDatepickerModule } from 'ng2-datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms'; 
import { MatSelectModule } from '@angular/material/select';
import {Routes,RouterModule} from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { ProcessHTTPMsgService  } from './services/process-httpmsg.service';
import { HttpParams } from '@angular/common/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    DetailsComponent
  ],
  imports: [
    AppRoutingModule,
    MatButtonModule,
    NgDatepickerModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatGridListModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatListModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    FormsModule,
    RestangularModule.forRoot(RestangularConfigFactory),
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [LoginService,
    {provide: 'BaseURL', useValue: baseURL},
    {provide: 'ProcessHTTPMsgService ', useValue: ProcessHTTPMsgService },
    {provide: 'HttpParams ', useValue: HttpParams }],
  bootstrap: [AppComponent]
})
export class AppModule { }