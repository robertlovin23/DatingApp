import { Injectable, OnInit } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Member } from "../models/member";

@Injectable()
export class MembersService{
    baseUrl = environment.baseUrl;
    http: HttpClient;

    constructor(http: HttpClient) {
        this.http = http;
    }

    getMembers(){
        return this.http.get<Member[]>(`${this.baseUrl}/users/`);
    }

    getMember(username: string){
        return this.http.get<Member>(`${this.baseUrl}/users/${username}`)
    }
}