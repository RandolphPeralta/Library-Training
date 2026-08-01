export interface IRegister {
    register(item: any): any;
}

export interface IEraser {
    erase(id: string): any
}

export interface IActualize {
    actualize(item: any): any;
}

export interface IShow {
    show(): any;
}

export interface Iloanservice extends IShow {
    lendBook(bookId: string, studentId: string): any;
    returnBook(bookId: string): any;
}

export interface IStudentservice extends IRegister, IEraser, IActualize, IShow {

}

export interface IBookservice extends IRegister, IEraser, IActualize, IShow {

}