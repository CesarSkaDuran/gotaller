import { Route } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectResolver } from './project.resolvers';
// import { ProjectComponent } from 'app/modules/admin/dashboards/project/project.component';
// import { ProjectResolver } from 'app/modules/admin/dashboards/project/project.resolvers';

export const projectRoutes: Route[] = [
    {
        path     : '',
        component: ProjectComponent,
        resolve  : {
            data: ProjectResolver
        }
    }
];
