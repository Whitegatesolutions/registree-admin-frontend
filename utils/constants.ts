export enum Constants {
    COVER_PHOTO = "https://images.pexels.com/photos/955393/pexels-photo-955393.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    HOST_ADDRESS = "http://localhost:8080/" ,
    TEMPORARY_HOST_ADDRESS = "https://registreee.herokuapp.com/",
    PASSWORD_REQUIREMENT = "Password length must be at least 8 characters, must contain upper and lowercase alphabets,special character and number"
}

export type ThemeContextState = {
    theme : string;
    toggleTheme : (theme : string) => void;  
};
export interface LoginDetailsInterface{
    email : string;
    password : string;
}
export interface SignPersonInterface{
    firstName : string;
    lastName : string;
    email : string;
    phoneNumber : string;
    password : string;
}

export interface ErrorInterfaceObj{
    msg : string;
    isError : boolean;
    value ?: string;
}

export interface AxiosRequestInterface{
    uri : string;
    body ?: any;
}

interface BusinessNameRegObjInterface{
    businessAddress : string;
    dateCreated : string;
    dateUpdated : string;
    email : string;
    firstNameSuggestion : string;
    id : string;
    phoneNumber : string;
    processStatus : string;
    registeredPartnersForThsBusiness : any[];
    secondNameSuggestion : string;
    status : string;
    userId : string;
}

export interface JobsInterface{
    businessNameRegistration : BusinessNameRegObjInterface;
    businessNameRegistrationId : string;
    dateCreated : string;
    dateUpdated : string;
    documentsUnderThisJob : any[]
    id : string;
    jobTagId : string;
    jobType : string;
    paymentStatus : string;
    processStatus : string;
    status : string;
    userId : string;
}
