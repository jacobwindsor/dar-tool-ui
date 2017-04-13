import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from "rxjs/Rx";
import {PathwayService} from "../pathway.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {UniversalValidators} from 'ng2-validators';

@Component({
  selector: 'app-pathway-edit',
  templateUrl: './pathway-edit.component.html',
  styleUrls: ['./pathway-edit.component.css']
})
export class PathwayEditComponent implements OnInit {
  // Initial values
  @Input() WPId: number;
  @Input() markdown: string;
  @Input() title: string;

  // Emit when saved with form values
  @Output() onSave = new EventEmitter<any>(); // TODO: Add type of form values

  pathwayInstance: any;
  entities: {id: string, text: string}[] = []; // List of the entity IDs

  pathwayForm = new FormGroup({
    WPId: new FormControl('', Validators.compose([Validators.required, UniversalValidators.isNumber])),
    title: new FormControl('', Validators.required),
    markdown: new FormControl('', Validators.required)
  });

  entitySearchControl = new FormControl();

  filteredEntities: Observable<{id: string, text: string}[]>;

  constructor(public pathwayService: PathwayService, public auth: AuthService, public router: Router) { }

  ngOnInit() {
    // Set the initial form values if specified
    this.pathwayForm.setValue({
      WPId: this.WPId || '',
      title: this.title || '',
      markdown: this.markdown || ''
    });

    const WPIdControl = this.pathwayForm.get('WPId');
    WPIdControl.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe((value: string) => {
        if (value && value.length > 0) {
          this.entities = [];
          this.WPId = parseInt(value, 10);
        }
      });

    // TODO: refactor this code to just use one ngOnChanges
    // See https://angular.io/docs/ts/latest/cookbook/component-communication.html#!#parent-to-child-on-changes
    const titleControl = this.pathwayForm.get('title');
    titleControl.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe((value: string) => {
        this.title = value;
      });

    const descriptionControl = this.pathwayForm.get('markdown');
    descriptionControl.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe((value: string) => {
        this.markdown = value;
      });
  }

  pathwayLoaded = (instance: any) => {
    instance.ready.subscribe(ready => {
      if (ready) {
        this.pathwayInstance = instance;
        this.entities = instance.manipulator.getEntities()
          .filter(entity => entity.kaavioType === 'Node') // Only do Nodes for now
          .filter(entity => entity.textContent) // Only show those with text (Metabolites/Genes/Rna)
          .map(entity => {
            return {
              id: entity.id,
              text: entity.textContent
            };
          });
        this.renderEntitySearch();
      }
    });
  }

  filter = (val: string) => {
    return this.entities.filter(entity => new RegExp(val, 'gi').test(entity.id + entity.text));
  }

  renderEntitySearch = () => {
    console.log(this.entities);
    this.filteredEntities = this.entitySearchControl.valueChanges
      .do(val => {
        const toHighlight = this.entities.find(entity => entity.id === val);
        if (toHighlight) {
          this.pathwayInstance.manipulator.reset().highlightOn(toHighlight.id, 'red');
        }
      })
      .map(val => val ? this.filter(val) : this.entities.slice());
  }

  save = () => {
    // TODO: Only fire when form valid
    const formVal = this.pathwayForm.value;
    this.onSave.emit(formVal);
  }
}
