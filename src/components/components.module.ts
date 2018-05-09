import { NgModule } from '@angular/core';
import { AutoCompleteComponent } from './auto-complete/auto-complete';
import { ColorPickerComponent } from './color-picker/color-picker';
import { FileUploadComponent } from './file-upload/file-upload';
@NgModule({
	declarations: [AutoCompleteComponent,
    ColorPickerComponent,
    FileUploadComponent],
	imports: [],
	exports: [AutoCompleteComponent,
    ColorPickerComponent,
    FileUploadComponent,]
})
export class ComponentsModule {}
