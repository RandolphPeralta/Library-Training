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

export interface IUsecaseloan extends IShow {
    lendBook(bookId: string, studentId: string): any;
    returnBook(bookId: string): any;
}

export interface IStudentUseCase extends IRegister, IEraser, IActualize, IShow {

}

export interface IBookUseCase extends IRegister, IEraser, IActualize, IShow {

}