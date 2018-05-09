import { NgModule } from '@angular/core';
import { TimeagoPipe } from './timeago/timeago';
import { FileSizePipe } from './file-size/file-size';
@NgModule({
	declarations: [
    TimeagoPipe,
    FileSizePipe],
	
    imports: [],
	
    exports: [
    TimeagoPipe,
    FileSizePipe,]
})
export class PipesModule {}
