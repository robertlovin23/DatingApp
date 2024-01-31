import { Component } from '@angular/core';
import { Member } from '../../models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { Photo } from '../../models/photo'

@Component({
  selector: 'app-member-detail',
  standalone: true,
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule, GalleryModule]
})
export class MemberDetailComponent {
  member: Member | undefined;
  images: GalleryItem[] = [];
  /**
   *
   */
  constructor(private membersService: MembersService, private route: ActivatedRoute) {
  }

  ngOnInit(): void{
    this.loadMember();
  }

  loadMember(){
    var username = this.route.snapshot.paramMap.get('username')
    if(!username) return;
    this.membersService.getMember(username).subscribe({
      next: member => {
        this.member = member;
        this.getImages();
      }
    })
  }

  getImages(){
    if(!this.member) return;
    for(const photo of this.member?.photos){
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}))
    }
    return this.images;
  }

}