import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchOrganelleComponent } from './search-organelle/search-organelle.component';
import {OrganelleFilterPipe} from './search-organelle/organelle-filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { ResultcompComponent } from './resultcomp/resultcomp.component';
import { from } from 'rxjs';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatGridListModule} from '@angular/material/grid-list';
import { FilepreviewComponent } from './filepreview/filepreview.component';
import { TreeSearchComponent } from './tree-search/tree-search.component';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { LoadingComponent } from './loading/loading.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchOrganelleComponent,
    OrganelleFilterPipe,
    ResultcompComponent,
    FilepreviewComponent,
    TreeSearchComponent,
    LoadingComponent,
    
   
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'resultcomp', component: ResultcompComponent}
    ]),
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    MatRadioModule,
    MatTreeModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {panelClass: 'mat-dialog-override'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
