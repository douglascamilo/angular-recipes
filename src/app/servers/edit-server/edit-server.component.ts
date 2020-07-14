import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit: boolean;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params) => this.handleQueryParams(queryParams));
    this.route.params.subscribe((params: Params) => this.handleParams(params));
  }

  onUpdateServer() {
    this.serversService.updateServer(
      this.server.id, { name: this.serverName, status: this.serverStatus });
  }

  private handleParams(params: Params) {
    const serverId = Number(params['id']);
    this.server = this.serversService.getServer(serverId);

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  private handleQueryParams(queryParams: Params) {
    this.allowEdit = queryParams['allowEdit'] === '1';
  }
}
