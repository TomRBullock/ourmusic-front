import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs';
import {RoomService} from '../services/room.service';

export class RoomQueueDatasource extends DataSource<any> {

  constructor(private roomService: RoomService, private roomCode: string) {
    super();
  }

  connect(): Observable<any> {
    return this.roomService.getRoomQueue(this.roomCode);
  }

  disconnect() {}
}
