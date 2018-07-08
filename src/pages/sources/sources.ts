import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Database } from '../../providers/database/database';

@Component({
    templateUrl: 'sources.html',
})
export class SourcesPage {

    public sourceList: Array<Object>;

    public constructor(private navCtrl: NavController, private alertCtrl: AlertController, private database: Database) {
        this.sourceList = [];
    }

    public ionViewDidEnter() {
        this.database.getSources().then((results) => {
            this.sourceList = <Array<Object>> results;
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }

    public delete(index: any) {
        this.database.deleteSource(this.sourceList[index]).then((result) => {
            this.sourceList.splice(index, 1);
        }, (error) => {
            console.log("ERROR: ", error);
        });
    }

    public add() {
        let prompt = this.alertCtrl.create({
            title: "Feed Source",
            message: "Enter the full URL to the RSS XML feed",
            inputs: [
                {
                    name: "link",
                    placeholder: "http://"
                },
            ],
            buttons: [
                {
                    text: "Cancel"
                },
                {
                    text: "Save",
                    handler: data => {
                        if(data.link != "") {
                            this.database.createSource(data.link).then((result) => {
                                this.sourceList.push({id: result, link: data.link});
                            }, (error) => {
                                console.log("ERROR: ", error);
                            });
                        }
                    }
                }
            ]
        });
        prompt.present();
    }

}