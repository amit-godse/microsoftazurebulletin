import { Component } from '@angular/core';
import { Http, Request, RequestMethod } from "@angular/http";
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SourcesPage } from "../sources/sources";
import { Database } from "../../providers/database/database";
import 'rxjs/Rx';

@Component({
    templateUrl: 'feed.html',
})
export class FeedPage {

    public feedList: Array<Object>;

    public constructor(private navCtrl: NavController, private http: Http, private database: Database) {
        this.feedList = [];
    }

    public ionViewDidEnter() {
        this.feedList = [];
        this.load("https://azurecomcdn.azureedge.net/en-in/updates/feed/");
    }

    private load(url: string) {
        this.http.request(new Request({
            method: RequestMethod.Get,
            url: "https://query.yahooapis.com/v1/public/yql?q=select%20title%2C%20description%2C%20link%20from%20rss%20where%20url%3D%22" + url + "%22&format=json&diagnostics=true&callback="
        }))
        .map(result => result.json())
        .subscribe((result) => {
            let items = result.query.results.item;
            for(let i = 0; i < items.length; i++) {
                items[i].description = this.cleanText(items[i].description);
                items[i].description = items[i].description.substring(0, items[i].description.indexOf("...") + 3);
            }
            this.feedList = this.feedList.concat(items);
        }, (error) => {
            console.log(error);
        });
    }

    private cleanText(text: string) {
        let cleaned = text;
        cleaned = cleaned.replace(/(<([^>]+)>)/ig,"");
        cleaned = cleaned.replace(/&#8217;/gi, "\'");
        cleaned = cleaned.replace(/&#039;/gi, "\'");
        cleaned = cleaned.replace(/\[&#8230;\]/gi, "...");
        return cleaned;
    }

    public open(item: any) {
        let browser = new InAppBrowser();
        browser.create(item.link);
        
    }

    public add() {
        this.navCtrl.push(SourcesPage);
    }

}