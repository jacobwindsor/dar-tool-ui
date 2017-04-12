import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PathwayService} from "../pathway.service";

@Component({
  selector: 'app-pathway-update',
  templateUrl: './pathway-update.component.html',
  styleUrls: ['./pathway-update.component.css']
})
export class PathwayUpdateComponent implements OnInit {
  loading: boolean;
  title: string;
  WPId: number;
  description: string;
  private id: string;
  private userId: string;


  constructor(private route: ActivatedRoute, public pathwayService: PathwayService, private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      const id: string = params.id;
      this.id = id;
      this.pathwayService.get(id).subscribe(pathway => {
        this.title = pathway.title;
        this.WPId = pathway.WPId;
        this.description = pathway.description;
        this.userId = pathway.userId;
        this.loading = false;
      });
    });
  }

  updatePathway(val) {
    this.pathwayService.update(this.id, {
      WPId: val.WPId,
      title: val.title,
      description: val.description
    }).then(_ => {
      this.router.navigate(['/pathway', this.id]);
    });
  }

}