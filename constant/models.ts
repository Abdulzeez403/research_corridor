export interface UploodModel {
    id: number;
    title: string;
    document: string;
    status: string;
    time: string;
    date: string;
    documentType: any;
    createdAt: any;
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
    progress?: {
        _id: string;
        progressPercent?: number
    }
}

// interface Progress {
//     _id: string;
//     progressPercent: number;
// }

// interface Researcher {
//     _id: string;
//     name: string;
//     email: string;
//     department: string;
//     gender: string;
//     matric: string;
//     phone: string;
//     progress: Progress;
//     season: string;
// }


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


export interface Supervisor {
    _id: string;
    name: string;
    email: string;
}

export interface ITopicModel {
    _id: string;
    title: string;
    researcherId: string;
    document: string;
    supervisorIds: Supervisor[];
    comments: any[];
    createdAt: string;
    __v: number;
}
