import { BusinessesGridInterface } from "./constants copy";


export const ListOfBusinessesCollectionsForNewRegistration : Array<BusinessesGridInterface> = [
    {
        image : 'https://images.pexels.com/photos/955394/pexels-photo-955394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title : 'Business Name Registration',
        description : 'Short Description of the service',
        link : '/new-registration/business-name-registration'
    },
    {
        image : 'https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title : 'Limited Liability Company',
        description : 'Short Description of the service',
        link : '/new-registration/limited-liability'
    },
    {
        image : 'https://images.pexels.com/photos/814544/pexels-photo-814544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title : 'Limited Liability Partnership',
        description : 'Short Description of the service',
        link : '/new-registration/limited-liability-partnership'
    },
    {
        image : 'https://images.pexels.com/photos/6814529/pexels-photo-6814529.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
        title : 'Limited Partnership',
        description : 'Short Description of the service',
        link : '/new-registration/limited-partnership'
    },
    {
        image : 'https://images.pexels.com/photos/188035/pexels-photo-188035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title : 'Company Limited By Guarantee',
        description : 'Short Description of the service',
        link : '/new-registration/company-limited-by-guarantee'
    },
    {
        image : 'https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        title : 'Incorporated Trustees',
        description : 'Short Description of the service',
        link : '/new-registration/incorporated-trustees'
    }
];

export const DaysArray : number[] = new Array<number>(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31);
export const MonthsArray : string[] = new Array<string>("January","February","March","April","May","June","July","August","September","October","November","December");
//export const YearsArray : number[] = new Array<number>(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31);

export const yearsArray = () : number[] => {
    const years : number[] = [];
    for(let i = 1950; i < 2025; i++){
        years.push(i);
    }
    return years;
}

export const Years : number[] = yearsArray();
