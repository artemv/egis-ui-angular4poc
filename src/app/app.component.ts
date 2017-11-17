/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { EgisUI } from '@egis/egis-ui';
const EgisUI1 = (EgisUI as any);

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav>
      <a [routerLink]=" ['./'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Index
      </a>
      <a [routerLink]=" ['./home'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Home
      </a>
      <a [routerLink]=" ['./detail'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Detail
      </a>
      <a [routerLink]=" ['./barrel'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Barrel
      </a>
      <a [routerLink]=" ['./about'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        About
      </a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <pre class="app-state">
EgisUI.currentTimeWithMillisString(): {{ timestamp }}
doc.indexes: {{ doc.indexes | json }}
EgisUI.guid(): {{ guid }}
    </pre>
  `
})
export class AppComponent implements OnInit {
  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';
  public timestamp: string;
  public guid: string;
  public doc: EgisUI.PaperTrailDocument;
  public o: EgisUI.Observable;

  constructor(
    public appState: AppState
  ) {
    console.log('EgisUI', EgisUI);
    this.timestamp = EgisUI.currentTimeWithMillisString();
    this.o = new EgisUI.Observable();
    this.o.once('check').then(([o, ...args]) => {
      console.log('check.then', {o, args});
    });
    this.o.fire('check', 1, 2, 3);
    console.log('o', this.o);
    this.guid = EgisUI1.guid();
    this.doc = new EgisUI.PaperTrailDocument({filename: 'lala'});
    EgisUI.PaperTrail.pql('select * from "Signature Uploads"').then((res) => {
      console.log('got docs:', res);
      if (res.length > 0) {
        EgisUI.PaperTrail.getDocument(res[0]['docId']).then((doc) => {
          console.log('got doc', doc, doc.docId);
          this.doc = doc;
        });
      }
    });
    let entities = EgisUI.Entity.list();
    console.log('DataSource.id:', entities.DataSource.id, entities);
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
