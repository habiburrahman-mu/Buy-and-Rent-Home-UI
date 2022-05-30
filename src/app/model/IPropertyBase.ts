export interface IPropertyBase {
    Id: number;
    SellRent: number;
    Name: string;
    FType: string;
    PType: string;
    Price: number | null;
    BHK: number;
    BuiltArea: number | null;
    City: string;
    RTM: number | null;
    Image?: string;
}
