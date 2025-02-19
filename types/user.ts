export interface User {
    id:        number;
    username:  string;
    email:     string;
    firstName: string;
    lastName:  string;
    gender:    string;
    image:     string;
    token:     string;
}

export interface Login{
    username:  string;
    password:  string;
 }

export interface GoogleLogin{
    token:  string;
    
}