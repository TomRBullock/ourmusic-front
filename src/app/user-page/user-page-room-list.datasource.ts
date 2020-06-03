import {DataSource} from '@angular/cdk/collections';
import {UserPageService} from '../services/user-page.service';
import {Observable} from 'rxjs';

export class UserPageRoomListDatasource extends DataSource<any> {

  constructor(private userPageService: UserPageService) {
    super();
  }

  connect(): Observable<any> {
    return this.userPageService.loadUserRooms();
  }

  disconnect() {}
}
