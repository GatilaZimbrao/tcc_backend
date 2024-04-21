declare namespace Express {
  export interface Request {
    context: {
      user?: {
        id: number;
        role: string;
      };
    };
  }
}
