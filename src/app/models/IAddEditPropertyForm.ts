import {FormControl, FormGroup} from "@angular/forms";

export interface IAddEditPropertyForm {
    basicInfo: FormGroup <{
        propertyName: FormControl<string | null>,
        sellRent: FormControl<number | null>,
        propertyType: FormControl<number | null>,
        furnishType: FormControl<number | null>,
        bedroom: FormControl<number | null>,
        bathroom: FormControl<number | null>,
        commonSpace: FormControl<number | null>
    }>,
    addressPricing: FormGroup <{
        country: FormControl<number | null>,
        city: FormControl<number | null>,
        streetAddress: FormControl<string | null>,
        totalFloor: FormControl<number | null>,
        floor: FormControl<number | null>,
        landmark: FormControl<string | null>,
        area: FormControl<number | null>,
        price: FormControl<number | null>,
        otherCost: FormControl<number | null>,
    }>,
    others: FormGroup<{
        gym: FormControl<boolean>,
        parking: FormControl<boolean>,
        swimmingPool: FormControl<boolean>,
        description: FormControl<string | null>,
    }>
}

export type ControlsOf<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends Record<any, any>
        ? FormGroup<ControlsOf<T[K]>>
        : FormControl<T[K]>;
};
