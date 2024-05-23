import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'imx-bookmark',
  templateUrl: './bookmark.component.html',
  styles: [
  ]
})
export class BookmarkComponent implements OnInit {

  constructor() { }

  async ngOnInit(): Promise<void> {
      console.log("Bookmark Component Loaded")
  }

}
