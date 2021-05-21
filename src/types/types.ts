interface IOrderPages {
    page?: number;
    total?: number;
}

export interface IResults extends IStatus {
    id: number
    deviceType?: string;
    deviceManufacturer?: string;
    deviceBrand?: string;
    technician?: string;
    status?: number;
    created?: string;
}

export interface IOrder extends IOrderPages {
    results?: IResults[];
}

export interface IStatus {
    id: number;
    description?: string;
}

export type OrderStatus = 'Unpaid' | 'Assigned' | 'Closed' | 'Open';
