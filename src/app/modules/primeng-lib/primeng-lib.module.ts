import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from "primeng/button";
import { ChipsModule } from "primeng/chips";
import { InputTextModule } from "primeng/inputtext";
import { DataViewModule } from "primeng/dataview";
import { RippleModule } from "primeng/ripple";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PaginatorModule } from "primeng/paginator";
import { DropdownModule } from "primeng/dropdown";
import { StyleClassModule } from "primeng/styleclass";
import { SelectButtonModule } from "primeng/selectbutton";
import { ImageModule } from "primeng/image";
import { DialogModule } from "primeng/dialog";
import { StepsModule } from "primeng/steps";
import { CardModule } from "primeng/card";
import { TabMenuModule } from "primeng/tabmenu";
import { TabViewModule } from "primeng/tabview";
import { CalendarModule } from "primeng/calendar";
import { ProgressBarModule } from "primeng/progressbar";
import { SkeletonModule } from "primeng/skeleton";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextareaModule } from "primeng/inputtextarea";
import { FileUploadModule } from "primeng/fileupload";
import { SpeedDialModule } from "primeng/speeddial";
import { PasswordModule } from "primeng/password";
import { ToastModule } from "primeng/toast";
import { GalleriaModule } from "primeng/galleria";
import { DividerModule } from "primeng/divider";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { TableModule } from 'primeng/table';
import {EditorModule} from 'primeng/editor';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import {MultiSelectModule} from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CarouselModule } from 'primeng/carousel';
import { FocusTrapModule } from 'primeng/focustrap';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import { TagModule } from 'primeng/tag';

const modules = [
    ButtonModule,
    ChipsModule,
    InputTextModule,
    DataViewModule,
    RippleModule,
    FlexLayoutModule,
    PaginatorModule,
    DropdownModule,
    StyleClassModule,
    SelectButtonModule,
    DropdownModule,
    ImageModule,
    DialogModule,
    StepsModule,
    CardModule,
    TabViewModule,
    CalendarModule,
    ProgressBarModule,
    SkeletonModule,
    CheckboxModule,
    InputTextareaModule,
    FileUploadModule,
    SpeedDialModule,
    PasswordModule,
    ToastModule,
    GalleriaModule,
    DividerModule,
    ConfirmDialogModule,
    TableModule,
    EditorModule,
    TooltipModule,
    ChipModule,
    MultiSelectModule,
    TabMenuModule,
    OverlayPanelModule,
    ToggleButtonModule,
    CarouselModule,
		FocusTrapModule,
		ConfirmPopupModule,
		TagModule
];

@NgModule({
    declarations: [],
    imports: [CommonModule, ...modules],
    exports: [...modules]
})
export class PrimengLibModule { }
