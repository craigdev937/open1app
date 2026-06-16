export interface IData {
    convId?: string,
    prompt: string
};

export interface IMsg {
    content: string,
    role: "user" | "bot"
};

export interface MES {
    messages: IMsg[]
};

export interface ISub {
    onSubmit: (data: IData) => void
};



