// =================================== Types define here ===================================

// ************************* ResponseModel *****************************
export interface ResponseModel {
    id?: string;
    name?: string;
    job?: string;
}

// ************************* error *****************************
export interface ERROR{
    msg?:null|string;
}

// ************************* loginBody *****************************
export interface loginBody{
    email?:string;
    password?:string;
}

// ************************* registerBody *****************************
export interface registerBody{
    name:string;
    email:string;
    mobile:string|number;
}

// ************************* asyncData *****************************
export interface data{
    email:string;
    password:string;
}

// ************************* RegisterState *****************************
export interface RegisterState {
    value:any;
}

// ************************* dashboardData *****************************
export interface dashboardData{
    name:string|undefined;
    email:string|undefined;
    mobile:string|undefined;
}

// ************************* Posts *****************************
export interface Posts{
    data?:Array<[]>|any;
    id:string;
    text:string;
    image:string;
}

// ************************* ApiCall *****************************
export interface apiData{
    data: object|any|null;
    isLoading: boolean;
    error: string|null;
}

// ************************* drawerMenu *****************************
export interface drawerMenu{
    name:string;
    isActive:boolean;
    screen:string;
}

// ************************* drawerSelect *****************************
export interface drawerSelect{
    name:string;
    screen:string;
}

// ************************* Image *****************************
export interface image{
    name: string,
    type: string,
    uri: string,
}

// *********************** FlatList ****************************
export interface myProfile{
    name?:string,
    value?:string
}

// *********************** Valid ****************************
export interface valid{
    fullname?:string,
    email?:string,
    description?:string
}

// *********************** RequestStatus ****************************
export interface requestStatus{
    request?:string|number,
    date?:string|number,
    status?:string,
    type?:string
}

// *********************** statusColor ****************************
export interface statusColor{
    [key:string]:string
}

// *********************** Loan ****************************
export interface arrayData{
    [key:string]:string
}

// *********************** Plan ***************************
export interface Plan {
    created_at: string | null;
    daily_roi: string;
    description: string;
    id: number;
    montly_roi_0_3: number;
    montly_roi_10_12: number;
    montly_roi_4_6: number;
    montly_roi_7_9: number;
    montly_roi_one: string;
    montly_roi_two: string;
    plan_name: string;
    plan_range_from: number;
    plan_range_to: number;
    short_name: string;
    status: string;
    type: string;
    updated_at: string;
    withdrawal_lock_in_period: string;
    yearly_roi: string;
  }

  // *********************** editProfile ***************************
  export interface editProfile{
    physically_disable: string;
    marital_status: string;
    mobile: any;
    occupation: string;
    mother_name: string;
    name: string;
    fullname: string;
    account_number: any;
    bank: any;
    comm_address: string;
    dob: string;
    email: any;
    father_name: string;
}

// *********************** roi *******************************
export interface roi{
    one: number;
    two: number;
    first: number;
    second: number;
    third: number;
    four: number;
}