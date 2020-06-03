import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {RoomService} from '../services/room.service';

export class RoomSearchResultDatasource extends DataSource<any> {

  constructor(private roomService: RoomService,
              private searchText: string, private searchType: string, private roomCode: string) {
    super();
  }

  connect(): Observable<any> {
    return this.roomService.search(this.searchText, this.searchType, this.roomCode);
  }

  disconnect() {}
}
