import { NgModule } from "@angular/core";
import { UserEdit } from "./user-edit";

@NgModule({
    imports: [UserEdit],
    exports: [UserEdit]
})
export class AdminModule {}