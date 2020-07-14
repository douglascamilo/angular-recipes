import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        const serverId = params['id'];
        this.loadServer(serverId);
      });
  }

  onEdit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route,
      preserveFragment: true,
      queryParamsHandling: 'preserve'
    });
  }

  private loadServer(serverId: string) {
    this.server = this.serversService.getServer(Number(serverId));
  }
}
