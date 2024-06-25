export interface UploodModel {
    id: number;
    name: string;
    file?: string;
    time: string;
    date: string;
    status: string;
    documentType: any;
}

// interface FileDetails {
//     fileName: string;
//     fileType: string;
//     fileSize: number;
//     fileContent: string;
// }

export interface IResearcher {
    name: string;
    email: string;
    password: string;
    role?: string;
    gender?: string;
    department?: string;
    matric?: string;
    phone?: string;
    topic?: string;
    season?: any;
    supervisor?: any;
}


export interface ISupervisor {
    name: string;
    email: string;
    password: string;
    role?: string;
    prefix: string;
    gender?: string;
    department?: string;
    phone?: string;
}


export interface IUser {
    supervisor: ISupervisor;
    researcch: IResearcher;
}